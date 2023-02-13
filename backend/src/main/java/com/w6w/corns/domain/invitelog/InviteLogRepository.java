package com.w6w.corns.domain.invitelog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InviteLogRepository extends JpaRepository<InviteLog, Integer>, CustomInviteLogRepository {
}