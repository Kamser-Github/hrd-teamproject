package com.example.wwwagame.domain.chatting;

import lombok.Builder;
import lombok.Data;

import java.util.LinkedList;
import java.util.Objects;

@Data
@Builder
public class ChattingRoomDto {

    private String roomNumber;
    private String roomName;
    private LinkedList<String> users;//유저 닉네임 보관

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChattingRoomDto that = (ChattingRoomDto) o;
        return Objects.equals(roomNumber, that.roomNumber);
    }
    @Override
    public int hashCode() {
        return Objects.hash(roomNumber);
    }
}
