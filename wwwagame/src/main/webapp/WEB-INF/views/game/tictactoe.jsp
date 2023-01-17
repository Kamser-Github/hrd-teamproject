<%--
  Created by IntelliJ IDEA.
  User: Bo
  Date: 2022-11-21
  Time: 오후 4:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<script src="https://kit.fontawesome.com/abd4943d11.js" crossorigin="anonymous"></script>
<html>
<head>
  <link rel="stylesheet" href="/css/tictacto.css">
  <link rel="stylesheet" href="/css/open.css">
  <title>tictacto</title>
</head>
<body>
<jsp:include page="../header.jsp"></jsp:include>
<c:set var="gameName" value="tictactoe" scope="request"/>
<div class="main">

  <header> <h2>Tic Tac Toe</h2> </header>
  <div class="map1"></div>

  <!-- modal -->
  <div class="modal2">
    <div class="modal-content2">
      <span>PLAYER <p>0</p></span><br>
      <button onclick="location.reload()">다시하기</button>
    </div>
  </div>
</div>
<script src="/script/game/tictacto.js"></script>
<c:import url="../comment.jsp"/>
<c:import url="../footer.jsp"/>
</body>
</html>
