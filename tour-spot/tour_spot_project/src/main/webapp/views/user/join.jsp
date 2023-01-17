<%@page import="model.KakaoProfile"%>
<%@page import="user.UserDao"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
	<script src="https://kit.fontawesome.com/fa861a7902.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="resources/userJoin.css">
<title>Tour_Spot</title>
</head>
<body> 
	<%
	request.setCharacterEncoding("UTF-8");
	UserDao dao = UserDao.getInstance();
	int no = dao.noGenerator();
	KakaoProfile profile = (KakaoProfile) request.getAttribute("profile");
	%>
	<!-- 회원코드/이름/나이/성별/아이디/주소/폰번/패스워드 -->
	<jsp:include page="/views/header.jsp" />
	<section>
   		<form class="wrap_outer" method="POST" action="service">
   			<input type="hidden" name="command" value="Join">
            <div class="wrap_out">
                <div class="wrap_in">
                <!--아이디 , 비밀번호 비밀번호 확인!-->
                    <!-- 비밀번호 -->
                    <div class="ininfo">
                        <h3>아이디</h3>
                        <span class="info_box">
                            <input class="requiredValue"type="text" id="join_id" name="id" value="<%=profile==null?"":profile.getEmail()%>" maxlength="20">
                            <span class="info_box_icon idicon">@email.com</span>
                        </span>
                        <span class="errorID errorCheck"></span>
                    </div>
                    <!-- 비밀번호 -->
                    <div class="ininfo">
                        <h3>비밀번호</h3>
                        <span class="info_box">
                            <input class="info_box_input requiredValue" type="password" id="join_pw1" name="password" maxlength="16">
                            <span class="info_box_icon"><i class="fa-solid fa-key pwicon1"></i></span>
                        </span>
                        <span class="errorPw1 errorCheck"></span>
                    </div>
                    <div class="ininfo">
                        <h3>비밀번호 확인</h3>
                        <span class="info_box">
                            <input class="info_box_input requiredValue" type="password" id="join_pw2" name="passwordCheck" maxlength="16" readonly>
                            <span class="info_box_icon"><i class="fa-solid fa-key pwicon2"></i></span>
                        </span>
                        <span class="errorPw2 errorCheck"></span>
                    </div>
                <!--닉네임 생년월일 성별-->
                    <div class="ininfo">
                        <div class="name_button">
                            <h3>닉네임</h3>
                        </div>
                        <span class="info_box">
                            <input class="info_box_input requiredValue" type="text" id="join_name" name="name" placeholder="닉네임 2~6자 내외" maxlength="6" value="<%=profile==null?"":profile.getNickname()%>">
                            <span class="info_box_icon"><i class="fa-regular fa-square-check nic_name"></i></span>
                        </span>
                        <span class="errorName errorCheck"></span>
                    </div>
                    <article class="ininfo_two">
                        <!--성별-->
                        <div class="ininfo info_gender">
                            <h3>성별(선택)</h3>
                            <span class="info_box gender">
                                <select name="gender">
                                    <option value="X">선택안함</option>
                                    <option value="남">남성</option>
                                    <option value="여">여성</option>
                                </select>
                            </span>
                        </div>
                        <!--생년월일-->
                        <div class="ininfo info_date">
                            <h3>생년월일(선택)</h3>
                            <span><input class="info_box_input calendar" type="date" id="join_date" name="birthday"></span>
                            <span class="errorDate errorCheck"></span>
                        </div>
                    </article>
                    <!--주소-->
                    <div class="ininfo">
                        <div class="addr_button">
                            <h3>주소(선택)</h3> <p class="addr_search_button"><i class="fa-solid fa-magnifying-glass">검색</i></p>
                        </div>
                        <span class="info_box hidden" id="addrhidden">
                            <input class="info_box_input"  type="text" id="join_addr1" name="address1" readonly>
                        </span>
                        <span class="info_box">
                            <input class="info_box_input"  type="text" id="join_addr2" name="address2" placeholder="주소를 검색해주세요.">
                        </span>
                    </div>
                    <br>
                    <!--전화번호-->
                    <div class="ininfo">
                        <h3>전화번호</h3>
                        <ul class="info_phone">
                            <li><input type="text" class="checkPhone1 phoneNum requiredValue" name="phone1" pattern="^01[0179]$" placeholder="01X"></li>
                            <li><input type="text" class="checkPhone2 phoneNum requiredValue" name="phone2" pattern="\d{3,4}" placeholder="9999"></li>
                            <li class="info_phone_last"><input type="text" class="checkPhone3 phoneNum requiredValue" name="phone3" pattern="\d{4}" placeholder="9999">
                                <span class="info_box_icon iconPhone"><i class="fa-regular fa-square-check ch_phone"></i></span>
                            </li>
                        </ul>
                    </div>
                    <span class="errorNumber errorCheck"></span>
                    <!--몰래 넘기는 정보-->
                    <input type="hidden" name="no" id="no" value="<%=no%>">
                    <input type="hidden" name="token" id="token" value="<%=profile==null?"":profile.getId()%>">
                    <!-- 회원가입 -->
                    <button class="info_bnt_submit">회원가입</button>
                </div>
            </div>
        </form>
    </section>
	<script src="resources/join.js" charset="utf-8"></script>
	<jsp:include page="/views/footer.jsp" />
</body>
</html>