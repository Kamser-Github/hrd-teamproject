<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="resources/writeForm.css">
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=	c4fe4f7a920db65124e99252c9f6071e&libraries=services"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<title>Tour_Spot</title>
</head>
<body>
<jsp:include page="/views/header.jsp" />
	<section>
	<div class="form-container">
		<form method="post" action="service">
			<div class="main">
			<input class="title" type="text" name="title" placeholder="제목" required>
			<textarea class="content" name="content" rows="20" placeholder="글내용" required></textarea>
			</div>
			<div class="address">
				<h5>주소</h5>
				<input class="address_num" style="margin-top:5px; width:30%;border:0;" type="text" name="postcode" id="postcode" placeholder="우편번호">
				<input class="address_find" type="button" onclick="addressSearch()" value="우편번호 찾기"> 
			</div>
				<input style="margin-top:10px;border:0;" type="text" name="main_address" id="main_address" placeholder="주소">
				<input style="margin-top:5px;border:0;" type="text" name="detail_address" id="detail_address" placeholder="상세주소">
				<h5 style="margin-top:20px;">이미지</h5>
				<input style="margin-top:5px;border:0;" type="text" name="spot_img" id="spot_img" placeholder="이미지 url을 적어주세요.">
			<div class="mapBox">
				<div id="map" style="width:100%;height:400px;"></div>
			</div>
			<div class="writeButton">
				<input type="hidden" name="command" value="BoardWrite">
				<input class="button" type="submit" value="글등록">
			</div>
		</form>
	</div>
	
	<script src="resources/searchMap.js"></script>
	<script src="resources/map.js"></script>
	</section>
	<jsp:include page="/views/boardfooter.jsp" />
</body>
</html>