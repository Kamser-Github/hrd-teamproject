/**
 * 
 */



let myHtml = "";
let myrow = "";
let start = 0;
//객체 불러오기
$( window ).load(function() {
	setList(3);
});

//let user_id = $(".myBoardID").val();
console.log(user_id);
function setStartList(startPage){
	let endVal = $('.resetList').val();
	let endPage = parseInt(endVal);
	console.log("목록 번호",endPage);
	$.ajax({
	    method : "post",
	    url : 'boardListAction',
	    data : {
	        user_id : $(".myBoardID").val()
	    } 
	}).done(e=>{
	    const list = JSON.parse(e);
		//list lengh => 게시판 목록수
		//번호 클릭이 결국 => 시작 지점.
		//시작 지점+마지막 지점이===length 마지막 지점이 length, 시작시점도 0;
		//시작 지점+마지막 지점이>length 시작지점 0 마지막 지점은 length
		let start = getStartNo(startPage,endPage,list.length);
		console.log('start 번호',start);
		console.log('start 타입',typeof start);
		console.log('길이 타입',typeof endPage);
		console.log('마지막 번호',(start+endPage));
		for(let i=start ; i<(start+endPage) ; i++){
			getBoard(list[i]);
		}
	})
	myrow="";
}
function resetList(value){
	$('.rows').empty();
	if($('.rows').html()===''){
		console.log("호출");
		setList(value);
	}
}

function setList(value){
	let end = value;
	let start = 0;
	$.ajax({
	    method : "post",
	    url : 'boardListAction',
	    data : {
	        user_id : $(".myBoardID").val()
	    }
	}).done(e=>{
	    const list = JSON.parse(e);
		console.log(list);
		//list lengh => 게시판 목록수
		//번호 클릭이 결국 => 시작 지점.
		if(value>list.length){
			value = list.length;
		}
		let boardNo = 0;
		for(let i=start ; i<end ; i++){
			boardNo = list[i].b_no;
			console.log(boardNo);
			getBoard(list[i],boardNo);
		}
		myrow="";
	})
}

function getBoardEach(jsonObject){
	//
	console.log("너의이름은  ",jsonObject.user_Id);
	myHtml+="<td>"+jsonObject.b_no+"</td>"
	myHtml+="<td>"+"<a href='boardView?no="+jsonObject.b_no+"'>"+jsonObject.content+"</a></td>"
	myHtml+="<td>"+jsonObject.user_id+"</td>"
	myHtml+="<td>"+jsonObject.regDate+"</td>"
	myrow+="<tr class='row'>"+myHtml+"</tr>";
	$(".rows").html(myrow);
	myHtml="";
}

function getBoard(jsonObject,boardNo){
	$.each( jsonObject, function( i, item ) {
		if(i!=='title'){
			myHtml += "<td>" + item + "</td>";
			return;
		}
		myHtml +="<td>"+"<a href='boardView?no="+boardNo+"'>"+item+"</a>"+"</td>";
   });
   	myrow += "<tr class='row'>"+myHtml+"</tr>";
	myHtml="";
	$(".rows").html( myrow );
}
function getStartNo(startIdx,viewLength,length){
	console.log('startIdx type',typeof startIdx);
	console.log('viewLength type',typeof viewLength);
	console.log('length type',typeof length);
	let start = (startIdx-1)*viewLength;
	if(start+viewLength<length){
		return start;
	}
	let limit = length-viewLength;
	console.log('limit : ',limit);
	return limit<0 ? 0 : limit;
}