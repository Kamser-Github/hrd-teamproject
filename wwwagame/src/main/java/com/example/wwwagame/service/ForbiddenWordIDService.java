package com.example.wwwagame.service;

import com.example.wwwagame.domain.forbidden.ForbiddenWordDto;
import com.example.wwwagame.domain.forbiddenid.ForbiddenWordIDDto;
import com.example.wwwagame.domain.forbiddenid.ForbiddenWordIDEntity;
import com.example.wwwagame.domain.forbiddenid.ForbiddenWordIDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ForbiddenWordIDService {
    @Autowired
    ForbiddenWordIDRepository repository;

    public List<ForbiddenWordIDDto> findAll(){
        List<ForbiddenWordIDEntity> list = repository.findAll();
        List<ForbiddenWordIDDto> result = list.stream()
                .map((entity)-> entity.toWordIDDto(entity))
                .collect(Collectors.toList());
        return result;
    }
}
