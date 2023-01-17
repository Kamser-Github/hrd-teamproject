package com.example.wwwagame.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Controller
public class MainController {

    @GetMapping ("/index")
    public String index() {
        return "index";
    }
    @GetMapping("/events")
    public String event() {
        return "events";
    }
    @GetMapping("/content")
    public String content(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Object result = session.getAttribute("log");
        if(result==null){
            return "index";
        }
        return "content";
    }
    @GetMapping("/flashGame")
    public String flashGame() {
        return "flashGame";
    }

    @GetMapping("/join")
    public String join(){
        return "join";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    // 게임
    @GetMapping("/baccarat")
    public String baccarat(){
        return "baccarat";
    }

    @GetMapping("/black_jack")
    public String black_jack(){
        return "black_jack";
    }

    @GetMapping("/game/1to50")
    public String oneto50(){
        return "game/1to50";
    }

    @GetMapping("/game/omok")
    public String omok(){
        return "game/omok";
    }

    @GetMapping("/game/tictactoe")
    public String tictacto(){
        return "game/tictactoe";
    }

    @GetMapping("/attend")
    public String attend(HttpServletRequest request){
        HttpSession session = request.getSession();
        Object result = session.getAttribute("log");
        if(result==null){
            return "index";
        }
        return "attend";
    }
    @GetMapping("/ourTeam")
    public String ourTeam(){
        return "ourTeam";
    }

    @GetMapping("/talk")
    public String talk() {
        return "talk";
    }
}

