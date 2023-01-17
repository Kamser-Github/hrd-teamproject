package com.example.wwwagame.domain.attend;

import com.example.wwwagame.util.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "attend") // 테이블 이름 지정하여 연동
@Entity                 // 연동된 데이터베이스의 객체
@NoArgsConstructor      // 기본 생성자 생성하는 어노테이션
@Getter
public class Attend extends Timestamp{

    @Id                 // 키로 설정해주는 어노테이션
    private long code;   // <- 키값으로 설정
    private String user_id;
    private String user_nick;
    private String content;
    private String reg_date_month;
    private String reg_date_check;

    public Attend(AttendDto attendDto){
        this.code = attendDto.getCode();
        this.user_id = attendDto.getUser_id();
        this.user_nick = attendDto.getUser_nick();
        this.content = attendDto.getContent();
        this.reg_date_month =attendDto.getReg_date_month();
        this.reg_date_check = attendDto.getReg_date_check();
    }

}

