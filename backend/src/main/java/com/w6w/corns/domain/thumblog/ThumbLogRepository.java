package com.w6w.corns.domain.thumblog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThumbLogRepository extends JpaRepository<ThumbLog, Integer> {
    long countByToUserId(int toUserId);
}