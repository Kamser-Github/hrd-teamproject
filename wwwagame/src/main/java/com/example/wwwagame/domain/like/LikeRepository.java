package com.example.wwwagame.domain.like;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {

    public Like findLikeByCommentNoAndUserNo(long commentNo, long userNo);

    public void deleteByCommentNoAndUserNo(long commentNo, long userNo);

}
