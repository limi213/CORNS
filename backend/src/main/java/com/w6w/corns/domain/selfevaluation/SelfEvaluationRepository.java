package com.w6w.corns.domain.selfevaluation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelfEvaluationRepository extends JpaRepository<SelfEvaluation, SelfEvaluationPK> {
}
