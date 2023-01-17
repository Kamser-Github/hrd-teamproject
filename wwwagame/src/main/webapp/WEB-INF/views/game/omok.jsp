<%--
  Created by IntelliJ IDEA.
  User: Bo
  Date: 2022-11-21
  Time: 오후 4:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" href="/css/omok.css">
    <link rel="stylesheet" href="/css/open.css">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>omok</title>
</head>
<body>
<jsp:include page="../header.jsp"></jsp:include>
<c:set var="gameName" value="omok" scope="request"/>
<div class="container my-5" style="padding-bottom: 4%">
    <div class="col-12" style="padding-top: 5%">
        <div class="main">
            <header><h2>오목</h2>
            </header>
            <h3 id="player"></h3>
            <section>
                <div class="board">
                    <div class="map"></div>
                </div>
            </section>
        </div>
    </div>
<%--    <div class="container  my-5">--%>
<%--        <div class="mini_comment col-12">--%>
<%--            <c:import url="../comment.jsp"/>--%>
<%--        </div>--%>
<%--    </div>--%>
</div>
<script src="/script/game/omok.js"></script>
<script src="/script/open.js"></script>
<c:import url="../footer.jsp"/>
<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
