<%@page import="user.UserDto"%>
<%@page import="user.UserDao"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>관광지</title>
	<link rel="stylesheet" href="resources/gridFormMypageHeader.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
</head>
<body>
	<%
	String id = (String)session.getAttribute("log");
	UserDao dao = UserDao.getInstance();
	UserDto dto = dao.getUserById(id);
	%>
	<header>
		<%if(id == null) {%>
		<table>
			<tr>
				<td><input type="button" onclick="location.href='home'" value="홈으로"></td>
				<td><input type="button" onclick="location.href='index'" value="로그인"></td>
				<td><input type="button" onclick="location.href='join'" value="회원가입"></td>
			</tr>
		</table>
		<%} %>
		<%if(id != null) { %>
			<table>
				<tr>
					<td><input type="button" onclick="location.href='home'" value="홈으로"></td>
					<td>
						<form method="POST" action="service">
							<input type="submit" value="로그아웃">
							<input type="hidden" name="command" value="Logout">
						</form>
					</td>
					<td><%=dto.getName() %>님 환영합니다.</td>
					
				</tr>
			</table>
		<%} %>
		<div id="header">
			<h1>Tour_Spot</h1>
		</div>
	</header>
	
	<nav>
		<a href="home">홈으로</a>
		<a href="board">커뮤니티</a>
		<a href="notice">공지사항</a>
		<a href="userConfirm">마이페이지</a>
		<div class="animation start-home"></div>
	</nav>

</body>
</html>