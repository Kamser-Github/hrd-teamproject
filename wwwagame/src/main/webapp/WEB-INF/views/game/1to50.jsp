<%--
  Created by IntelliJ IDEA.
  User: Bo
  Date: 2022-11-21
  Time: 오후 4:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <link rel="stylesheet" href="/css/1to50.css">
    <link rel="stylesheet" href="/css/open.css">
    <title>1to50</title>
</head>
<body>
<jsp:include page="../header.jsp"></jsp:include>
<c:set var="gameName" value="1to50" scope="request"/>
<div class="main">

    <header>
        <h2>1 TO 50</h2>
        <h2 id="timer">0초</h2>
    </header>
    <section>
        <div class="map"></div>
    </section>

</div>

<script src="/script/game/1to50.js"></script>
<c:import url="../comment.jsp"/>
<c:import url="../footer.jsp"/>
</body>
</html>
