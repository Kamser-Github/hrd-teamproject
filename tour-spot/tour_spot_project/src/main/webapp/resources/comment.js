// 등록
function createCmt(b_no) {
	const id = $(".user_id").val();
	const content = $(".content").val();
	const modDate = $(".modDate").val();
	const command = $(".command").val();
	console.log("cmd : " + command);

	console.log(content);
	$.ajax({
		method: "post",
		url: "service?command=CommentWrite",
		data: {
			content: content,
			b_no: b_no,
			modDate : modDate,
		}
	}).done(function(response) {
		const list = JSON.parse(response);
		console.log("response", list);

		var lists = document.getElementById("cmt_list");
		var output = "";


		list.forEach(e => {
			const cmt_user_id = e.user_id;
			const b_no = e.b_no;
			const content = e.content;
			const c_no = e.c_no;
			const modDate = e.modDate;
			console.log(modDate);

			output += '<tr>';
			output += '<td class="id" style="width: 50%;">' + cmt_user_id + '</td>';
			output += '<td colspan="2" class="modDate">' + modDate + '</td>';
			output += '</tr>';
			output += '<tr>';
			output += '<td class="content">' + content + '</td>';
			if (id == (cmt_user_id)) {
				output += '<td class="content_button"><button name="update-cmt" onclick="updateCmt(' + b_no + ', ' + c_no + ')">수정</button></td>';
				output += '<td class="content_button"><button name="delete-cmt" onclick="deleteCmt(' + b_no + ', ' + c_no + ')">삭제</button></td>';
			};
			output += '</tr>';

			lists.innerHTML = output;

		});
	});
};

// 삭제
function deleteCmt(b_no, c_no) {
	const id = $(".user_id").val();
	const content = $(".content").val();

	$.ajax({
		method: "POST",
		url: "service?command=CommentDelete",
		data: {
			content: content,
			b_no: b_no,
			c_no: c_no
		}
	}).done(function(response) {
		const list = JSON.parse(response);
		console.log("response", list);

		var lists = document.getElementById("cmt_list");
		var output = "";
		
		if(list === null) {
			lists.innerHTML = output;
		} else {


		list.forEach(e => {
			const cmt_user_id = e.user_id;
			const b_no = e.b_no;
			const content = e.content;
			const c_no = e.c_no;
			const modDate = e.modDate;

			output += '<tr>';
			output += '<td class="id" style="width: 50%;">' + cmt_user_id + '</td>';
			output += '<td colspan="2" class="modDate">' + modDate + '</td>';
			output += '</tr>';
			output += '<tr>';
			output += '<td class="content">' + content + '</td>';
			if (id == (cmt_user_id)) {
				output += '<td class="content_button"><button name="update-cmt" onclick="updateCmt(' + b_no + ', ' + c_no + ')">수정</button></td>';
				output += '<td class="content_button"><button name="delete-cmt" onclick="deleteCmt(' + b_no + ', ' + c_no + ')">삭제</button></td>';
			};
			output += '</tr>';

			lists.innerHTML = output;

		});
		}
	});
}

