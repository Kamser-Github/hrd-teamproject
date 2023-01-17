<%--
  Created by IntelliJ IDEA.
  User: Bo
  Date: 2022-11-14
  Time: 오전 10:41
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
    <title>Wwwagame</title>
</head>
<body>
<!-- ======= Header ======= -->
<c:import url="header.jsp"/>
<!-- ======= Hero Section ======= -->
<section id="hero">
    <div id="heroCarousel" data-bs-interval="5000" class="carousel slide carousel-fade" data-bs-ride="carousel">

<%--            <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>--%>

            <div class="carousel-inner" role="listbox">

                <!-- Slide 1 -->
                <div class="carousel-item active" style="background-image: url(/assets/img/slide/slide-1.jpg)">
                </div>

            </div>

            <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
            </a>

            <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
            </a>

        </div>
    </section><!-- End Hero -->

    <main id="main">

        <!-- ======= 블랙잭 ======= -->
        <section id="about1" class="about">
            <div class="container">

                <div class="section-title">
                    <h2>BlackJack</h2>
                    <p>딜러와의 1:1 대결로 블랙잭을 즐겨보세요.</p>
                </div>

                <div class="row content">
                    <div class="col-lg-6">
                        <img src="img/black_jack/blackJack_title.png" class="img-fluid" alt="">
                    </div>
                    <div class="col-lg-6 pt-4 pt-lg-0">
                        <p>
                            블랙잭 설명
                        </p>
                        <ul>
                            <li><i class="ri-check-double-line"></i> 21 이하의 가장 큰 수를 만들어보세요.</li>
                            <li><i class="ri-check-double-line"></i> 첫 두장의 합의 21이면 블랙잭이 선언됩니다.</li>
                        </ul>
                        <p>
                            개발: 이윤정
                        </p>
                        <a href="black_jack" class="btn-learn-more">Play Go</a>
                    </div>
                </div>

            </div>
        </section><!-- 블랙잭 -->
        <!-- ======= 바카라 ======= -->
        <section id="about2" class="about">
            <div class="container">

                <div class="section-title">
                    <h2>Baccarat</h2>
                    <p>뱅커(banker) 혹은 플레이어(player) 둘 중 한 쪽을 선택해 9 이하의 높은 점수로 대결하는 게임입니다. </p>
                </div>

                <div class="row content">
                    <div class="col-lg-6">
                        <a href="baccarat"> <img src="img/title.jpg" class="img-fluid" alt=""></a>
                    </div>
                    <div class="col-lg-6 pt-4 pt-lg-0">
                        <p>
                            바카라 설명
                        </p>
                        <ul>
                            <li><i class="ri-check-double-line"></i> 홀짝과 비슷한 게임으로 player나 banker를 선택하면 됩니다.</li>
                            <li><i class="ri-check-double-line"></i> 무승부가 나올 것 같은 경우에는 tie를 선택하세요.</li>
                        </ul>
                        <p>
                            개발: 서보경
                        </p>
                        <a href="baccarat" class="btn-learn-more">Play Go</a>
                    </div>
                </div>

            </div>
        </section><!-- 바카라 -->

        <section id="recent-photos" class="recent-photos">
            <div class="container">

                <div class="section-title">
                    <h2>Mini Game</h2>
                    <p>미니게임 설명</p>
                </div>

                <div class="recent-photos-slider ">
                    <div class="swiper-wrapper align-items-center" style="height: 35%">
                        <div class="swiper-slide"><a href="/game/1to50" class="glightbox"><img src="/img/1to50.jpg" class="img-fluid" style="max-width: 81%;" alt=""></a></div>
                        <div class="swiper-slide"><a href="/game/omok" class="glightbox"><img src="/img/omok.jpg" class="img-fluid" style="max-width: 81%;" alt=""></a></div>
                        <div class="swiper-slide"><a href="/game/tictactoe" class="glightbox"><img src="/img/tictactoe.jpg" class="img-fluid" style="max-width: 81%;" alt=""></a></div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>

            </div>
        </section><!-- End Recent Photos Section -->

    </main><!-- End #main -->

<!-- ======= Footer ======= -->
<c:import url="footer.jsp"/>
<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Template Main JS File -->
<%--<script type="module" src="script/join.js"></script>--%>
<script src="assets/js/main.js"></script>
<script src="script/open.js"></script>
<script src="sweetalert2.all.min.js"></script>
</body>
</html>
