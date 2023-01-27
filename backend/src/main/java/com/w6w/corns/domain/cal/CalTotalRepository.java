package com.w6w.corns.domain.cal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalTotalRepository extends JpaRepository<CalTotal, CalTotalPK> {
}
