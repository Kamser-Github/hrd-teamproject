package com.example.wwwagame.domain.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository  extends JpaRepository<Comment, Long> {

    public List<Comment> findCommentByGame(String game, Sort sort);

    public Page<Comment> findByGameOrderByRegDateDesc(String game, Pageable pageable);

    public Page<Comment> findByIdOrderByRegDateDesc(String user, Pageable pageable);

}
