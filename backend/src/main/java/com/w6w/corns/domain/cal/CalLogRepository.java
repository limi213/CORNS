package com.w6w.corns.domain.cal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CalLogRepository extends JpaRepository<CalLog, Integer> {
    //지표를 위한 하루 누적 값 찾아오기
    CalLog findByUserIdAndRankCdAndStartDtAndEndDt(int userId, int rankCd, LocalDate startDt, LocalDate endDt);
}
