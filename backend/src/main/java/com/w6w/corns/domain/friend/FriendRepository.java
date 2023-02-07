package com.w6w.corns.domain.friend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, FriendPK>, CustomFriendRepository {
    List<Friend> findByUserIdAAndFriendCd(int userIdA, int friendCd);
}
