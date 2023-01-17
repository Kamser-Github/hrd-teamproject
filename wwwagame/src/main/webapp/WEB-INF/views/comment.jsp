<%--
  Created by IntelliJ IDEA.
  User: Bo
  Date: 2022-11-21
  Time: 오후 5:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <script scr="/css/open.css" rel="stylesheet"></script>
    <script src="https://code.jquery.com/jquery-2.2.4.js"></script>
    <script src="https://kit.fontawesome.com/abd4943d11.js" crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>댓글</title>
</head>
<body>
<input type="hidden" id="gameName" value="${requestScope.gameName}">
<input type="hidden" id="no" value="${sessionScope.log.no}">
<div>
<%--    <p>${requestScope.gameName}</p>--%>
<%--    <c:choose>--%>
<%--        <c:when test="${sessionScope.log != null}">--%>
<%--            <input type="hidden" id="idName" value="${sessionScope.log.id}" readonly>--%>
<%--            <input type="text" id="nick" value="${sessionScope.log.nick}" readonly>--%>
<%--            <input type="password" id="password" value="${sessionScope.log.password}" readonly><br>--%>
<%--        </c:when>--%>
<%--        <c:otherwise>--%>
<%--            <input type="hidden" id="idName" value="guest">--%>
<%--            <input type="text" class="checkInput" id="nick" placeholder="닉네임">--%>
<%--            <input type="password" class="checkInput" id="password" placeholder="비밀번호"><br>--%>
<%--        </c:otherwise>--%>
<%--    </c:choose>--%>

<%--    <input type="text" class="checkInput" id="comment" required placeholder="여러분의 소중한 댓글을 입력해주세요">--%>
<%--    <button id="target_btn" onclick="commentReg()">등록</button>--%>
    <!-- 댓글 추가 -->
    <div class="container mt-5">
        <div class="card col-lg-8 mb-2 mx-auto">
            <div class="card-header bg-light">
                <i class="fa-solid fa-comment-dots fa-1x"></i> REPLY
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="form mb-2 d-flex gap-3 align-middle">
                            <c:choose>
                                <c:when test="${sessionScope.log != null}">
                                        <input type="hidden" id="idName" value="${sessionScope.log.id}" readonly>
                                        <label for="nick" class="d-flex align-items-center"><i class="fa-solid fa-user fa-2x"></i></label>
                                        <input type="text" name="nick" id="nick" class="form-control ml-2 w-25 checkInput" value="${sessionScope.log.nick}" readonly>
                                        <label for="password" class="d-flex align-items-center"><i class="fa-solid fa-unlock-keyhole fa-2x"></i></label>
                                        <input type="password" name="password" class="form-control ml-2 w-25 checkInput" value="${sessionScope.log.password}" id="password" readonly>
                                </c:when>
                                <c:otherwise>
                                        <input type="hidden" id="idName" value="guest">
                                        <label for="nick" class="d-flex align-items-center"><i class="fa-solid fa-user fa-2x"></i></label>
                                        <input type="text" name="nick" class="form-control ml-2 w-25 checkInput" placeholder="닉네임" id="nick">
                                        <label for="password" class="d-flex align-items-center"><i class="fa-solid fa-unlock-keyhole fa-2x"></i></label>
                                        <input type="password" name="password" class="form-control ml-2 w-25 checkInput" placeholder="비밀번호" id="password">
                                </c:otherwise>
                            </c:choose>
                            <button type="button" class="btn btn-light ml-2 w-25" id="target_btn" onclick="commentReg()"><i class="fa-regular fa-paper-plane fa-2x"></i></button>
                        </div>
                        <textarea class="form-control checkInput" id="comment" style="resize: none;" rows="3" required placeholder="여러분의 소중한 댓글을 입력해주세요"></textarea>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- end: 댓글 추가 -->
    <!-- 코멘트 -->
    <div class="container commentList">
<%--        button_paging--%>
    </div>
    <div class="container d-flex">
<%--        <div class="btn-toolbar mx-auto" role="toolbar" aria-label="Toolbar with button groups">--%>
<%--            <div class="btn-group me-2 button_paging" role="group" aria-label="First group">--%>
<%--            </div>--%>
<%--        </div>--%>
        <div class="btn-group button_paging mx-auto" role="group" aria-label="Basic radio toggle button group">
        </div>
    </div>
</div>
<script src="script/forbiddenCheck.js"></script>
<script src="script/comment.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="/script/open.js"></script>
</body>
</html>
