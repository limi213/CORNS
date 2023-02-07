package com.w6w.corns.domain.loginlog;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginLogRepository extends JpaRepository<LoginLog, Integer> {
    //조회하는 월의 userId에 대한 출석 횟수 계산
    @Query(value="select count(distinct date(l.regTm)) from LoginLog l"
            +" where l.userId=:userId and year(l.regTm) = year(now()) and month(l.regTm) = month(now())")
    long findByRegTmAndUserIdPerMonth(int userId);

}
