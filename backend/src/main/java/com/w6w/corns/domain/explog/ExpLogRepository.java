package com.w6w.corns.domain.explog;

import org.hibernate.annotations.Where;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ExpLogRepository extends JpaRepository<ExpLog, Integer> {

    Slice<ExpLog> findByUserIdAndRegTmLessThanEqual(int userId, Pageable pageable, LocalDateTime localDateTime);
}
