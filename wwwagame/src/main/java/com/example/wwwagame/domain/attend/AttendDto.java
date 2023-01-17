package com.example.wwwagame.domain.attend;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AttendDto {

    private long code;
    private String user_id;
    private String user_nick;
    private String content;
    private String reg_date_month;
    private String reg_date_check;
}
