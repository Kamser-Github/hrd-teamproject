package com.example.wwwagame.controller;

import com.example.wwwagame.domain.comment.Comment;
import com.example.wwwagame.domain.comment.CommentDto;
import com.example.wwwagame.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class CommentController {
    @Autowired
    private CommentService service;

    @PostMapping("/comment/reg")
    public void createComment(@RequestBody CommentDto commentDto){
        service.createComment(commentDto);
    }

    @GetMapping("/search/readCommentByGamePage")
    public Map<Object, Object> readCommentByGamePage(@RequestParam String game, @RequestParam int pageNumber, @PageableDefault(value = 10) Pageable pageable){
        return service.readCommentByGamePage(game, pageNumber, pageable);
    }

    @GetMapping("/search/commentByGame")
    public List<Comment> readCommentByGame(@RequestParam String game){
        return service.readCommentByGame(game);
    }

    @GetMapping("/search/commentUserId")
    public Map<Object, Object> readCommentByUserId(@RequestParam String user, @RequestParam int pageNumber, @PageableDefault(value = 10) Pageable pageable){
        return service.readCommentByUserId(user, pageNumber, pageable);
    }

    @GetMapping("/search/commentByNo")
    public Comment readCommentById(@RequestParam long no){
        return service.readCommentById(no);
    }

    @PostMapping("/comment/delete")
    public void delete(@RequestParam long no){
        service.deleteComment(no);
    }

    @PostMapping("/comment/likeUp")
    public void likeUp(@RequestParam long no) {
        service.likeUpComment(no);
    }

    @PostMapping("/comment/likeDown")
    public void likeDown(@RequestParam long no) {
        service.likeDownComment(no);
    }
}
