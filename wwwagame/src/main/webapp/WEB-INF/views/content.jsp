<%--
  Created by IntelliJ IDEA.
  User: yousd
  Date: 22-11-19
  Time: 오후 9:55
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

    <title>my page</title>
    <meta content="" name="description">
    <meta content="" name="keywords">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet">
    <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="/assets/css/style.css" rel="stylesheet">
    <!-- update CSS File -->
    <link href="/css/userUpdate.css" rel="stylesheet">
    <!-- icon -->
    <script src="https://kit.fontawesome.com/abd4943d11.js" crossorigin="anonymous"></script>
    <!-- jquery -->
    <!-- sweet -->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link href="/css/open.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/talk.css">
    <link rel="stylesheet" href="/css/myComment.css">
</head>
<body>
<input type="hidden" id="log_nick" value="${sessionScope.log.nick}">
<input type="hidden" id="log_id" value="${sessionScope.log.id}">
<input type="hidden" id="log_bj_point" value="${sessionScope.log.bj_point}">
<input type="hidden" id="log_br_point" value="${sessionScope.log.br_point}">
<!-- ======= Header ======= -->
<header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-between">
        <h1 class="logo"><a href="/index">Wwwa Game</a></h1>
        <nav id="navbar" class="navbar">
            <ul>
                <li>
                    <button type="button" class="btn" onclick="location.href='/attend'">
                        출석체크
                    </button>
                </li>
                <i class="bi bi-list mobile-nav-toggle"></i>
        </nav><!-- .navbar -->

    </div>
</header><!-- End Header -->
<main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
        <div class="container">

            <div class="d-flex justify-content-between align-items-center">
                <h2>My Page</h2>
                <ol>
                    <%----%>
                    <li>
                        <input type="hidden" id="user_no" value="${sessionScope.log.no}"/>
                        <button type="button" class="btn btn-light" data-bs-toggle="modal"
                                data-bs-target="#index_Update">
                            정보 수정
                        </button>
                    </li>
                    <li>
                        <button type="button" class="btn btn-light" onclick="myCommentRenew()" data-bs-toggle="modal"
                                data-bs-target="#my_comment">
                            내가 쓴 댓글
                        </button>
                    </li>
                    <li>
                        <button type="button" class="btn btn-light" data-bs-toggle="modal"
                                data-bs-target="#delete_user">
                            회원 탈퇴
                        </button>
                    </li>
                </ol>
            </div>

        </div>
    </section><!-- End Breadcrumbs -->

    <!-- ======= Contact Us Section ======= -->
    <section id="contact-us" class="contact-us">
        <div class="container py-3">
            <header>
                <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h1 class="display-4 fw-normal">My Points</h1>
                    <p class="fs-5 text-muted">모든 게임의 현재 포인트를 알수 있습니다.</p>
                </div>
            </header>

            <main>
                <div class="row row-cols-1 row-cols-md-3 mb-12 text-center">
                    <div class="col">
                        <div class="card mb-6 rounded-3 shadow-sm">
                            <div class="card-header py-3">
                                <h4 class="my-0 fw-normal">BLACK JACK</h4>
                            </div>
                            <img src="/assets/img/slide/slide-2.png" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title"><i class="fa-solid fa-medal"></i><small
                                        class="text-muted fw-light"><c:out
                                        value="${sessionScope.log.bj_point}"/>/point</small></h1>
                                <a href="black_jack" class="btn-learn-more">
                                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">시작하기</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card mb-6 rounded-3 shadow-sm">
                            <div class="card-header py-3">
                                <h4 class="my-0 fw-normal">BACCARAT</h4>
                            </div>
                            <img src="/assets/img/slide/slide-3.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title"><i class="fa-solid fa-medal"></i><small
                                        class="text-muted fw-light"><c:out
                                        value="${sessionScope.log.br_point}"/>/point</small></h1>
                                <a href="baccarat" class="btn-learn-more">
                                    <button type="button" class="w-100 btn btn-lg btn-outline-primary">시작하기</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </section><!-- End Contact Us Section -->

</main><!-- End #main -->
<%--<!-- ======= Footer ======= -->--%>
<%--<footer id="footer">--%>
<%--    <div class="container">--%>
<%--        <h3>Wwwa game</h3>--%>
<%--        <div class="credits">--%>
<%--            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>--%>
<%--        </div>--%>
<%--    </div>--%>
<%--</footer><!-- End Footer -->--%>
<!-- ======= Footer ======= -->
<c:import url="footer.jsp"/>
<script src="script/open.js"></script>
<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
        class="bi bi-arrow-up-short"></i></a>

