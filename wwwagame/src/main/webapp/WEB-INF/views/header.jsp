<%--
  Created by IntelliJ IDEA.
  User: Bo
  Date: 2022-11-14
  Time: 오후 1:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <%-- swf 사용할 수 있게 해주는 CDN --%>
    <script src="https://unpkg.com/@ruffle-rs/ruffle"></script>
    <script src="https://code.jquery.com/jquery-2.2.4.js"></script>

    <meta content="" name="description">
    <meta content="" name="keywords">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <!-- Favicons -->
    <link rel="shortcut icon" href="/img/team/three.png">
    <meta property="og:title" content="wwwagame">
    <meta property="og:description" content="삼행성">
    <meta property="og:image" content="/img/team/three.png">

    <script src="https://kit.fontawesome.com/fa861a7902.js" crossorigin="anonymous"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CRaleway:300,300i,400,400i,500,500i,600,600i,700,700i%7CPoppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <!-- Vendor CSS Files -->
    <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
    <!-- sweet -->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <!-- Template Main CSS File -->
    <link href="/assets/css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/userJoin.css">
    <title>Wwwagame</title>
</head>
<body>
<!-- ======= Header ======= -->
<header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-between">

        <h1 class="logo" style="margin: 0 0 0 42%;"><a href="/index">Wwwa Game</a></h1>
        <nav id="navbar" class="navbar">
            <ul>
                <c:choose>
                    <c:when test="${sessionScope.log == null}">
                        <li>
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#index_join">
                                회원가입
                            </button>
                        </li>
                        <li><!-- Button trigger modal -->
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#index_login">
                                로그인
                            </button>
                        </li>
                    </c:when>
                    <c:otherwise>
                        <li>
                            <button type="button" class="btn" onclick="location.href='/attend'">
                                출석체크
                            </button>
                        </li>
                        <li><!-- Button trigger modal -->
                            <button type="button" class="btn" onclick="location.href='/content'">
                                내 정보
                            </button>
                        </li>
                        <li><!-- Button trigger modal -->
                            <button type="button" class="btn" onclick="logout()">
                                로그아웃
                            </button>
                        </li>
                    </c:otherwise>
                </c:choose>

            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
        </nav><!-- .navbar -->

    </div>
</header><!-- End Header -->
<!--modal-->
<!-- join -->
<div class="modal fade" id="index_join" tabindex="-1" aria-labelledby="index_join_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="index_join_label">WwwaGame Join</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="wrap_outer" method="POST" action="/user/join">
                    <input type="hidden" name="command" value="Join">
                    <div class="wrap_out">
                        <div class="wrap_in">
                            <!--아이디 , 비밀번호 비밀번호 확인!-->
                            <!-- 비밀번호 -->
                            <div class="ininfo">
                                <h3 class="info_title">아이디</h3>
                                <span class="info_box">
                            <input class="requiredValue" type="text" id="join_id" name="id" maxlength="20">
                            <span class="info_box_icon"><i class="fa-regular fa-square-check idicon"></i></span>
                        </span>
                                <span class="errorID errorCheck"></span>
                            </div>
                            <!-- 비밀번호 -->
                            <div class="ininfo">
                                <h3 class="info_title">비밀번호</h3>
                                <span class="info_box">
                            <input class="info_box_input requiredValue" type="password" id="join_pw1" name="password"
                                   maxlength="30">
                            <span class="info_box_icon"><i class="fa-solid fa-key pwicon1"></i></span>
                        </span>
                                <span class="errorPw1 errorCheck"></span>
                            </div>
                            <div class="ininfo">
                                <h3 class="info_title">비밀번호 확인</h3>
                                <span class="info_box">
                            <input class="info_box_input requiredValue" type="password" id="join_pw2"
                                   name="passwordCheck" maxlength="30"> <!--readonly-->
                            <span class="info_box_icon"><i class="fa-solid fa-key pwicon2"></i></span>
                        </span>
                                <span class="errorPw2 errorCheck"></span>
                            </div>
                            <!--이름-->
                            <div class="ininfo">
                                <div class="name_button">
                                    <h3 class="info_title">닉네임</h3>
                                </div>
                                <span class="info_box">
                                        <input class="info_box_input requiredValue" type="text" id="join_nick"
                                               name="nick" placeholder="닉네임 2~10자 내외" maxlength="10">
                                        <span class="info_box_icon"><i class="fa-regular fa-square-check nic_nick"></i></span>
                                    </span>
                                <span class="errorNick errorCheck"></span>
                            </div>
                            <!-- 이름 -->
                            <div class="ininfo">
                                <div class="name_button">
                                    <h3 class="info_title">이름</h3>
                                </div>
                                <span class="info_box">
                                        <input class="info_box_input requiredValue" type="text" id="join_name"
                                               name="name" placeholder="이름 2~30자 내외" maxlength="30">
                                        <span class="info_box_icon"><i class="fa-regular fa-square-check nic_name"></i></span>
                                    </span>
                                <span class="errorName errorCheck"></span>
                            </div>
                            <!--주소-->
                            <!--전화번호-->
                            <div class="ininfo">
                                <h3 class="info_title">전화번호</h3>
                                <span class="info_box">
                                        <input class="info_box_input requiredValue" type="text" id="join_phone"
                                               name="phone" placeholder="000-0000-0000" maxlength="13">
                                        <span class="info_box_icon iconPhone"><i
                                                class="fa-regular fa-square-check ch_phone"></i></span>
                                    </span>
                            </div>
                            <span class="errorNumber errorCheck"></span>
                            <!-- 회원가입 -->
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary join_submit">JOIN</button>
            </div>
        </div>
    </div>
</div>

<!-- login -->
<div class="modal fade" id="index_login" tabindex="-1" aria-labelledby="index_login_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="index_login_label">LOGIN</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form method="post">
                    <div class="ininfo">
                        <h3 class="info_title">아이디</h3>
                        <span class="info_box">
                            <input type="text" id="id" class="login_form" maxlength="20">
                        </span>
                    </div>
                    <!-- 비밀번호 -->
                    <div class="ininfo">
                        <h3 class="info_title">비밀번호</h3>
                        <span class="info_box">
                            <input class="info_box_input login_form" type="password" id="pw" maxlength="30">
                        </span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onclick="login(1)" class="btn btn-primary">LOGIN</button>
            </div>
        </div>
    </div>
</div>


<!-- Vendor JS Files -->
<script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
<script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
<script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
<script src="/assets/vendor/php-email-form/validate.js"></script>

<%--회원 가입--%>
<script src="/script/join.js" charset="utf-8"></script>
<script src="/script/forbiddenCheck.js" charset="utf-8"></script>

<%--로그인--%>
<script src="/script/login.js"></script>

<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</body>
</html>
