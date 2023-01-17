package com.example.wwwagame.controller;

import com.example.wwwagame.domain.user.User;
import com.example.wwwagame.domain.user.UserDto;
import com.example.wwwagame.service.UserService;
import com.example.wwwagame.util.Timestamp;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
public class UserController extends Timestamp {
    @Autowired
    private UserService service;

    @PostMapping("/user/join")
    public void createUser(UserDto userDto,HttpServletRequest request,HttpServletResponse response) throws IOException {
        UserDto saveDto = service.createUser(userDto);
        log.info(saveDto.toString());
        response.sendRedirect("/index");
        // return mv;
    }

    @GetMapping("/user/dupl-id")
    public boolean checkDuplId(@RequestParam("id") String id){
        int result = service.existsById(id);
        return result ==1 ?
                true :
                false;
    }

    @GetMapping("/user/dupl-phone")
    public boolean checkDuplPhone(@RequestParam("phone") String phone){
        int result = service.existsByPhone(phone);
        return result ==1 ?
                true :
                false;
    }

    @GetMapping("/v1/search/user")
    public User getUser(@RequestParam long no){
        User user = service.readUserById(no);
        return user;
    }

    @PostMapping("/v1/search/user/id")
    public User getUserByUserAndPassword(@RequestParam String id, @RequestParam String password){
        User result = service.readGetUserByUserAndPassword(id, password);
        return result;
    }

    // getUserAll
    @GetMapping("/v1/search/userAll")
    public List<User> readUserAll(){
        return service.readUserAll();
    }

    @PostMapping("/v1/update/user")
    public boolean updateUser(@RequestBody UserDto userDto, HttpServletRequest request){
        log.info(userDto.toString());
        boolean result1 = service.updateUser(userDto);
        if(result1){
            User user = getUser(userDto.getNo());
            if(user != null){
                HttpSession session = request.getSession();
                session.setAttribute("log", user);
                return true;
            }
        }
        return false;
    }

    @PostMapping("/v1/update/userBrPoint")
    public void updateBrPoint(@RequestBody UserDto userDto){
        service.updateBrPoint(userDto);
    }

    @PostMapping("/v1/update/userBjPoint")
    public long updateBjPoint(@RequestBody UserDto userDto){
        return service.updateBjPoint(userDto);
    }

    @PostMapping("/v1/update/userPoints")
    public boolean updateUserPoints(@RequestParam long no, @RequestParam long bjPoint, @RequestParam long brPoint, @RequestParam int what, HttpServletRequest request) {
        User user = getUser(no);
        HttpSession session = request.getSession();
        if (what == 1 || what == 3) {  // 블랙잭만
            user.setBlackJack(bjPoint);
            if (what == 1 && user.getBj_point() == bjPoint) {
                session.setAttribute("log", user);
                return true;
            }
        }
        if (what == 2 || what == 3) {
            user.setBaccarat(brPoint);
            if(user.getBr_point() == brPoint){
                session.setAttribute("log", user);
                return true;
            }
        }
        return false;
    }

    // deleteUser
    @DeleteMapping("/v1/delete/user")
    public boolean deleteUser(@RequestBody Map<String,Object> userDto){
        return service.deleteUser(userDto);
    }

    @PostMapping("/login/user")
    public boolean loginUser(@RequestParam String id, @RequestParam String password, HttpServletRequest request){
        User result = service.readGetUserByUserAndPassword(id, password);
        if(result != null){
            HttpSession session = request.getSession();
            session.setAttribute("log", result);
            return true;
        }
        return false;
    }

    @PostMapping("/logout/user")
    public void logoutUser(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.removeAttribute("log");
    }

    @PostMapping("/find/user")
    public boolean findByNick(@RequestBody Map<String,String> user){
        String nick = user.get("nick");
        return service.findUserByNick(nick);
    }
}
