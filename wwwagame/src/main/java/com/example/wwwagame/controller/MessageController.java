package com.example.wwwagame.controller;

import com.example.wwwagame.domain.message.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@Slf4j
public class MessageController {
    @MessageMapping("/socket/roomList")
    @SendTo("/topic/roomList")
    public String roomList(){
        return "";
    }
    @MessageMapping("/socket/Message/{roomNumber}")
    @SendTo("/topic/Message/{roomNumber}") //
    public MessageDto sendToMessage(@DestinationVariable String roomNumber,
                                    MessageDto messageDto){
        return messageDto;
    }
    @MessageMapping("/socket/notification/{roomNumber}")
    @SendTo("/topic/notification/{roomNumber}")
    public Map<String,Object> notification(@DestinationVariable String roomNumber,
                                           Map<String,Object> chattingRoom){
        return chattingRoom;
    }

}
