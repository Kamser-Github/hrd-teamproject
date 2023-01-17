package com.example.wwwagame.domain.user;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserDto {

    private long no;
    private String id;
    private String password;
    private String nick;
    private String name;
    private String phone;
    private long bjPoint;
    private long brPoint;
}
