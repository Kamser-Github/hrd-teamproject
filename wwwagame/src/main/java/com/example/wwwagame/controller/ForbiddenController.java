package com.example.wwwagame.controller;

import com.example.wwwagame.domain.forbidden.ForbiddenWordDto;
import com.example.wwwagame.domain.forbiddenid.ForbiddenWordIDDto;
import com.example.wwwagame.service.ForbiddenWordIDService;
import com.example.wwwagame.service.ForbiddenWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ForbiddenController {

    @Autowired
    ForbiddenWordService forbiddenWordService;
    @Autowired
    ForbiddenWordIDService forbiddenWordIDService;

    @GetMapping("/forbidden-word")
    @ResponseBody
    public List<ForbiddenWordDto> findAll(){
        return forbiddenWordService.findAll();
    }

    @GetMapping("/forbidden-id")
    @ResponseBody
    public List<ForbiddenWordIDDto> findByIdAll(){
        return forbiddenWordIDService.findAll();
    }
}
