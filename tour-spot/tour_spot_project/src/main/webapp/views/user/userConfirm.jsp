<%@page import="user.UserDao"%>
<%@page import="user.UserDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Tour_Spot</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
	<script src="https://kit.fontawesome.com/fa861a7902.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="resources/mypageIndex.css">
	<script src="resources/sociallogin.js" charset="utf-8"></script>
</head> 
<body>
	<jsp:include page="/views/header.jsp" />
	<section class="userWrap">
		<div class="login-wrapper" style="height:80vh;"> 
			<h2 id="del_check_pw">정보 확인</h2>
			<form method="post" action="service" id="login-form">
				<input type="text" name="id" placeholder="Email"> 
				<input type="hidden" name="command" value="MypageGo">
				<input type="password" name="password" placeholder="Password">
				<input type="submit" value="Check">
			</form>
		</div>
	</section>
	<jsp:include page="/views/footer.jsp" />
</body>
</html>