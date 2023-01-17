package com.example.wwwagame.controller;

import com.example.wwwagame.domain.chatting.ChattingRoomDto;
import com.example.wwwagame.domain.chatting.ChattingRoomRepository;
import com.example.wwwagame.util.CookieManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.*;

@Controller
public class ChattingRoomController {
    @Autowired
    private CookieManager cookieManager;

    //채팅방 목록
    @GetMapping("/chattingRoomList")
    public ResponseEntity<LinkedList<ChattingRoomDto>> chattingRoomList(){
        return new ResponseEntity<LinkedList<ChattingRoomDto>>(ChattingRoomRepository.CHATTING_ROOM_LIST, HttpStatus.OK);
    }

    //방 만들기
    @PostMapping("/chattingRoom")
    public ResponseEntity<Object> chattingRoomList(String roomName,String nickname){
        //방만들기
        String roomNumber = UUID.randomUUID().toString();
        ChattingRoomDto chattingRoomDto = ChattingRoomDto.builder()
                .roomNumber(roomNumber)
                .users(new LinkedList<>())
                .roomName(roomName)
                .build();
        ChattingRoomRepository.CHATTING_ROOM_LIST.add(chattingRoomDto);
        //쿠키에 방번호,닉네임 저장
        cookieManager.enterChattingRoom(chattingRoomDto,nickname);
        return new ResponseEntity<>(chattingRoomDto,HttpStatus.OK);
    }
    //방 들어가기
    @GetMapping("/chattingRoom-enter")
    public ResponseEntity<Object> EnterChattingRoom(String roomNumber,String nickname){
        //방 번호 찾기
        ChattingRoomDto chattingRoomDto = cookieManager.findRoom(roomNumber);

        if(chattingRoomDto==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cookieManager.enterChattingRoom(chattingRoomDto,nickname);
        return new ResponseEntity<>(chattingRoomDto,HttpStatus.OK);
    }
    @PatchMapping("/chattingRoom-exit")
    public ResponseEntity<Object> ExitChattingRoom(){
        //request 에서 쿠키정보 꺼내오기
        Map<String,String> map = cookieManager.findCookie();
    
        if(map == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String roomNumber = map.get("roomNumber");
        String nickname = map.get("nickname");

        //방번호로 찾기
        ChattingRoomDto chattingRoomDto = cookieManager.findRoom(roomNumber);
        List<String> users = chattingRoomDto.getUsers();

        //해당 방 닉네임 삭제
        users.remove(nickname);

        //쿠키 정보도 삭제
        cookieManager.deleteCookie();

        //유저가 없다면 방 삭제
        if(users.size()==0){
            ChattingRoomRepository.CHATTING_ROOM_LIST.remove(chattingRoomDto);
        }
        return new ResponseEntity<>(chattingRoomDto,HttpStatus.OK);
    }

    //참가중이던 방
    @GetMapping("/chattingRoom")
    public ResponseEntity<Object> chattingRoom(){
        //쿠키 정보에서 방 번호와 닉네임 꺼내오기
        Map<String,String> map = cookieManager.findCookie();

        if(map == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        //쿠키번호 따로 저장
        String roomNumber = map.get("roomNumber");
        String nickname = map.get("nickname");
        //방 찾기
        ChattingRoomDto chattingRoomDto = cookieManager.findRoom(roomNumber);

        if(chattingRoomDto==null){
            cookieManager.deleteCookie();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Map<String,Object> map2 = new HashMap<>();
        map2.put("chattingRoom", chattingRoomDto);
        map2.put("myNickname", nickname);
        return new ResponseEntity<>(map2, HttpStatus.OK);
    }
}