<!-- Footer-->

<!-- Modal infoUpdate -->
<!-- join -->
<div class="modal fade" id="index_update" tabindex="-1" aria-labelledby="index_join_label" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="index_join_label">개인정보 수정</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="wrap_outer">
                    <input type="hidden" name="no" value="${sessionScope.log.no}" class="update_no">
                    <div class="wrap_out">
                        <div class="wrap_in">
                            <!-- 아이디 -->
                            <div class="ininfo">
                                <h3 class="info_title">아이디</h3>
                                <span class="info_box">
                            <input class="requiredValue" type="text" id="join_id" name="id" maxlength="20"
                                   value="${sessionScope.log.id}" readonly>
                            </span>
                                <span class="errorID errorCheck"></span>
                            </div>
                            <!-- 비밀번호 -->
                            <div class="ininfo">
                                <h3 class="info_title">현재 비밀번호</h3>
                                <span class="info_box">
                                <input class="info_box_input requiredValue" type="password" id="update_pw"
                                       name="password_old"
                                       maxlength="30"/>
                                </span>
                                <span class="error_now errorCheck"></span>
                            </div>

                            <div class="ininfo">
                                <h3 class="info_title">변경 비밀번호</h3>
                                <span class="info_box">
                            <input class="info_box_input requiredValue" type="password" id="join_pw1" name="password"
                                   maxlength="30">
                            <span class="info_box_icon"><i class="fa-solid fa-key pwicon1"></i></span>
                                </span>
                                <span class="errorPw1 errorCheck"></span>
                            </div>
                            <div class="ininfo">
                                <h3 class="info_title">변경 비밀번호 확인</h3>
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
                                               name="nick" placeholder="닉네임 2~10자 내외" maxlength="10"
                                               value="${sessionScope.log.nick}">
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
                                               name="name" placeholder="이름 2~30자 내외" maxlength="30"
                                               value="${sessionScope.log.name}">
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
                                               name="phone" maxlength="13"
                                               value="${sessionScope.log.phone}">
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
                <button type="button" class="btn btn-primary join_submit">정보 수정</button>
            </div>
        </div>
    </div>
</div>

<!-- my comment -->
<div class="modal fade" id="my_comment" tabindex="-1" aria-labelledby="my_comments" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="my_comments">내가 쓴 댓글</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <table class="comment_table">
                <thead class="comment_title">
                <tr>
                    <td>게임 이름</td>
                    <td>내용</td>
                    <td>작성 날짜</td>
                    <td>좋아요 개수</td>
                    <td></td>
                </tr>
                </thead>
                <tbody class="comment_body">

                </tbody>
            </table>
            <div class="button_paging" style="text-align: center">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- end:  my comment-->

<!-- delete user : modal -->
<div class="modal fade" id="delete_user" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="exampleModalLabel" style="margin-left:auto;">회원 탈퇴</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container row" style="float: none; margin:0 auto;">
                    <div class="col-md-12 content-middle-start" style="float: none; margin:0 auto;">
                        <c:import url="deleteText.jsp"/>
                    </div>
                </div>
                <div class="col-md-11 content-middle-end " style="float: none; margin:0 auto;">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="delete-cancle" data-bs-dismiss="modal">Close
                    </button>
                    <div class="delete-user">
                        <button type="button" class="btn btn-primary" id="agree_ok"> 동의합니다</button>
                        <button type="button" class="btn btn-danger d-none" id="delete-user">탈퇴하기</button>
                    </div>
                    <!-- agree modal -->
                    <!-- end: agree modal -->
                </div>
            </div>
        </div>
    </div>

    <!-- end: delete user-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <!-- Vendor JS Files -->
    <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
    <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
    <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
    <script src="/assets/vendor/php-email-form/validate.js"></script>
    <!-- sweet -->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Template Main JS File -->
    <script src="script/comment.js"></script>
    <script src="/assets/js/main.js"></script>
    <script src="script/forbiddenCheck.js"></script>
    <script src="/script/user_info_Update.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="script/forbiddenCheck"></script>
</body>
</html>
