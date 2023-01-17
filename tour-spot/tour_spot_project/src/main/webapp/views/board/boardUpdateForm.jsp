<%@page import="board.BoardDto"%>
<%@page import="board.BoardDao"%>
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
	<%
	request.setCharacterEncoding("utf-8");
	String id = (String)session.getAttribute("log");
	
	BoardDao dao = BoardDao.getInstance();
	BoardDto board = null;
	int b_no = -1;
	if(request.getParameter("no") != null) {
		b_no = Integer.parseInt(request.getParameter("no"));
		board = dao.getBoardByNo(b_no); 
	}%>
	
	<%if(board != null && board.getUser_id().equals(id) && b_no != -1) { 
		b_no = Integer.parseInt(request.getParameter("no"));
		board = dao.getBoardByNo(b_no); %>
	
    <div class="form-container">
        <form method="post" action="service">
        	<input type="hidden" name="command" value="BoardUpdate">
        	<input type="hidden" name="b_no" value="<%=b_no%>">
        	<div class="main">
            	<input class="title" type="text" name="title" value="<%=board.getTitle() %>">
            	<textarea class="content" name="content" rows="20"><%=board.getContent() %></textarea>
            </div>
            <div class="address">
          		<h5>주소</h5>
            	<input class="address_num" style="margin-top:5px; width:30%;border:0;" type="text" name="postcode" id="postcode" placeholder="우편번호">
				<input class="address_find" type="button" onclick="addressSearch()" value="우편번호 찾기"> 
			</div>
			<input style="margin-top:10px;border:0;" type="text" name="main_address" id="main_address" placeholder="주소">
			<input style="margin-top:5px;border:0;" type="text" name="detail_address" id="detail_address" placeholder="상세주소">
            <div class="mapBox">
            	<div id="map" style="width:100%;height:400px;"></div>
            </div>
            <div class="writeButton">
	            <input class="button" type="submit" value="수정하기">
			</div>
        </form>
    </div>
	<%}
	else {
		response.sendRedirect("board"); // borad 조회 실패 -> 페이지 이동
		System.out.println("조회실패");
	}%>
	<script src="resources/searchMap.js"></script>
	</section>
	<jsp:include page="/views/boardfooter.jsp" />
</body>
</html>