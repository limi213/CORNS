package com.w6w.corns.domain.withdraw;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WithdrawLogRepository extends JpaRepository<WithdrawLog, Integer> {

}
