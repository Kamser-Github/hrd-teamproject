package com.example.wwwagame.service;

import com.example.wwwagame.domain.comment.Comment;
import com.example.wwwagame.domain.comment.CommentDto;
import com.example.wwwagame.domain.comment.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class CommentService {
    @Autowired
    private CommentRepository repository;
    // 댓글 등록
    public CommentDto createComment(CommentDto commentDto){

        Comment comment = new Comment(commentDto);

        repository.save(comment);
        return commentDto;
    }

    // 게임과 일치하는 댓글 리스트 불러오기
    public List<Comment> readCommentByGame(String game){
        Sort sort = sortByregDate();
        return repository.findCommentByGame(game, sort);
    }

    // 게임과 일치하는 댓글 페이지에 따라 불러오기(정렬 포함)
    public Map<Object, Object> readCommentByGamePage(String game, int pageNumber, Pageable pageable){
        Pageable pageObj = pageable.withPage(pageNumber);
        Page<Comment> page = repository.findByGameOrderByRegDateDesc(game, pageObj);
        int pageCnt = page.getTotalPages();
        page.map(comment -> new CommentDto(comment.getNo(), comment.getId(), comment.getNick(), comment.getPassword(), comment.getGame(), comment.getContent(), comment.getLikeCnt()));
        List<Comment> content = page.getContent();
        Map<Object, Object> list = new HashMap<>();
        list.put("content", content);
        list.put("pageCnt", pageCnt);
        return list;
    }

    // 유저 아이디와 일치하는 댓글 리스트 불러오기
    public Map<Object, Object> readCommentByUserId(String user, int pageNumber, Pageable pageable){
        Pageable pageObj = pageable.withPage(pageNumber);
        Page<Comment> page = repository.findByIdOrderByRegDateDesc(user, pageObj);
        int pageCnt = page.getTotalPages();
        page.map(comment -> new CommentDto(comment.getNo(), comment.getId(), comment.getNick(), comment.getPassword(), comment.getGame(), comment.getContent(), comment.getLikeCnt()));
        List<Comment> content = page.getContent();
        Map<Object, Object> list = new HashMap<>();
        list.put("content", content);
        list.put("pageCnt", pageCnt);
        return list;
    }


    // no 일치하는 댓글 하나 불러오기
    public Comment readCommentById(Long no){
        Comment comment = repository.findById(no).orElseThrow(
                () -> new IllegalArgumentException("댓글을 찾지 못했습니다.")
        );
        return comment;
    }

    // 좋아요++
    @Transactional
    public void likeUpComment(Long no){
        Comment comment = readCommentById(no);
        if(comment != null){
            comment.setLike(comment.getLikeCnt()+1);
        }
    }

    // 좋아요 --
    @Transactional
    public void likeDownComment(Long no){
        Comment comment = readCommentById(no);
        if(comment != null){
            comment.setLike(comment.getLikeCnt()-1);
        }
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(long no) {
        repository.deleteById(no);
    }

    // 정렬
    private Sort sortByregDate(){
        return Sort.by(Sort.Direction.DESC, "regDate");
    }

}
