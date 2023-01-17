const today = new Date();
const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const day = ('0' + today.getDate()).slice(-2);
const dateString = year + '-' + month + '-' + day + ' 00:00:00';

let user_id = $("#log_id").val();
let user_no = $("#log_no").val();
let user_nick = $("#log_nick").val();

let myContent;
let bj_point;
let br_point;

let didCreate = false;

let clickOn = "";

// 찍어보는 콘솔
$(".month").html(month + "월");

// 일단 그날의 출석체크 리스트 출력
show_today_list();

function show_today_list() {
    let settings = {
        "url": "v1/read/attendToday",
        "method": "POST",
        "data": {
            "reg_date_check": dateString
        }
    };

    $.ajax(settings).done(function (response) {
        const data = response;

        $(".thead").empty();

        $(".thead").append(
            `<tr>
                    <th>닉네임</th>               
                    <th>내용</th>              
                    <th>등록일자</th>
                </tr>`
        );
        if (data != "") {

            $(".tbody").empty();

            data.forEach(e => {
                let nick = e.user_nick;
                let content = e.content;
                let regDateList = e.regDate.split("T");
                let regDate = regDateList[0] + " " + regDateList[1].split(".")[0];

                $(".tbody").append(
                    `<tr>
                        <td class="appendNick">${nick}</td>
                        <td class="appendContent">${content}</td>
                        <td class="appendRegDate">${regDate}</td>
                    </tr>`
                )
            })
        } else {
            $(".tbody").empty();

            $(".tbody").append(
                `<tr>
                    <td class="appendNick"> - </td>
                    <td class="appendContent"> - </td>
                    <td class="appendRegDate"> - </td>
                </tr>`
            )
        }
    });
}

// 로그인 유무 판단
if (user_id === "" || user_no === "") {
    $("#user_id").removeAttr('value');
    $("#comment").attr('placeholder', '로그인 후 이용 가능합니다');
    $("#comment").attr('readonly', true);
    $("#comment").removeAttr('required');
} else {
    $("#comment").attr('readonly', false);

    getUser();
}

function getUser() {
    let settings = {
        "url": "/v1/search/user",
        "method": "GET",
        "data": {
            "no": user_no
        }
    };

    $.ajax(settings).done(function (response) {
        bj_point = response.bj_point;
        br_point = response.br_point;

        // 해당월의 출석체크 기록
        checkDuringThisMonth();
        // 이미 출석체크 했는지 확인
        checkDupl();
    });
}

function checkDuringThisMonth(num) {
    let settings = {
        "url": "/v1/read/attendByIdDuringReg_date_month",
        "method": "POST",
        "data": {
            "user_id": user_id,
            "reg_date_month": month
        }
    };

    $.ajax(settings).done(function (response) {
        response.forEach(e => {
            let checkDay = e.reg_date_check.split(" ")[0].slice(-2);
            if (checkDay.charAt(0) === '0') {
                checkDay = checkDay.charAt(1);
            }
            if (day === checkDay && num != null && day === num) {
                $("#btn" + checkDay).attr('style', 'background-color: rgba(122, 144, 227, 0.6); border: 3px solid rgba(252,100,100,0.63);');

            } else {
                if (num != null) {
                    if (checkDay == num) {
                        $("#btn" + checkDay).attr('style', 'background-color: rgba(122, 144, 227, 0.6); border: 3px solid gray');
                    } else {
                        if (day === checkDay) {
                            $("#btn" + checkDay).attr('style', 'background-color: rgba(122, 144, 227, 0.6); border: 3px solid rgba(252,100,100,0.63);');
                        } else {
                            $("#btn" + checkDay).attr('style', 'background-color: rgba(122, 144, 227, 0.6); border: 3px solid rgba(122, 144, 227, 0.6);');
                        }
                    }
                } else {
                    $("#btn" + checkDay).attr('style', 'background-color: rgba(122, 144, 227, 0.6); border: 3px solid rgba(122, 144, 227, 0.6)');
                }
            }
        })
    });
}

function checkDupl() {
    let settings = {
        "url": "/v1/read/attendByIdAndReg_date_check",
        "method": "POST",
        "data": {
            "user_id": user_id,
            "reg_date_check": dateString
        }
    };

    $.ajax(settings).done(function (response) {
        if (response != "") {
            myContent = response.content;
            $("#comment").attr('placeholder', myContent);
            $("#comment").attr('style', 'color : gray');
            $("#comment").attr('readonly', true);
            $("#comment").removeAttr('required');
            didCreate = true;
            $("#btn" + day).attr('style', "background-color: rgba(122, 144, 227, 0.6); border: 3px solid rgba(252,100,100,0.63)");
        }
    });
}

