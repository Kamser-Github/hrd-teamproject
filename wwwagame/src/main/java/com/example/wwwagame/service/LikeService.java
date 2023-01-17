package com.example.wwwagame.service;

import com.example.wwwagame.domain.like.Like;
import com.example.wwwagame.domain.like.LikeDto;
import com.example.wwwagame.domain.like.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class LikeService {

    @Autowired
    private LikeRepository repository;

    // 좋아요 등록
    public void createLike(LikeDto likeDto){
        Like like = new Like(likeDto);
        repository.save(like);
    }

    // 좋아요 불러오기
    public Like readByLikeId(long commentNo, long userNo){
        return repository.findLikeByCommentNoAndUserNo(commentNo, userNo);
    }

    // 좋아요 취소
    @Transactional
    public void deleteLike(long no){
        repository.deleteById(no);
    }
}
