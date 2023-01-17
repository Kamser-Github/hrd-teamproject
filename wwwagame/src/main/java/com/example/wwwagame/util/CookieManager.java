package com.example.wwwagame.util;

import com.example.wwwagame.domain.chatting.ChattingRoomDto;
import com.example.wwwagame.domain.chatting.ChattingRoomRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

@Component
public class CookieManager {
    private ServletRequestAttributes attributes(){
        return (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        //Request 대한 정보를 직접 받아온다.
    }
    //새 쿠키 생성 ( 웹사이트에 쿠키정보에 저장, 로그인이나 상태등)
    public void addCookie(String cookieName,String cookieValue){
        HttpServletResponse response = attributes().getResponse();
        Cookie cookie = new Cookie(cookieName,cookieValue);
        cookie.setMaxAge(-1);// 브라우저가 종료될때 쿠키 삭제
        response.addCookie(cookie);
    }
    //채팅방 관련 쿠키 전부 삭제
    public void deleteCookie(){
        HttpServletResponse response = attributes().getResponse();
        Cookie roomCookie = new Cookie("roomNumber",null);
        Cookie nicknameCookie = new Cookie("nickname",null);

        roomCookie.setMaxAge(0);// params (0) => delete Cookie
        nicknameCookie.setMaxAge(0);

        response.addCookie(roomCookie);
        response.addCookie(nicknameCookie);
    }
    //쿠키에서 정보 찾기
    public Map<String,String> findCookie(){
        HttpServletRequest request = attributes().getRequest();

        Cookie[] cookies = request.getCookies();//요청정보에서 쿠키정보 다 꺼내기
        String rooomNumber = "";
        String nickname = "";

        if(cookies==null) { return null;}

        for(int i=0 ; i<cookies.length ; i++){
            if("roomNumber".equals(cookies[i].getName())){
                rooomNumber = cookies[i].getValue();
            }
            if("nickname".equals(cookies[i].getName())){
                nickname = cookies[i].getValue();
            }
        }
        if("".equals(rooomNumber)||"".equals(nickname)){
            return null;
        }
        Map<String,String> map = new HashMap<>();
        map.put("nickname",nickname);
        map.put("roomNumber",rooomNumber);
        return map;
    }
    //닉네임 생성
    private void createNickname(String nickname){
        addCookie("nickname",nickname);
    }
    //방 입장
    public boolean enterChattingRoom(ChattingRoomDto chattingRoomDto, String nickname){
        createNickname(nickname);

        if(chattingRoomDto==null){//방이 없다면
            deleteCookie();
            return false;
        }
        LinkedList<String> users = chattingRoomDto.getUsers();//유저 리스트
        users.add(nickname);
        addCookie("roomNumber",chattingRoomDto.getRoomNumber());
        return true;
    }
    //
    public ChattingRoomDto findRoom(String roomNumber){
        ChattingRoomDto chattingRoomDto = ChattingRoomDto.builder().roomNumber(roomNumber).build();

        if(ChattingRoomRepository.CHATTING_ROOM_LIST.contains(chattingRoomDto)){
            int index = ChattingRoomRepository.CHATTING_ROOM_LIST.indexOf(chattingRoomDto);
            return ChattingRoomRepository.CHATTING_ROOM_LIST.get(index);
        }
        return null;
    }
}
