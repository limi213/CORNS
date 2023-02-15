package com.w6w.corns.domain.explog;

import org.hibernate.annotations.Where;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface ExpLogRepository extends JpaRepository<ExpLog, Integer> {
    //회원 목록을 페이지네이션 처리하여 반환
    Slice<ExpLog> findByUserIdAndRegTmLessThanEqual(@Param("userId") int userId, @Param("regTm") LocalDateTime regTm, Pageable pageable);
}
