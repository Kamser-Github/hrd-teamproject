<%@page import="user.UserDao"%>
<%@page import="user.UserDto"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Tour_Spot</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<link rel="stylesheet" href="https://cdnj	s.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
	<script src="https://kit.fontawesome.com/fa861a7902.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="resources/userJoinTest.css">
</head>
<body>
	<%
	request.setCharacterEncoding("utf-8");
	UserDao dao = UserDao.getInstance();
	String id = (String)session.getAttribute("log");
	UserDto user = dao.getUserById(id);
	String[] phone = user.getPhone().split("-");
	String phone1 = phone[0];
	String phone2 = phone[1];
	String phone3 = phone[2];
	if(id == null) {
		response.sendRedirect("home");
	} else {
	%>
	<jsp:include page="/views/headerMypage.jsp" />
	<section class="userWrap">
		<ul class="userNav_list">
			<li><a href="userPageNew">정보 수정</a></li>
			<li><a href="myBoard">내가 쓴 게시글</a></li>
			<li><a href="myComment">내가 쓴 댓글</a></li>
			<li><a href="myDeleteUser">회원탈퇴</a></li>
		</ul>
		<!-- 아아디/현재비번/사용할비번/사용할비번확인/이름/휴대번호/주소 -->
		<div class="info">
		<form class="wrap_outer" method="POST" action="service">
            <div class="wrap_out">
                <div class="wrap_in">
                <!--아이디 , 비밀번호 비밀번호 확인-->
                    <!-- 비밀번호 -->
                    <div class="ininfo">
                        <h3>아이디</h3>
                        <span class="info_box">
                            <input class="requiredValue"type="text" id="join_id" name="userId" value="<%=id %>" maxlength="20" readonly>
                            <span class="info_box_icon idicon">@email.com</span>
                        </span>
                        <span class="errorID errorCheck"></span>
                    </div>
                    <!-- 비밀번호 -->
                    <div class="ininfo">
                        <h3>현재 비밀번호</h3>
                        <span class="info_box">
                            <input class="info_box_input requiredValue" type="password" id="passWd" name="passWd" maxlength="16">
                        </span>
                    </div>
                    <!-- 비밀번호 -->
                    <div class="ininfo">
                        <h3>변경할 비밀번호</h3>
                        <span class="info_box">
                            <input class="info_box_input requiredValue" type="password" id="join_pw1" name="changePw" maxlength="16">
                            <span class="info_box_icon"><i class="fa-solid fa-key pwicon1"></i></span>
                        </span>
                        <span class="errorPw1 errorCheck"></span>
                    </div>
                    <div class="ininfo">
                        <h3>변경할 비밀번호 확인</h3>
                        <span class="info_box">
                            <input class="info_box_input requiredValue" type="password" id="join_pw2" name="changePwCheck" maxlength="16" readonly>
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
                            <input class="info_box_input requiredValue" type="text" id="join_name" name="userName" placeholder="닉네임 2~6자 내외" maxlength="6" value="<%=user.getName() %>">
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
                            <span><input class="info_box_input calendar" type="date" id="join_date" name="birthday" value="<%=user.getBirthday()==null?"":user.getBirthday()%>" readonly></span>
                            <span class="errorDate errorCheck"></span>
                        </div>
                    </article>
                    <!--주소-->
                    <div class="ininfo">
                        <div class="addr_button">
                            <h3>주소(선택)</h3> <p class="addr_search_button"><i class="fa-solid fa-magnifying-glass">검색</i></p>
                        </div>
                        <span class="info_box hidden" id="addrhidden">
                            <input class="info_box_input"  type="text" id="join_addr1" name="address1" value="<%=user.getAddress() %>" readonly>
                        </span>
                        <span class="info_box">
                            <input class="info_box_input"  type="text" id="join_addr2" name="address2" placeholder="<%=user.getAddress() %>">
                        </span>
                    </div>
                    <br>
                    <!--전화번호-->
                    <div class="ininfo">
                        <h3>전화번호</h3>
                        <ul class="info_phone">
                            <li><input type="text" class="checkPhone1 phoneNum requiredValue" name="userPhone1" value="<%=phone1 %>" placeholder="01X"></li>
                            <li><input type="text" class="checkPhone2 phoneNum requiredValue" name="userPhone2" value="<%=phone2 %>" placeholder="9999"></li>
                            <li class="info_phone_last"><input type="text" class="checkPhone3 phoneNum requiredValue" name="userPhone3" value="<%=phone3 %>" placeholder="9999">
                                <span class="info_box_icon iconPhone"><i class="fa-regular fa-square-check ch_phone"></i></span>
                            </li>
                        </ul>
                    </div>
                    <span class="errorNumber errorCheck"></span>
                    <!-- 회원가입 -->
                    <input type="hidden" name="command" value="MyInfoUpdate">
                    <button class="info_bnt_submit">정보수정</button>
                </div>
            </div>
        </form>
        </div>
	</section>
	<jsp:include page="/views/footerMyPage.jsp" />
	<%} %>
	<script src="resources/userPageTest.js" charset="utf-8"></script>
</body>
</html>