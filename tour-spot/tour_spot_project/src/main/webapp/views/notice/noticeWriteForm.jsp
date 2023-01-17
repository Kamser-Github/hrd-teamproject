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
			<div class="writeButton">
				<input type="hidden" name="command" value="NoticeWrite">
				<input style="margin-right:10px;" class="button" type="submit" value="글등록">
			</div>
		</form>
	</div>
	</section>
	<jsp:include page="/views/footer.jsp" />
</body>
</html>