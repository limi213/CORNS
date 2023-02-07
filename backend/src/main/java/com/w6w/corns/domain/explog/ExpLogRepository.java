package com.w6w.corns.domain.explog;

import org.hibernate.annotations.Where;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface ExpLogRepository extends JpaRepository<ExpLog, Integer> {
    //회원 목록을 페이지네이션 처리하여 반환
    Slice<ExpLog> findByUserIdAndRegTmLessThanEqual(int userId, Pageable pageable, LocalDateTime localDateTime);

    //해당 날짜의 경험치 총합
    @Query(value = "select sum(e.gainExp) from ExpLog e " +
            "where e.userId=:userId and year(e.regTm)=:year and month(e.regTm)=:month and day(e.regTm)=:day")
    Long sumByUserIdAndRegTm(int userId, int year, int month, int day);
}
