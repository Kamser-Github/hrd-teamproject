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
<main id="main">

  <!-- ======= Story Intro Section ======= -->
  <section id="story-intro" class="story-intro" style="margin-top: 50px;">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 order-1 order-lg-2">
          <img src="img/team/three.png" class="img-fluid" alt="">
        </div>
        <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
          <h3>Wwwa game 팀 소개</h3>
          <p class="fst-italic">
            태양을 중심으로 공전하는 지구처럼 코딩을 중심으로 공전하는 3개의 행성이 되겠습니다
          </p>
          <ul>
            <li><i class="bi bi-check-circled"></i> 여러 게임을 플레이하며,댓글을 달거나 실시간 채팅이 가능한,<br>커뮤니케이션 게임 사이트</li>
            <li><i class="bi bi-check-circled"></i> 댓글을 달거나 실시간 채팅이 가능한,</li>
            <li><i class="bi bi-check-circled"></i> 실시간 채팅이 가능한,커뮤니케이션 게임 사이트</li>
          </ul>
        </div>
      </div>
    </div>
  </section><!-- End Story Intro Section -->
  <!-- ======= Members Section ======= -->
  <section id="members" class="members">
    <div class="container">

      <div class="row">

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
          <div class="member">
            <div class="member-img">
              <img src="img/team/su.png" class="img-fluid" alt="">
              <div class="social">
                <a href="https://github.com/dodu232"><i class="fa-brands fa-github"></i></a>
                <a href="mailto:dodu7510@gmail.com"><i class="fa-solid fa-at"></i></a>
              </div>
            </div>
            <div class="member-info">
              <h4>서보경  <br> dodu7510@gmail.com</h4>
              <span>팀장</span>
              <p>
                바카라 구현<br>
                로그인 계정의 바카라 머니 연동 기능 구현<br>
                댓글 읽기, 쓰기, 삭제 기능 구현 <br>
                좋아요, 좋아요 취소 기능 구현<br>
                개인정보 수정 시 비밀번호 수정을 선택 사항으로 변경<br>
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
          <div class="member">
            <div class="member-img">
              <img src="img/team/Lee.jpg" class="img-fluid" alt="">
              <div class="social">
                <a href="https://github.com/haansaa"><i class="fa-brands fa-github"></i></a>
                <a href="mailto:hhss762@naver.com"><i class="fa-solid fa-at"></i></a>
              </div>
            </div>
            <div class="member-info">
              <h4>이윤정</h4>
              <span>서기</span>
              <p>
                hhss762@naver.com<br>
                블랙잭 기능 및 프론트 개발,<br>
                출석체크 전체 기능 및 프론트 도안 개발,<br>
                세션에 게임 포인트 연동하는 기능 개발,<br>
                개인정보 수정 시 비밀번호 수정을 선택 사항으로 변경<br>
                금칙어 슈도코드 작성<br>
              </p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
          <div class="member">
            <div class="member-img">
              <img src="img/team/Kang.png" class="img-fluid" alt="">
              <div class="social">
                <a href="https://github.com/Kamser-Github"><i class="fa-brands fa-github"></i></a>
                <a href="mailto:yousd179@naver.com"><i class="fa-solid fa-at"></i></a>
              </div>
            </div>
            <div class="member-info">
              <h4>강문성</h4>
              <span>팀원</span>
              <p>
                yousd179@naver.com<br>
                채팅방 기능 구현<br>
                회원가입,회원탈퇴,회원수정 구현<br>
                채팅,아이디,닉네임 금칙어 기능 구현<br>
                프로젝트 css html 제작<br>
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section><!-- End Members Section -->

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
