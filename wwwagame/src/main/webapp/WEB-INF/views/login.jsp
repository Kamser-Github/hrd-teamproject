<%--
  Created by IntelliJ IDEA.
  User: Bo
  Date: 2022-11-19
  Time: 오후 9:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
<html>
<head>
    <title>로그인</title>
</head>
<body>
<div>
    <form>

    아이디: <input type="text" id="id" required placeholder="아이디"> <br>
    비밀번호: <input type="password" id="pw" required>
    <button type="button" id="button" onclick="login()">로그인</button>
    </form>
</div>
<script src="script/login.js"></script>
</body>
</html>
