package com.example.wwwagame.service;

import com.example.wwwagame.domain.attend.Attend;
import com.example.wwwagame.domain.attend.AttendDto;
import com.example.wwwagame.domain.attend.AttendRepository;
import com.example.wwwagame.util.Timestamp;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class AttendService {
    @Autowired
    private AttendRepository repository;
    // CRUD
    // Create
    public String createAttend(AttendDto attendDto){
        System.out.println("서비스");
        Attend attend = new Attend(attendDto);
        repository.save(attend);
        String result = "실패";
        if(attend != null){
            result = "성공";
            System.out.println(result);
        }
        return result;
    }

    // Read
    // . 그날의 출석체크 기록 모두
    public List<Attend> readTodayAttends(String reg_date_check){
        List<Attend> attendList = repository.findTodayAttends(reg_date_check);

        return attendList;
    }

    // . 그날 해당 유저가 출석체크를 했는지
    public Attend readAttendByIdAndReg_date_check(String user_id, String reg_date_check){
        Attend attend = repository.findAttendByIdAndReg_date_check(user_id, reg_date_check);

        return attend;
    }

    // . 해당 월에 해당 유저가 출석체크한 리스트
    public List<Attend> readAttendByIdDuringReg_date_month(String user_id, String reg_date_month){
        List<Attend> attendList = repository.findAttendByIdDuringReg_date_month(user_id, reg_date_month);

        return attendList;
    }

    // Update ? 없음

    // Delete ?
}
