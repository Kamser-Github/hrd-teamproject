package com.example.wwwagame.domain.comment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentDto {

    private long no;
    private String id;
    private String nick;
    private String password;
    private String game;
    private String content;
    private int likeCnt;
}
