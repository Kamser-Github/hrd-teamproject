<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Tour_Spot</title>
</head>
<body>
	<jsp:include page="/views/header.jsp"/>
    <section>
    	<div class="search">
			<input type="text" class="search-txt" name="area" placeholder="주소 검색">
			<button id="search-btn" onclick="getSpotByRegion()">검색</button>
		</div>
		<div class="search-content">
			<table>
				<thead class="spotTitle"></thead>
				<tbody class="spotInfo"></tbody>
			</table>
		</div>
    </section>
    <script src="resources/searchByRegion.js"></script>
    <jsp:include page="/views/footer.jsp"/>
</body>
</html>