<%--
  Created by IntelliJ IDEA.
  User: EZEN
  Date: 2022-11-21
  Time: 오후 5:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>footer</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="assets/img/favicon.png" rel="icon">
    <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="assets/css/style.css" rel="stylesheet">
    <!-- talk css -->
    <link href="css/open.css" rel="stylesheet">
</head>
<body>
    <!-- chatting -->
    <button type="button" class="btn btn-primary rounded-pill chatting-button" data-popup-open="example">
        <i class="fa-regular fa-comments"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger account-message">
        <span class="visually-hidden">unread messages</span>
        </span>
    </button><!-- 팝업 열기 버튼 입니다. -->
        <%--              <div class="popup-inner" class="onmy">--%>
    <div class="popup-contents">
        <c:import url="/talk"/>
    </div>
        <%--              </div>--%>
    <!-- chatting -->
<footer id="footer">
    <div class="container">
        <h3>삼행성</h3>
        <button type="button" class="btn text-bg-light p-3" onclick="location.href='/ourTeam'">삼행성 멤버소개</button>
        <p>서보경, 강문성, 이윤정</p>
        <div class="copyright">
            &copy; Copyright MeFamily All Rights Reserved <br>Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>

    </div>
</footer><!-- End Footer -->
<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
<script src="/script/forbiddenCheck.js" charset="utf-8"></script>
<script href="script/open.js" charset="utf-8"></script>
</body>
</html>
