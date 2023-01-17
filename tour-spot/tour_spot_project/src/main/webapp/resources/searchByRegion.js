let documents = 10;
let page = 1;
let is_end = false;
let size = 50;

function getSpotByRegion() {
	$('.spotTitle').empty();
	$('.spotInfo').empty();
	
	const area = $('.search-txt').val();
	console.log(area);
	// ajax();
	$.ajax({
		method: "POST",
		url: "service?command=SearchByRegion",
		data: {
			area: area
		}
	}).done(function(response) {
		console.log(area);
		const list = JSON.parse(response);
		console.log("response", list);

		$('.spotTitle').append(
			`<tr>
				<td>번호</td>
				<td>이미지</td>
				<td>제목</td>
				<td>작성자</td>
				<td>작성날짜</td>
				<td>수정날짜</td>
				<td>조회수</td>
			</tr>`
		)

		list.forEach(e => {
			// 번호 제목 작성자 작성날짜 수정날짜 조회수
			const b_no = e.b_no;
			const title = e.title;
			const user_id = e.user_id;
			const regDate = e.regDate;
			var modDate = e.modDate;
			const viewCnt = e.viewCnt;
			const img_url = e.img_url;
			/*console.log(img_url);*/
			
			if(modDate === undefined) {
				modDate = "";
			}
			
			$('.spotInfo').append(
				`<tr>
					<td>${b_no}</td>
					<%if(img_url != null) {%>
					<td><img src="${img_url}" width=100 height=100></td>
					<%}%>
					<td><a href="boardView?no=${b_no}">${title}</a></td>
					<td>${user_id}</td>
					<td>${regDate}</td>
					<td>${modDate}</td>
					<td>${viewCnt}</td>
				</tr>`
			)
		})
	});
}