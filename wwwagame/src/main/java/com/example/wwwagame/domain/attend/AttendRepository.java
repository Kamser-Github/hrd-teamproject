package com.example.wwwagame.domain.attend;

import com.example.wwwagame.util.Timestamp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AttendRepository extends JpaRepository<Attend, Long> {

    @Query(value = "SELECT * FROM attend WHERE reg_date_check=?", nativeQuery = true)
    public List<Attend> findTodayAttends(String reg_date_check);

    @Query(value = "SELECT * FROM attend WHERE user_id=? AND reg_date_check=?", nativeQuery = true)
    public Attend findAttendByIdAndReg_date_check(String user_id, String reg_date_check);

    @Query(value = "SELECT * FROM attend WHERE user_id=? AND reg_date_month=?", nativeQuery = true)
    public List<Attend> findAttendByIdDuringReg_date_month(String user_id, String reg_date_month);

}
