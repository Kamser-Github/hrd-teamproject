let messageCnt = 0;

const init_message_cnt = function(){
    messageCnt = 0;
}

$(document).ready(function(){
    //stomp 연동
    const socket = new SockJS('/websocket');
    const stomp = Stomp.over(socket);
    stomp.debug = null;
    stomp.connect({},function(){
        main();
    })
    const printRoomListHtml = function(roomList){
        let listHtml = "";
        for(let i=roomList.length-1 ; i>=0 ; i--){
            listHtml +=
                `<li data-room_number=${roomList[i].roomNumber}>
                    <span class="chat_title">${roomList[i].roomName}</span>
                    <span class="chat_count">${roomList[i].users.length}명</span>
                </li>`
        }
        $(".main-chatting ul").html(listHtml);
    }
    //방 목록 불러오기 ajax
    const openChattingRoomList = function (){
        $.ajax({
            url : "/chattingRoomList",
            type : "GET"
        }).then(function(result){
            printRoomListHtml(result);
        }).fail(function(){
            alert("에러가 발생했습니다.");
        })
    }
    const subscribeArr = [];
    const subscribeRemoveAll = function(){
        const length = subscribeArr.length;
        for(let i=0 ; i<length ; i++){
            const sid = subscribeArr.pop();
            stomp.unsubscribe(sid.id);
        }
    }
    //main
    const main = function(){
        $(".main-chatting").show();

        subscribeRemoveAll();
        const room = containChattingRoom();
        if(room){
            return;
        }
        const subscribeId = stomp.subscribe("/topic/roomList",function(){
            openChattingRoomList();
        })
        subscribeArr.push(subscribeId);
        openChattingRoomList();
    }

    const myInfo = (function(){
        let nickname = "";
        let roomNumber = "";

        const getNickname = function(){ return nickname ;}
        const getRoomNumber = function(){ return roomNumber ;}
        const setNickname = function(set){
            nickname =set;
        }
        const setRoomNumber = function(set){
            roomNumber =set;
        }
        return {
            getNickname : getNickname,
            getRoomNumber : getRoomNumber,
            setNickname : setNickname,
            setRoomNumber : setRoomNumber,
        }
    })();
    const errorMSG = function(result){
        if(result.status==404){
            alert("종료되었거나 없는 방입니다.");
        }
        else {
            alert("에러가 발생했습니다.");
        }
        location.herf="/";
    }
    //참가자 그리기
    const printUserList = function(users){//list
        $(".chat .chat_users .user").text(users.length+"명");
        let userHtml = "";//init
        for(let i=0; i<users.length ; i++){
            userHtml += `<li>${users[i]}</li>`;
        }
        //목록에 추가
        $(".chat .chat_nickname ul").html(userHtml);
    }
    //메세지 그리기
    const printChatting = function(messageObj){
        let nickname = messageObj.nickname;
        let message = messageObj.message;

        message = message.replace("\n","<br>").replaceAll(" ","&nbsp");
        const stringDate = messageObj.date;
        const objDate = new Date(stringDate);
        const time =
            String(objDate.getHours()).padStart(2,"0")
            +":"
            +String(objDate.getMinutes()).padStart(2,"0");
        let sender = "";

        if(myInfo.getNickname() == nickname){
            sender = "chat_me";
            nickname = "";
        }
        else {
            sender = "chat_other";
        }
        messageCnt++;
        const chatHtml = `
            <li>
                <div class=${sender}>
                    <div>
                        <div class="nickname">${nickname }</div>
                        <div class="message">
                            <span class=chat_in_time>${time }</span>
                            <span class="chat_content">${message }</span>
                        </div>
                    </div>
                </div>
            </li> `;
        //채팅창이 숨어있다면.
        if($(".popup-contents").css("display")==='none'){
            $(".account-message").html(messageCnt);
        }
        $(".chat ul.chat_list").append(chatHtml);
        $(".chat ul").scrollTop($(".chat ul")[0].scrollHeight);
    }
    //채팅방 구독
    const chattingRoomSubscribe = function(roomNumber){
        //기존 구독 취소
        subscribeRemoveAll();
        //메세지를 받을 경로
        const messageSubId = stomp.subscribe("/topic/Message/"+roomNumber,function(result){
            const message = JSON.parse(result.body);
            printChatting(message);
        })
        //입장 퇴장
        const inOutSubId = stomp.subscribe("/topic/notification/"+roomNumber,function(result){
            const chattingRoom = JSON.parse(result.body);
            const message = chattingRoom.message;
            //실행
            printUserList(chattingRoom.users);//list
            const chatHtml =
                `<li>
                    <div class="notification">
                        <span>${message}</span>
                    </div>
                </li>`;
            //전달받은 객체는 ChattingRoomDto
            $(".chat ul.chat_list").append(chatHtml);
            $(".chat ul").scrollTop($(".chat ul")[0].scrollHeight);
        })
        subscribeArr.push(messageSubId);
        subscribeArr.push(inOutSubId);
    }
    //채팅방 세팅
    const printChattingRoomInfo = function(room,nickname){
        //방 목록 업데이트
        stomp.send("/socket/roomList");//갱신정보
        $(".main-chatting").hide();
        myInfo.setNickname(nickname);
        myInfo.setRoomNumber(room.roomNumber);
        $(".chat").show();
        $(".chat .chat_title").text(room.roomName);

        printUserList(room.users);
        chattingRoomSubscribe(room.roomNumber);
        $(".chat_input_area textarea").focus();
    }
    //메세지 보내기
    const sendMessage = function(){
        const message = $(".chat_input_area textarea").val();
        //return
        let message_result = forbiddenCheck(message,".chat_input_area textarea");
        if(message_result||message===''){
            return;
        }
        const roomNumber = myInfo.getRoomNumber();
        const nickname = myInfo.getNickname();

        const data = {
            message : message,
            nickname : nickname,
        }
        stomp.send("/socket/Message/"+roomNumber,{},JSON.stringify(data));
        $(".chat_input_area textarea").val("");
    }
    //action
    $(".chat_button_area button").click(function(){
        sendMessage();
        $(".chat_input_area textarea").focus();
    })
    $(".chat_input_area textarea").keypress(function(event){
        if(event.keyCode == 13){
            if(!event.shiftKey){
                event.preventDefault();
                sendMessage();
            }
        }
    })
    const enterChattingRoom = function(roomNumber){
        swal({
            text : "사용하실 닉네임을 입력해주세요",
            content : "input",
            buttons : ["취소","확인"],
            _closeOnClickOutside : false
        }).then(function(nickname){
            if(nickname){
                if(forbiddenCheck(nickname)){
                    return;
                }
                const data = {
                    roomNumber : roomNumber,
                    nickname : nickname
                }
                $.ajax({
                    url : "/chattingRoom-enter",//채팅방 dto를 얻는다.
                    type : "GET",
                    data : data,
                }).then(function(room){
                    printChattingRoomInfo(room,nickname);
                    //채팅에 참가 매세지
                    room.message = nickname + "님이 참가하셨습니다.";
                    stomp.send("/topic/notification/"+roomNumber,{},JSON.stringify(room));
                }).fail(function(result){
                    errorMSG(result);
                })
            }
        })
    }
    const createRoom = function(roomName){
        swal({
            text : "사용하실 닉네임을 입력해주세요",
            content : "input",
            buttons : ["취소","확인"],
            closeOnClickOutside: false
        }).then(function(nickname){
            if(forbiddenCheck(nickname)){
                return;
            }
            if(nickname) {
                const data = {
                    roomName : roomName,
                    nickname : nickname,
                }
                $.ajax({
                    url : "/chattingRoom",
                    type : "POST",
                    data : data
                }).then(function(room){
                    printChattingRoomInfo(room,nickname);
                }).fail(function(){
                    alert("에러가 발생했습니다.")
                })
            }
        })
    }
    //방만들기
    $(".new_chat").click(function(){
        swal({
            text : "방 이름을 입력해주세요",
            content : "input",
            buttons: ["취소","확인"],
            closeOnClickOutside: false
        }).then(function(roomName){
            if(forbiddenCheck(roomName)){
                return;
            }
            if(roomName){
                createRoom(roomName);
            }
        })
    })
    //방 클릭
    $(document).on("dblclick",".main-chatting li",function(){
        const roomNumber = $(this).data("room_number");//li data-room_number
        enterChattingRoom(roomNumber);
    })
    //채팅방 나가기
    $(".chat_back").click(function(){
        swal({
            text : "대화방에서 나갈까요 ?",
            buttons : ["취소","확인"]
        }).then(function(result){
            if(result){
                $.ajax({
                    url : "/chattingRoom-exit",
                    type : "PATCH",
                }).then(function(room){
                    const roomNumber = myInfo.getRoomNumber();
                    if(room.users.length!=0){
                        room.message = myInfo.getNickname()+"님이 퇴장했습니다.";
                        stomp.send("/socket/notification/"+roomNumber,{},JSON.stringify(room));
                    }
                    //방 나가면 다시 재 초기화
                    stomp.send("/socket/roomList");
                    main();
                    $(".chat").hide();
                    $(".chat ul.chat_list").html("");//나가면서 채팅 지우기
                    
                    myInfo.setRoomNumber("");
                    myInfo.setNickname("");//방 정보도 지우기
                })
            }
        })
    })
    //대화중이던 방
    const containChattingRoom = function(){
        let returnRoom = null;
        $.ajax({
            url : "/chattingRoom",
            type : "GET",
            async : false,
        }).then(function(result){
            if(result !=""){
                const room = result.chattingRoom;
                const nickname = result.myNickname;
                printChattingRoomInfo(room,nickname);
                returnRoom = result;
            }
        }).fail(function(result){
            errorMSG(result);
        })
        return returnRoom;
    }
    //채팅인원
    $(".btn-user-list").click(()=>{
        $(".chat_users").toggle();
    })
})