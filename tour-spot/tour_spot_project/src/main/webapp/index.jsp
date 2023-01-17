<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="resources/index.css">
<title>Tour_Spot</title>
<script src="resources/sociallogin.js" charset="utf-8"></script>
</head>
<body>
	<div class="login-wrapper"> 
		<h2>Login</h2>
		<form method="POST" id="login-form" action="service">
			<input type="hidden" name="command" value="Login">
			<input type="text" name="id" placeholder="Email"> 
			<input type="password" name="password" placeholder="Password">
			<input type="submit" value="Login">
			<input type="button" onclick="location.href='home'" value="비회원">
		</form>
		<img src="kakao_login_img/kakao_login_large_wide.png" onclick='getToken()' style="width: 400px;">
	</div>
</body>
</html>