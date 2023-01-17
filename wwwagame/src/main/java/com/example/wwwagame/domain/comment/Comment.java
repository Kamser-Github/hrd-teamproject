package com.example.wwwagame.domain.comment;

import com.example.wwwagame.util.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "comment") // 테이블 이름 지정하여 연동
@Entity // 연동된 데이터베이스의 객체
@NoArgsConstructor // 기본 생성자 생성하는 어노테이션
@Getter
public class Comment extends Timestamp {

    @Id
    private long no;
    private String id;
    private String nick;
    private String password;
    private String game;
    private String content;
    private int likeCnt;
    // private String regDate;

    public Comment(CommentDto comment){
        this.id = comment.getId();
        this.nick = comment.getNick();
        this.password = comment.getPassword();
        this.game = comment.getGame();
        this.content = comment.getContent();
        this.likeCnt = comment.getLikeCnt();
        // this.regDate = comment.getRegDate();
    }

    public void setLike(int likeCnt){
        this.likeCnt = likeCnt;
    }
}
