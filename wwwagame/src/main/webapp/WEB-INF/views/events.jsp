<%--
  Created by IntelliJ IDEA.
  User: yousd
  Date: 22-11-19
  Time: 오후 9:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
  <link rel="shortcut icon" href="/img/team/three.png">
  <meta property="og:title" content="wwwagame">
  <meta property="og:description" content="삼행성">
  <meta property="og:image" content="/img/team/three.png">
  <title>Events - MeFamily Bootstrap Template</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

<%--  <!-- Vendor CSS Files -->--%>
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  <link rel="stylesheet" href="css/black_jack.css">
<%--  <!-- Template Main CSS File -->--%>
  <link href="assets/css/style.css" rel="stylesheet">
  <link href="css/open.css" rel="stylesheet">
  <title>Wwwagame</title>
</head>
<body>
  <!-- ======= Header ======= -->
  <c:import url="header.jsp"/>


<%--  <main id="main">--%>

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs" style="margin-top: -3%">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>Events</h2>
          <ol>
            <li><a href="index.html">Home</a></li>
            <li>Events</li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs -->

    <!-- ======= Event List Section ======= -->
    <section id="event-list" class="event-list">
      <div class="container">
        <div class="row">
          <div class="col-md-8 d-flex align-items-stretch b">
            <div class="game_board">
              <div class="dealer_board" id="dealer_board">
                <div class="d_card1" id="d_card1"></div>
                <div class="d_card2" id="d_card2"></div>
                <div class="d_card3" id="d_card3"></div>
                <div class="d_card4" id="d_card4"></div>
                <div class="d_card5" id="d_card5"></div>
                <div class="d_card6" id="d_card6"></div>
                <div class="d_point"></div>
                <%--            <div class="d_card7" id="d_card7"></div>--%>
                <%--            <div class="d_card8" id="d_card8"></div>--%>
              </div>
              <div class="card_set_area" id="card_set_area">
                <div class="card_set" id="card_set" style="background-image: url(img/card/card_b.png)"></div>
              </div>


              <div class="black_jack_msg_d">
                <div class="opened_cards"></div>
              </div>
              <div class="black_jack_msg_p"></div>

              <div class="coin_betting" id="coin_betting">
                <div class="coin_minus" onclick="minus_coin()"
                     style="background-image: url(img/black_jack/minus.png); cursor: pointer;"></div>
                <div class="wrap">
                  <div class="coin_show" style="background-image: url(img/chip1.png);">100</div>
                  <div class="coin_back"></div>
                </div>

                <input type="hidden" class="coin" value=100>
                <div class="coin_plus" onclick="plus_coin()"
                     style="background-image: url(img/black_jack/plus.png); cursor: pointer;"></div>
              </div>
              <div class="player_board" id="player_board">
                <div class="p_card1" id="p_card1"></div>
                <div class="p_card2" id="p_card2"></div>
                <div class="p_card3" id="p_card3"></div>
                <div class="p_card4" id="p_card4"></div>
                <div class="p_card5" id="p_card5"></div>
                <div class="p_card6" id="p_card6"></div>
                <div class="p_point"></div>
                <%--            <div class="p_card7" id="p_card7"></div>--%>
                <%--            <div class="p_card8" id="p_card8"></div>--%>
              </div>
              <div class="coin_zone" id="coin_zone">
                <div class="coin_area" onclick="betting_coin()" style="cursor: pointer">
                  <div class="get_coin"></div>
                  <div class="fixed_coin">배팅</div>
                </div>
              </div>
              <div class="button_area" id="button_area">
                <div id="deal"></div>
                <%-- class="b1" --%>
                <div id="betting_clear"></div>
                <div id="stand"></div>
                <div id="hit"></div>
                <div id="double"></div>
                <div id="split"></div>
                <div id="new_betting"></div>
                <div id="re_betting"></div>
              </div>
              <div class="coin_block">
                <div class="show_user_coin">20000</div>
                <input type="hidden" class="user_coin" value=20000>
              </div>
              <%--        <button class="betting_board" ></button>--%>
            </div>
          </div>

<%--          <div class="col-md-4 d-flex align-items-stretch b">--%>
<%--             <c:import url="/talk"/>--%>
<%--          </div>--%>
    </section><!-- End Event List Section -->

  </main><!-- End #main -->

<%--      <div class="onmy">--%>
<%--        <button type="button" class="btn btn-primary position-relative rounded-pill onmy" data-popup-open="example">--%>
<%--          <i class="fa-regular fa-comments"></i>--%>
<%--          <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">--%>
<%--          <span class="visually-hidden">New alerts</span>--%>
<%--        </span>--%>
<%--        </button><!-- 팝업 열기 버튼 입니다. -->--%>
<%--        <div class="popup" data-popup="example" class="onmy">  <!-- 표출되는 팝업 입니다. -->--%>
<%--  &lt;%&ndash;              <div class="popup-inner" class="onmy">&ndash;%&gt;--%>
<%--            <div class="popup-contents" class="onmy">--%>
<%--              <a class="popup-close" data-popup-close="example" href="#" >X</a> <!-- 팝업 닫기 버튼입니다 -->--%>
<%--              <c:import url="/talk"/>--%>
<%--            </div>--%>
<%--  &lt;%&ndash;              </div>&ndash;%&gt;--%>
<%--        </div>--%>
<%--      </div>--%>
  <!-- ======= Footer ======= -->
  <c:import url="footer.jsp"/>

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>

  <!-- game js -->
  <script src="script/black_jack.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>
  <script src="/script/open.js"></script>
</body>
</html>
