package com.example.wwwagame.domain.like;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "like_table")
@Entity
@NoArgsConstructor
@Getter
public class Like {

    @Id
    private long no;
    private long commentNo;
    private long userNo;

    public Like(LikeDto likeDto){
        this.commentNo = likeDto.getCommentNo();
        this.userNo = likeDto.getUserNo();

    }

}
