<%@page import="java.sql.Timestamp"%>
<%@page import="user.UserDto"%>
<%@page import="user.UserDao"%>
<%@page import="board.BoardDao"%>
<%@page import="board.BoardDto"%>
<%@page import="java.util.ArrayList"%>
<%@page import="util.DBManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Tour_Spot</title>
<link rel="stylesheet" href="resources/grid.css">
<link rel="stylesheet" href="resources/userJoinTest.css">
<link rel="stylesheet" href="resources/table.css">
</head>
<body>
	<%
	HttpSession sesion = request.getSession();
	String userId = (String) sesion.getAttribute("log");
	//BoardDao dao = BoardDao.getInstance();
	//ArrayList<BoardDto> list = dao.getBoardUserAll(userId);
	%>
	<input class="myCommentID" type="hidden" value="<%=userId%>">
	<jsp:include page="/views/header.jsp"/>
	<section class="userWrap">
	<ul class="userNav_list">
		<li><a href="userPageNew">정보 수정</a></li>
		<li><a href="myBoard">내가 쓴 게시글</a></li>
		<li><a href="myComment">내가 쓴 댓글</a></li>
		<li><a href="myDeleteUser">회원탈퇴</a></li>
	</ul>
	<input id="totalBoards" type="hidden">
	<select class="resetList" onchange="resetList(this.value)">
		<option value='1' >목록 : 1개씩</option>
		<option value='2' >목록 : 2개씩</option>
		<option value='3' selected >목록 : 3개씩</option>
	</select>
	<div class="table-container">
        <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th width="200px">제목</th>
                    <th>작성자</th>
                    <th>작성날짜</th>
                    <th>수정날짜</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody class="rows">
            </tbody>
        </table>
    </div>
    <div class="navLink">
    	<button onclick='setStartList(1)'>클릭 1</button>
    	<button onclick='setStartList(2)'>클릭 2</button>
    	<button onclick='setStartList(3)'>클릭 3</button>
    </div>
    </section>
    <jsp:include page="/views/footer.jsp" />
    <script src="resources/myComment.js" charset="utf-8"></script>
</body>
</html>