<%--
  Created by IntelliJ IDEA.
  User: yousd
  Date: 22-11-19
  Time: 오전 10:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="/css/talk.css">
    <script src="https://kit.fontawesome.com/fa861a7902.js" crossorigin="anonymous"></script>
</head>
<body>
<!-- 채팅방 목록 -->
<!-- 채팅방 on off-->
    <main class="bg-light main-chatting">
        <h1>채팅방</h1>
        <button class="new_chat bg-info border-0">새 채팅방</button>
        <nav>
            <span>방 제목</span>
            <span>인원</span>
        </nav>
        <ul>
            <li>
                <!--
                <span class="chat_title"></span>
                <span class="chat_count"></span>
                 -->
            </li>
        </ul>
    </main>
    <!-- 채팅방 목록 -->
    <!-- 채팅방 on off-->
    <!-- 채팅방 입장 -->
    <div class="chat">
        <div>
            <div class="chat_body">
                <h2 class="chat_title">1번방</h2>
                <button class="chat_back"><i class="fa-regular fa-circle-left"></i></button>
                <button type="button" class="btn btn-light btn-user-list"><i class="fa-solid fa-list"></i></button>
                <ul class="chat_list">
                    <li>
                        <!-- <div class="notification">
                            <span></span>
                        </div> -->
                    </li>
                </ul>

                <div class="chat_input">
                    <div class="chat_input_area">
                        <textarea></textarea>
                    </div>

                    <div class="chat_button_area">
                        <button>전송</button>
                    </div>
                </div>
            </div>

            <div class="chat_users">
                <h2>
                    참가인원
                    <span class="user" style="display: inline"></span>
                </h2>

                <div class="chat_nickname">
                    <ul>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- 채팅방 입장 -->

    <!-- sock js -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.5.2/sockjs.min.js"></script>
    <%--    <!-- STOMP -->--%>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/script/talk.js"></script>
</body>
</html>
