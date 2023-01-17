<%--
  Created by IntelliJ IDEA.
  User: yousd
  Date: 22-11-19
  Time: 오후 9:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script src="https://code.jquery.com/jquery-2.2.4.js"></script>

<html>
<head>
    <link rel="shortcut icon" href="/img/team/three.png">
    <meta property="og:title" content="wwwagame">
    <meta property="og:description" content="삼행성">
    <meta property="og:image" content="/img/team/three.png">

    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet">
    <title>Wwwagame</title>
    <!-- Vendor CSS Files -->
    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
    <!-- Template Main CSS File -->
    <link href="css/attend.css" rel="stylesheet">
    <script scr="/css/open.css" rel="stylesheet"></script>

    <!-- 버튼 CSS-->
</head>
<body>
<c:set var="log_id" value="${sessionScope.log.id}" scope="request"/>
<c:set var="log_no" value="${sessionScope.log.no}" scope="request"/>
<c:set var="log_nick" value="${sessionScope.log.nick}" scope="request"/>
<input type="hidden" id="log_id" value="${sessionScope.log.id}">
<input type="hidden" id="log_no" value="${sessionScope.log.no}">
<input type="hidden" id="log_nick" value="${sessionScope.log.nick}">

<c:set var="now" value="<%=new java.util.Date()%>"/>
<c:set var="thisMonth"><fmt:formatDate value="${now}" pattern="MM"/></c:set>
<c:set var="now" value="<%=new java.util.Date()%>"/>
<c:set var="thisDay"><fmt:formatDate value="${now}" pattern="dd"/></c:set>
<!-- ======= Header ======= -->
<c:import url="header.jsp"/>

<main id="main">

    <!-- ======= Breadcrumbs ======= -->
    <section class="section1">
        <div class="container" style="margin-left: 20vw;">
            <div class="d-flex justify-content-between align-items-center">
                <div style="font-size: 2.2em">출석체크<img src="img/attend_check.png" width="40" height="40"></div>
            </div>
        </div>
    </section><!-- End Breadcrumbs -->


        <div class="btn-wrap1 container">
            <div class="btn-wrap2 row justify-content-center">
                <div class="month" style="margin-left: 11vw;"></div>
                <div class="btn-container col-10">
                    <c:if test="${thisMonth eq '02'}">
                        <c:forEach var="i" begin="1" end="28">
                            <c:choose>
                            <c:when test="${i eq thisDay}">
                                <button type="button" class="dateBtn" id="btn${i}" onclick="goToDate(${i})" value="${i}" style="background-color: rgba(252,100,100,0.63)">
                                    <c:out value="${i}"/></button>
                            </c:when>
                            <c:otherwise>
                                <button type="button" class="dateBtn" id="btn${i}" onclick="goToDate(${i})" value="${i}">
                                    <c:out value="${i}"/></button>
                            </c:otherwise>
                            </c:choose>
                        </c:forEach>
                    </c:if>
                    <c:if test="${thisMonth eq '01' || thisMonth eq '03' || thisMonth eq '05' || thisMonth eq '07' || thisMonth eq '08' || thisMonth eq '10' || thisMonth eq '12'}">
                        <c:forEach var="i" begin="1" end="31">
                            <c:choose>
                                <c:when test="${i eq thisDay}">
                                    <button type="button" class="dateBtn" id="btn${i}" onclick="goToDate(${i})" value="${i}" style="background-color: rgba(252,100,100,0.63)">
                                        <c:out value="${i}"/></button>
                                </c:when>
                                <c:otherwise>
                                    <button type="button" class="dateBtn" id="btn${i}" onclick="goToDate(${i})" value="${i}">
                                        <c:out value="${i}"/></button>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                    </c:if>
                    <c:if test="${thisMonth eq '04' || thisMonth eq '06' || thisMonth eq '09' || thisMonth eq '11'}">
                        <c:forEach var="i" begin="1" end="30">
                            <c:choose>
                                <c:when test="${i eq thisDay}">
                                    <button type="button" class="dateBtn" id="btn${i}" onclick="goToDate(${i})" value="${i}" style="background-color: rgba(252,100,100,0.63)">
                                        <c:out value="${i}"/></button>
                                </c:when>
                                <c:otherwise>
                                    <button type="button" class="dateBtn" id="btn${i}" onclick="goToDate(${i})" value="${i}">
                                        <c:out value="${i}"/></button>
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                    </c:if>
                </div>

            </div>
        </div>


        <div class="container attending">
            <div class="row ml-2 justify-content-center">
                <div class="col-10 card">
                    <div class="d-flex align-items-center gap-3 my-1 card-header">
                        <i class="fa-solid fa-spa fa-2x"></i>
                        <input class="text-bg-light" type="text" name="user_id" id="user_id" value="${log_nick}님 환영합니다" readonly>
                    </div>
                    <div class="d-flex gap-3">
                        <input class="form-control w-90 text-bg-light" id="comment" name="comment" list="datalistOptions" id="exampleDataList" placeholder="출석체크 메세지를 입력해주세요" required>
                        <i class="fa-solid fa-stamp fa-2x attendButton"></i>
                        <datalist id="datalistOptions">
                            <option value="출석체크 합니다.">
                            <option value="오늘 출석체크 합니다.">
                        </datalist>
                    </div>
                </div>
            </div>
        </div>
        <div class="attendList">
            <div class="container">
                <div class="row  justify-content-center">
                    <div class="col-10">
                        <table class="table table-hover appendTable">
                            <thead class="thead">
                            </thead>
                            <tbody class="tbody">
                            </tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
</main><!-- End #main -->


<!-- ======= Footer ======= -->
<c:import url="footer.jsp"/>

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
        class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
<script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
<script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
<script src="assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="script/attend.js"></script>
<script src="script/open.js"></script>
<script src="assets/js/main.js"></script>
<script src="sweetalert2.all.min.js"></script>

<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        crossorigin="anonymous"></script>
</body>
</html>
