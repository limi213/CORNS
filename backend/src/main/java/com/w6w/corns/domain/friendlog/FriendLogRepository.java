package com.w6w.corns.domain.friendlog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendLogRepository extends JpaRepository<FriendLog, Integer> {
}