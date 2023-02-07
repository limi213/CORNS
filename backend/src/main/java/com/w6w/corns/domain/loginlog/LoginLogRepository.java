package com.w6w.corns.domain.loginlog;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginLogRepository extends JpaRepository<LoginLog, Integer> {

    @Query(value="select count(distinct date(reg_tm)) from login_log"
            +" where user_id = :userId and year(reg_tm) = year(now()) and month(reg_tm) = month(now())"
            , nativeQuery = true)
    long findByRegTmAndUserIdPerMonth(int userId);

    @Query(value="select count(distinct date(reg_tm)) from login_log"
        + " where user_id = :userId", nativeQuery = true)
    long findByRegTmAndUserId(int userId);

}
