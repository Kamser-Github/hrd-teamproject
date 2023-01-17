<%--
  Created by IntelliJ IDEA.
  User: Bo
  Date: 2022-11-19
  Time: 오후 4:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script
        src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
        crossorigin="anonymous"></script>
<!-- static은 절대 경로라 static 밑으로만 주소 써주면 됨 -->
<script src="script/join.js"></script>
<script src="https://kit.fontawesome.com/abd4943d11.js" crossorigin="anonymous"></script>
<html>
<head>
    <title>회원 가입</title>
</head>
<body>
<section>
    <div class="container">
        <h1>회원 가입</h1>
        <form>
            <div class="input">
                <input type="text" id="user" placeholder="아이디" required><br>
                <input type="password" class="pw" id="pw1" onfocusout="pwLength()" placeholder="비밀번호는 8~15자리로 입력해 주세요." required>
                <i id="key1" class="fa-sharp fa-solid fa-key" style="color: #919191"></i><br>
                <input type="password" class="pw" id="pw2" onfocusout="pwConfirm()" placeholder="비밀번호 확인" required>
                <i id="key2" class="fa-sharp fa-solid fa-key"></i><br>
                <input type="text" id="name" placeholder="이름" required><br>
                <input type="text" id="email" placeholder="이메일" required><br>
            </div>
            <button type="submit" id="button" onclick="join()">회원가입</button>
        </form>
    </div>

</section>
</body>
</html>
