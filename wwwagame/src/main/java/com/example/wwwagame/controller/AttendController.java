package com.example.wwwagame.controller;

import com.example.wwwagame.domain.attend.Attend;
import com.example.wwwagame.domain.attend.AttendDto;
import com.example.wwwagame.service.AttendService;
import com.example.wwwagame.util.Timestamp;
import kr.co.shineware.nlp.komoran.constant.DEFAULT_MODEL;
import kr.co.shineware.nlp.komoran.core.Komoran;
import kr.co.shineware.nlp.komoran.model.KomoranResult;
import kr.co.shineware.nlp.komoran.model.Token;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AttendController {

    @Autowired
    private AttendService service;

    @PostMapping("v1/create/attend")
    public String CreateAttend(@RequestBody AttendDto attendDto){
        System.out.println("컨트롤러");
        java.sql.Timestamp now = new java.sql.Timestamp(System.currentTimeMillis());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        attendDto.setReg_date_check(sdf.format(now));
        return service.createAttend(attendDto);
    }

    @PostMapping("v1/read/attendToday")
    public List<Attend> readTodayAttends(@RequestParam String reg_date_check){
        return service.readTodayAttends(reg_date_check);
    }

    @PostMapping("v1/read/attendByIdAndReg_date_check")
    public Attend readAttendByIdAndReg_date_check(@RequestParam String user_id, @RequestParam String reg_date_check){
        return service.readAttendByIdAndReg_date_check(user_id, reg_date_check);
    }

    @PostMapping("v1/read/attendByIdDuringReg_date_month")
    public List<Attend> readAttendByIdDuringReg_date_month(@RequestParam String user_id, @RequestParam String reg_date_month){
        return service.readAttendByIdDuringReg_date_month(user_id, reg_date_month);
    }

}
