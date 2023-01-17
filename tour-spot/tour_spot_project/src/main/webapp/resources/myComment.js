/**
 * 
 */



let myHtml = "";
let myrow = "";
let start = 0;

$(window).load(function() {
	setList(3);
});

setList(3);
function setStartList(startPage){
	//$('tr').remove();
	let endVal = $('.resetList').val();
	let endPage = parseInt(endVal);
	console.log("목록 번호",endPage);
	$.ajax({
	    method : "post",
	    url : 'UserCommentAction',
	    data : {
	        user_id : $(".myCommentID").val()
	    }
	}).done(e=>{
	    const list = JSON.parse(e);
		//list lengh => 게시판 목록수
		//번호 클릭이 결국 => 시작 지점.
		//시작 지점+마지막 지점이===length 마지막 지점이 length, 시작시점도 0;
		//시작 지점+마지막 지점이>length 시작지점 0 마지막 지점은 length
		let start = getStartNo(startPage,endPage,list.length);
		for(let i=start ; i<(start+endPage) ; i++){
			getBoardEach(list[i]);
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
	    url : 'UserCommentAction',
	    data : {
	        user_id : $(".myCommentID").val()
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
			boardNo = list[i].c_no;
			console.log(boardNo);
			//getBoard(list[i],boardNo);
			getBoardEach(list[i]);
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

/*
appendButton();
function appendButton(){
	let boardHtml = "";
	$.ajax({
		method : 'GET',
		url : 'account',
		data : { 
			user_id : 'onmy123'
		}
	}).done(e=>{
		let size = $('.resetList').val();
		let totalBoards = parseInt(e);
		let lastPage = Math.ceil(totalBoards/size);
		for(let i=0; i<lastPage ; i++){
			boardHtml+=<a href="aaaa">(i+1)</a>;
		}
	});
}
*/
/*
처음에 밑에 1~ 5까지 출력
5를 누르거나 다음을 누르면 다음 페이지 출력
갯수가 늘지 않으면 그대로 유지
*/
