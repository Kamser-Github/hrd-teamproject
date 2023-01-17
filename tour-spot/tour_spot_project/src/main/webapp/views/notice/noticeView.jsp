<%@page import="notice.NoticeDto"%>
<%@page import="notice.NoticeDao"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="resources/form22.css">
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
</style>
<title>Tour_Spot</title>
</head>
<body>
	<%
	request.setCharacterEncoding("utf-8");
	String id = (String)session.getAttribute("log");
	System.out.println(id);
	NoticeDao dao = NoticeDao.getInstance();
	NoticeDto dto = null;
	int n_no = Integer.parseInt(request.getParameter("no"));
	System.out.println(n_no);
	if(n_no > 0) {
		dto = dao.getNoticeByNo(n_no);
		dao.updateViewCnt(n_no);
	%>
	<jsp:include page="/views/header.jsp" />
	<section style="height:50vw;">
		<div class="form-container">
			<div style="width : 100%;">
				<input class="title" type="text" value="<%=dto.getTitle() %>" readonly>
			</div>
			<div class="main">
				<table style="width: 100%; height: 60px;border-top: solid 1px; border-bottom: solid 1px; border-left: none; border-right: none;">
					<tr>
						<td class="user" style="text-align: left;"><%=dto.getUser_id()%></td>
						<td class="date" style="text-align: center; font-weight: 100"><%=dto.getRegDate()%></td>
						<td class="view" style="text-align: right;">조회수:<%=dto.getViewCnt()%></td>
					</tr>
				</table>			
			</div>
			<div class="con">
				<textarea rows="20" readonly><%=dto.getContent()%></textarea>
			</div>
			<div class="board_menu">
				<input class="list-button" type="button" onclick="location.href='notice'" value="글 목록">
				<%if(id != null && id.equals("admin")) {%>
				<form method="post" action="service">
					<div>
					<input type="hidden" name="no" id="no" value="<%=dto.getN_no()%>">
					<input type="hidden" name="command" value="NoticeDelete">
					<input class="list-button" type="submit" value="글 삭제">
					</div>
				</form>
				<%}%>
			</div>
		</div>			
	</section>
	<%} else {
	response.sendRedirect("notice");
	}%>
	<jsp:include page="/views/boardfooter.jsp" />
</body>
</html>