// 수정 글입력창 생성
function updateCmt(b_no, c_no) {
	const id = $(".user_id").val();
	const content = $(".content").val();

	$.ajax({
		method: "POST",
		url: "service?command=CommentUpdate",
		data: {
			content: content,
			b_no: b_no,
			c_no: c_no
		}
	}).done(function(response) {
		const list = JSON.parse(response);

		var lists = document.getElementById("cmt_list");
		var output = "";
		
		list.forEach(e => {
			const cmt_user_id = e.user_id;
			const b_no = e.b_no;
			const content = e.content;
			const cmt_no = e.c_no;
			const modDate = e.modDate;

			output += '<tr>';
			output += '<td class="id" style="width: 50%;">' + cmt_user_id + '</td>';
			output += '<td colspan="2" class="modDate">' + modDate + '</td>';
			output += '</tr>';
			output += '<tr>';
			if (c_no == cmt_no) {
				output += '<td><input id="upcontent" class="upcontent" name="upcontent" value="' + content + '"></td>';
				output += '<td class="content_button"><button name="update-cmt" onclick="updateComment(' + b_no + ', ' + c_no + ')">수정</button></td>';
				output += '<td class="content_button"><button name="update-cmt" onclick="updateCancle(' + b_no + ')">취소</button></td>';
			} else {
				output += '<td class="content">' + content + '</td>';
				if (id == (cmt_user_id)) {
					output += '<td class="content_button"><button name="update-cmt" onclick="updateCmt(' + b_no + ', ' + c_no + ')">수정</button></td>';
					output += '<td class="content_button"><button name="delete-cmt" onclick="deleteCmt(' + b_no + ', ' + c_no + ')">삭제</button></td>';
				};
			}
			output += '</tr>';			
			lists.innerHTML = output;
		});
	});
}

// 수정 취소
function updateCancle(b_no) {
	/*$('.cmt_list').empty();*/
	
	const id = $(".user_id").val();
	const content = $(".content").val();

	$.ajax({
		method: "POST",
		url: "service?command=CommentUpdateNo",
		data: {
			content : content,
			b_no: b_no
		},
		datatype : 'JSON'
	}).done(function(response) {
		const list = JSON.parse(response);
		console.log("response", list);

		var lists = document.getElementById("cmt_list");
		var output = "";


		list.forEach(e => {
			const cmt_user_id = e.user_id;
			const b_no = e.b_no;
			const content = e.content;
			const c_no = e.c_no;
			const modDate = e.modDate;

			output += '<tr>';
			output += '<td class="id" style="width: 50%;">' + cmt_user_id + '</td>';
			output += '<td colspan="2" class="modDate">' + modDate + '</td>';
			output += '</tr>';
			output += '<tr>';
			output += '<td class="content">' + content + '</td>';
			if (id == (cmt_user_id)) {
				output += '<td class="content_button"><button name="update-cmt" onclick="updateCmt(' + b_no + ', ' + c_no + ')">수정</button></td>';
				output += '<td class="content_button"><button name="delete-cmt" onclick="deleteCmt(' + b_no + ', ' + c_no + ')">삭제</button></td>';
			};
			output += '</tr>';

			lists.innerHTML = output;

		});
	});
}

// 수정 완료 업데이트
function updateComment(b_no, c_no) {
	/*$('.cmt_list').empty();*/
	
	const id = $(".user_id").val();
	const content = $(".content").val();
	const upcontent = $("#upcontent").val();
	console.log(upcontent);

	$.ajax({
		method: "POST",
		url: "service?command=CommentUpdateYes",
		data: {
			upcontent : upcontent,
			content: content,
			b_no: b_no,
			c_no: c_no
		}
	}).done(function(response) {
		const list = JSON.parse(response);
		console.log("response", list);

		var lists = document.getElementById("cmt_list");
		var output = "";


		list.forEach(e => {
			const cmt_user_id = e.user_id;
			const b_no = e.b_no;
			const content = e.content;
			const c_no = e.c_no;
			const modDate = e.modDate;

			output += '<tr>';
			output += '<td class="id" style="width: 50%;">' + cmt_user_id + '</td>';
			output += '<td colspan="2" class="modDate">' + modDate + '</td>';
			output += '</tr>';
			output += '<tr>';
			output += '<td class="content">' + content + '</td>';
			if (id == (cmt_user_id)) {
				output += '<td class="content_button"><button name="update-cmt" onclick="updateCmt(' + b_no + ', ' + c_no + ')">수정</button></td>';
				output += '<td class="content_button"><button name="delete-cmt" onclick="deleteCmt(' + b_no + ', ' + c_no + ')">삭제</button></td>';
			};
			output += '</tr>';

			lists.innerHTML = output;

		});
	});
}