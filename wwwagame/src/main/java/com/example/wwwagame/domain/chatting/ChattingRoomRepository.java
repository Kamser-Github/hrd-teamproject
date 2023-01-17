package com.example.wwwagame.domain.chatting;

import org.springframework.stereotype.Repository;

import java.util.LinkedList;

@Repository
public class ChattingRoomRepository {
    public static LinkedList<ChattingRoomDto> CHATTING_ROOM_LIST = new LinkedList<>();
}