$(window).on("keypress", e => {
    if (e.key === "Enter") {
        if (!didCreate) {
            createAttend();
        }
    }
})
$(".attendButton").on("click", e => {
        if (!didCreate) {
            createAttend();
        }
    }
)

function createAttend() {
    if (user_id === "" || user_no === "") {
        return;
    }
    let comment = $("#comment").val();
    if(forbiddenCheck(comment,"#comment")){
        return;
    }
    if (comment === "") {
        if (myContent != null) {
            swal("이미 출석체크 하셨습니다.", "", "error");
        } else {
            swal("내용을 입력해주세요.", "", "error");
        }
    } else {
        // 내용 등록
        let settings = {
            "url": "/v1/create/attend",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "user_id": user_id,
                "user_nick": user_nick,
                "content": comment,
                "reg_date_month": month
            }),
        };

        $.ajax(settings).done(function (response) {
            if (response === "성공") {
                updateBjPoint();

                $("#comment").attr('placeholder', comment);
                $("#comment").attr('readonly', true);
                $("#comment").removeAttr('required');

                didCreate = true;

                $("#btn" + day).attr('style', 'background-color: rgba(122, 144, 227, 0.6); border: 3px solid rgba(252,100,100,0.63);');

                show_today_list();
            }
        });
    }
}

function updateBjPoint() {
    bj_point += 1000;

    let settings = {
        "url": "/v1/update/userBjPoint",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "no": user_no,
            "bjPoint": bj_point
        }),
    };
    $.ajax(settings).done(function (response) {
        updateBrPoint();
    });
}

function updateBrPoint() {
    br_point += 100000;

    let settings = {
        "url": "/v1/update/userBrPoint",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "no": user_no,
            "brPoint": br_point
        }),
    };

    $.ajax(settings).done(function (response) {
        updateUserPoints();
    });
}

function goToDate(num) {
    resetBorder(num);
    clickOn = num;
    $("#btn" + num).attr('style', 'border : 3px solid gray');
    if (num == day) {
        if (didCreate) {  // 출첵 O  -> 파란 바탕, 회색 보더
        } else {            // 출첵 X  -> 빨간 바탕, 회색 보더
            $("#btn" + day).attr('style', 'border : 3px solid gray; background-color : rgba(252,100,100,0.63);');
        }
    } else {
        if (didCreate) {  // 출첵 O -> 파란 바탕, 빨간 보더
            $("#btn" + day).attr('style', 'background-color : rgba(122, 144, 227, 0.6);border : 3px solid rgba(252,100,100,0.63);');
            checkDuringThisMonth(num);
        } else {          // 출첵 X  -> 빨간 바탕
            $("#btn" + day).attr('style', 'background-color : rgba(252,100,100,0.63);');
            checkDuringThisMonth(num);
        }
    }
    let date = $("#btn" + num).val();

    if (date.length === 1) {
        date = "0" + date;
    }

    let thatDate = year + "-" + month + "-" + date + " 00:00:00";

    let settings = {
        "url": "/v1/read/attendToday",
        "method": "POST",
        "data": {"reg_date_check": thatDate}
    };

    $.ajax(settings).done(function (response) {
        $(".tbody").empty();
        let data = response;

        if (data != "") {
            data.forEach(e => {
                let nick = e.user_nick;
                let content = e.content;
                let regDateList = e.regDate.split("T");
                let regDate = regDateList[0] + " " + regDateList[1].split(".")[0];

                $(".tbody").append(
                    `<tr>
                        <td class="appendNick">${nick}</td>
                        <td class="appendContent">${content}</td>
                        <td class="appendRegDate">${regDate}</td>
                    </tr>`
                )
            })
        } else {
            $(".tbody").append(
                `<tr>
                        <td class="appendNick"> - </td>
                        <td class="appendContent"> - </td>
                        <td class="appendRegDate"> - </td>
                </tr>`
            )
        }
    });
}

function resetBorder(num) {
    if (clickOn != null) {
        if (clickOn == day) {
            $("#btn" + clickOn).attr('style', 'border: 3px solid rgba(252,100,100,0.63)');
        } else {
            $("#btn" + clickOn).attr('style', 'border: 3px solid rgba(122, 144, 227, 0.6)');
        }
    }
    checkDuringThisMonth(num);
}

function updateUserPoints() {
    let settings = {
        "url": "/v1/update/userPoints",
        "method": "POST",
        "data": {
            "no": user_no,
            "bjPoint": bj_point,
            "brPoint": br_point,
            "what": 3,
        },
    };

    $.ajax(settings).done(function (response) {
        // ajax는 완성
        if (response) {
            swal("출석체크를 완료했습니다.", "블랙잭 포인트 : 1000++ \n 바카라 포인트 : 100000++", "success");
        } else {
            swal("출석체크에 실패했습니다.", "", "error");
        }
    });

}
