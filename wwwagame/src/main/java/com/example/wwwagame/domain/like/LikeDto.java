package com.example.wwwagame.domain.like;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LikeDto {
    private long no;
    private long commentNo;
    private long userNo;

    public LikeDto(long commentNo, long userNo) {
        this.commentNo = commentNo;
        this.userNo = userNo;
    }
}
