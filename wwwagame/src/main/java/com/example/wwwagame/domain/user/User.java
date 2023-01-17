package com.example.wwwagame.domain.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Objects;

@Table(name = "user")
@Entity
@NoArgsConstructor
@Getter
@ToString
public class User {

    @Id // 키로 설정해주는 어노테이션
    private long no; // <--- 키값으로 설정
    private String id;
    private String password;
    private String nick;
    private String name;
    private String phone;
    private long bj_point;
    private long br_point;

    // 유저 생성 id/블랙잭/바카라 머니는 테이블에서 자동생성
    public User(UserDto userDto){
        this.id = userDto.getId();
        this.password = userDto.getPassword();
        this.nick = userDto.getNick();
        this.name = userDto.getName();
        this.phone = userDto.getPhone();
        this.bj_point = userDto.getBjPoint();
        this.br_point = userDto.getBrPoint();
    }
    public static UserDto toUserDto(User saved) {
        return new UserDto(
                        saved.getNo(),
                        saved.getId(),
                        saved.getPassword(),
                        saved.getNick(),
                        saved.getName(),
                        saved.getPhone(),
                        saved.getBj_point(),
                        saved.getBr_point());
    }

    // 유저 업데이터
    public void setUser(UserDto userDto){
        this.password = userDto.getPassword();
        this.nick = userDto.getNick();
        this.name = userDto.getName();
        this.phone = userDto.getPhone();
        this.bj_point = userDto.getBjPoint();
        this.br_point = userDto.getBrPoint();
    }

    public void setBlackJack(long point){
        this.bj_point = point;
    }

    public void setBaccarat(long point){
        this.br_point = point;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
