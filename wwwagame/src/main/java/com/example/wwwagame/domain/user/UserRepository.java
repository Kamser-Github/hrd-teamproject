package com.example.wwwagame.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM user WHERE id=? AND password=?", nativeQuery = true)
    public User findMyUser(String user, String password);

    @Query(value = "SELECT count(no) FROM user WHERE id=:userId",nativeQuery = true)
    public int existsById(@Param("userId") String userId);

    @Query(value = "SELECT count(no) FROM user WHERE phone=:userPhone",nativeQuery = true)
    public int existsByPhone(@Param("userPhone") String userPhone);

    public User findUserByNick(String nick);
}
