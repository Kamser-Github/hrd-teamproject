package com.example.wwwagame.service;

import com.example.wwwagame.domain.user.User;
import com.example.wwwagame.domain.user.UserDto;
import com.example.wwwagame.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository repository;

    //  추가
    public UserDto createUser(UserDto userDto) { // User로 반환하는데
        userDto.setBjPoint(100000);
        userDto.setBrPoint(20000000);
        log.info(userDto.toString());
        User user = new User(userDto);
        User saved = repository.save(user);
        return userDto = User.toUserDto(saved);
    }

    // 불러오기
    public User readUserById(Long no) {
        User user = repository.findById(no).orElseThrow(
                () -> new IllegalArgumentException("사용자를 찾지 못했습니다.")
        );
        return user;
    }

    //아이디 중복찾기.
    public int existsById(String id) {
        return repository.existsById(id);
    }

    //번호 중복찾기
    public int existsByPhone(String phone) {

        return repository.existsByPhone(phone);
    }

    public List<User> readUserAll() {
        return repository.findAll();
    }

    //login
    public User readGetUserByUserAndPassword(String id, String password) {
        User result = repository.findMyUser(id, password);
        return result;
    }

    // 업데이트
    @Transactional
    public boolean updateUser(@RequestBody UserDto userDto) {
        User user = readUserById(userDto.getNo());
        if (user == null) {
            return false;
        }
        user.setUser(userDto);
        System.out.println("no : " + user.getNo());
        System.out.println("id : " + user.getId());
        System.out.println("password : " + user.getPassword());
        System.out.println("nick : " + user.getNick());
        System.out.println("name : " + user.getName());
        System.out.println("phone : " + user.getPhone());
        System.out.println("bjPoint : " + user.getBj_point());
        System.out.println("brPoint : " + user.getBr_point());

        return true;
    }

    @Transactional
    public long updateBrPoint(UserDto userDto) {
        User user = readUserById(userDto.getNo());
        if (user != null) {
            user.setBaccarat(userDto.getBrPoint());
        }
        return userDto.getBrPoint();
    }

    @Transactional
    public long updateBjPoint(UserDto userDto) {
        User user = readUserById(userDto.getNo());
        if (user != null) {
            user.setBlackJack(userDto.getBjPoint());
        }
        return userDto.getBjPoint();
    }

    // 삭제
    @Transactional
    public boolean deleteUser(Map<String, Object> userDto) {
        long userNo = Long.parseLong((String) userDto.get("no"));
        String userID = (String) userDto.get("id");
        String userPw = (String) userDto.get("password");

        User user = repository.findById(userNo).orElseThrow(() ->
                new IllegalArgumentException("잘못된 접근")
        );
        log.info(user.toString());
        log.info(userID);
        log.info(user.getId());
        log.info(userPw);
        log.info(user.getPassword());

        if (user.getId().equals(userID) && user.getPassword().equals(userPw)) {
            repository.delete(user);
            return true;
        }
        return false;
    }

    //닉네임중복
    public boolean findUserByNick(String nick){
        User user = repository.findUserByNick(nick);
        if(user==null){
            return false;
        }
        return true;
    }
}

