package com.example.wwwagame.domain.message;

import lombok.Data;

import java.util.Date;

@Data
public class MessageDto {

    private String message;
    private String nickname;
    private Date date;

    public MessageDto(){
        date = new Date();
    }
}
