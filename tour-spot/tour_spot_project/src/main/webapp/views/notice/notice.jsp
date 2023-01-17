<%@page import="java.sql.Timestamp"%>
<%@page import="notice.NoticeDto"%>
<%@page import="java.util.ArrayList"%>
<%@page import="notice.NoticeDao"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="resources/boardTable.css">
<title>Tour_Spot</title>
</head>
<body>
	<%
	String id = (String)session.getAttribute("log");
	NoticeDao dao = NoticeDao.getInstance();
	ArrayList<NoticeDto> list = dao.getNoticeAll();
	%>
</body>
	<jsp:include page="/views/header.jsp" />
	<div class="table-container">
		<table border="1">
			<thead>
				<tr>
					<th style="border-left: hidden;">번호</th>
					<th width="200px">제목</th>
					<th>작성자</th>
					<th>작성날짜</th>
					<th>등록날짜</th>
					<th style="border-right: hidden;">조회수</th>
				</tr>
			</thead>
			<tbody>
				<%for(NoticeDto notice : list) {%>
				<tr>
					<td style="border-left: hidden; width: 35px; text-align: center;"><%=notice.getN_no() %></td>
					<td style="width: 350px;"><a href="noticeView?no=<%=notice.getN_no()%>"><%=notice.getTitle() %></a></td>
					<td style="width: 140px; text-align: center;"><%=notice.getUser_id() %></td>
					<td style="width:130px; text-align: center;"><%=notice.getRegDate() %></td>
					<td style="width:130px; text-align: center;"><%=notice.getRegDate() %></td>
					<td style="border-right: hidden; width: 60px; text-align: center;""><%=notice.getViewCnt() %></td>
				</tr>
				<%} %>
			</tbody>
		</table>
		<div style="width:100%;">
		<%if(id != null) {%>
			<%if(id.equals("admin")) {%>
			<button onclick="location.href='noticeWriteForm'">글쓰기</button>
			<%}%>
		<%}%>
		</div>
	</div>
	<jsp:include page="/views/footer.jsp" />
</html>