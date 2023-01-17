package com.example.wwwagame.service;

import com.example.wwwagame.domain.forbidden.ForbiddenWordDto;
import com.example.wwwagame.domain.forbidden.ForbiddenWordEntity;
import com.example.wwwagame.domain.forbidden.ForbiddenWordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ForbiddenWordService {
    @Autowired
    ForbiddenWordRepository repository;

    public List<ForbiddenWordDto> findAll(){
        List<ForbiddenWordEntity> list = repository.findAll();
        List<ForbiddenWordDto> result = list.stream()
                .map((entity)-> entity.toWordDto(entity))
                .collect(Collectors.toList());
        return result;
    }
}
