package com.example.wwwagame.controller;

import com.example.wwwagame.domain.like.Like;
import com.example.wwwagame.domain.like.LikeDto;
import com.example.wwwagame.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class LikeController {

     private final LikeService service;

    @PostMapping("/like/regLike")
    public void createLike(@RequestBody LikeDto likeDto){
        service.createLike(likeDto);
    }

    @GetMapping("/like/LikeByCommentId")
    public boolean readByLikeId(@RequestParam long commentNo, @RequestParam long userNo) {
        boolean check = false;
        if(service.readByLikeId(commentNo, userNo) != null){
            check = true;
        }
        return check;
    }

    @DeleteMapping("/like/delLike")
    public void deleteLike(@RequestParam long commentNo, @RequestParam long userNo){
        Like like = service.readByLikeId(commentNo, userNo);
        if(like != null){
            service.deleteLike(like.getNo());
        }
    }

}
