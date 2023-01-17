<%--
  Created by IntelliJ IDEA.
  User: Bo
  Date: 2022-11-14
  Time: 오후 9:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="shortcut icon" href="/img/team/three.png">
    <meta property="og:title" content="wwwagame">
    <meta property="og:description" content="삼행성">
    <meta property="og:image" content="/img/team/three.png">

    <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
    <script src="https://code.jquery.com/jquery-2.2.4.js"></script>
    <script scr="/css/open.css" rel="stylesheet"></script>
    <link rel="stylesheet" href="/css/baccarat.css">
    <title>바카라</title>
</head>
<body>
<c:import url="header.jsp"/>
<c:set var="gameName" value="baccarat" scope="request"/>
<section>
    <div class="container">
        <div id="game"></div>
        <div class="row">
            <div class="col-10 mx-auto">
                <input type="hidden" id="log" value="${sessionScope.log.getNo()}">
                <div style="font-family: 'Noto Sans KR', sans-serif; font-weight: 900; position:absolute; left:-1000px; visibility:hidden;">
                </div>
            </div>
        </div>

    </div>

    <script src="script/baccarat.js"></script>
    <c:import url="comment.jsp"/>
</section>
<c:import url="footer.jsp"/>

</body>
</html>
