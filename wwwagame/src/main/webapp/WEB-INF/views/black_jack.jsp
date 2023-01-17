<%--
  Created by IntelliJ IDEA.
  User: EZEN
  Date: 2022-11-14
  Time: 오후 3:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
    <script src="https://code.jquery.com/jquery-2.2.4.js"></script>
    <script scr="/css/open.css" rel="stylesheet"></script>
    <link rel="shortcut icon" href="/img/team/three.png">
    <meta property="og:title" content="wwwagame">
    <meta property="og:description" content="삼행성">
    <meta property="og:image" content="/img/team/three.png">
    <title>블랙잭</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <link rel="stylesheet" href="css/black_jack.css">

    <!-- sweet -->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>
<body>
<!-- ======= Header ======= -->
<c:import url="header.jsp"/>
<c:set var="gameName" value="blackjack" scope="request"/>
<input type="hidden" id="log" value="${sessionScope.log.no}">
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
        <div class="show_user_coin"></div>
        <input type="hidden" class="user_coin" >
    </div>
    <%--        <button class="betting_board" ></button>--%>
</div>
<c:import url="comment.jsp"/>
<!-- ======= Footer ======= -->
<c:import url="footer.jsp"/>

<script src="script/temp.js"></script>
<script <%--type="module"--%> src="script/black_jack.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
</body>
</html>
