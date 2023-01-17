<%@page import="comment.CommentDto"%>
<%@page import="comment.CommentDao"%>
<%@page import="java.util.ArrayList"%>
<%@page import="board.BoardDto"%>
<%@page import="board.BoardDao"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=	c4fe4f7a920db65124e99252c9f6071e&libraries=services"></script>
<link rel="stylesheet" href="resources/form22.css">
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
</style>
<title>Tour_Spot</title>
</head>
<body>
	<%
	request.setCharacterEncoding("utf-8");
	String id = (String) session.getAttribute("log");
	System.out.println("id : " + id);
	BoardDao dao = BoardDao.getInstance();
	BoardDto board = null;
	CommentDao commentDao = CommentDao.getInstance();
	int b_no = Integer.parseInt(request.getParameter("no"));
	if (request.getParameter("no") != null) {
		ArrayList<CommentDto> list = commentDao.getCommentAll(b_no);
		dao.updateViewCnt(b_no);
		board = dao.getBoardByNo(b_no);
	%>
	<jsp:include page="/views/header.jsp" />
	<section>
		<div class="form-container">
			<form method="post" action="service">
				<input type="hidden" name="main_address" id="main_address"
					value="<%=board.getMap_addr()%>">
				<div style="width: 100%;">
					<input class="title" type="text" value="<%=board.getTitle()%>"
						readonly>
				</div>
				<div class="main">
					<table style="width: 100%; height: 60px;border-top: solid 1px; border-bottom: solid 1px; border-left: none; border-right: none;">
						<tr>
							<%if (board.getModDate() == null) {%>
							<td class="user" style="text-align: left;"><%=board.getUser_id()%></td>
							<td class="date" style="text-align: center; font-weight: 100"><%=board.getRegDate()%></td>
							<td class="view" style="text-align: right;">조회수:<%=board.getViewCnt()%></td>
							<%} else {%>
							<td class="user" style="text-align: left;"><%=board.getUser_id()%></td>
							<td class="date" style="text-align: center; font-weight: 100"><%=board.getModDate()%></td>
							<td class="view" style="text-align: right;">조회수:<%=board.getViewCnt()%></td>
							<%}%>
						</tr>
					</table>
				</div>
				<div class="con">
					<textarea rows="20" readonly><%=board.getContent()%></textarea>
				</div>
				<div class="map_image">
					<%if(!board.getMap_addr().equals("")) {%>
						<div id="map" style="width: 100%; height: 300px;"></div>
					<%} %>
					<div id="image" style="width:100%;margin-left: 10px;overflow:hidden;">
					<%System.out.println("test" + board.getImg_url()); %>
					<%if(!board.getImg_url().equals("")) {%>
						<img src="<%=board.getImg_url()%>" />
					<%} %>
					</div>
				</div>
				<div class="board_menu">
					<input class="list-button" type="button" onclick="location.href='board'" value="글 목록">
					<%if (id != null && id.equals(board.getUser_id())) {%>
					<input type="hidden" name="no" id="no" value="<%=board.getB_no()%>">
					<input type="hidden" name="command" id="no" value="BoardDelete">
					<input class="list-button" type="button" onclick="location.href='boardUpdateForm?no=<%=board.getB_no()%>'" value="글 수정">
					<input class="list-button" type="submit" value="글 삭제">
					<%}%>
				</div>
			</form>
			<div class="cmt_container">
				<input type="hidden" name="id" class="user_id" value="<%=id%>">
				<input type="hidden" name="b_no" class="b_no" value="<%=b_no%>">
				<h4>댓글</h4>
				<%if(id != null){ %>
					<textarea id="content" class="content" name="content" placeholder="댓글을 입력하세요." rows="1"></textarea>				
				<%}else{ %>
					<textarea id="content" class="content" name="content" placeholder="로그인을 하세요." rows="1"></textarea>				
				<%} %>				
			</div>
			<div class="cmt_button">
				<input type="hidden" class="command" name="command" value="CommentWrite">
				<%if(id != null){ %>
					<button name="create_cmt" onclick="createCmt(`<%=b_no%>`)">댓글등록</button>
				<%}%>
			</div>
			<div class="cmt">
				<table border="1">
					<tbody class="cmt_list" id="cmt_list">
						<%for (CommentDto cmt : list) {%>
						<tr>
							<td class="id" style="width: 50%;"><%=cmt.getuser_id()%></td>
							<td colspan="2" class="modDate"><%=cmt.getModDate()%></td>
						</tr>
						<tr>
							<td class="content"><%=cmt.getContent()%></td>
							<%if(id != null && id.equals(cmt.getuser_id())) {%>
							<td class="content_button"><button name="update-cmt" onclick="updateCmt('<%=b_no%>', '<%=cmt.getc_no()%>')">수정</button></td>
							<td class="content_button">
								<input type="hidden" class="command" name="command" value="CommentDelete">
								<button name="delete-cmt" onclick="deleteCmt('<%=b_no%>', '<%=cmt.getc_no()%>')">삭제</button>
							</td>
							<%} %>
						</tr>
						<%}%>
					</tbody>
				</table>
			</div>
			<%} else {
			response.sendRedirect("board"); // borad 조회 실패 -> 페이지 이동
			}
			%>
		</div>
	</section>
	<jsp:include page="/views/boardfooter.jsp" />
	<script src="resources/map.js"></script>
	<script src="resources/comment.js"></script>
</body>
</html>