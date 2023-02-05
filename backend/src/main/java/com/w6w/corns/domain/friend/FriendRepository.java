package com.w6w.corns.domain.friend;

import com.w6w.corns.dto.friend.FriendListInterface;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, FriendPK> {
    Friend findByUserIdAAndUserIdB(int userIdA, int userIdB);

    List<Friend> findByUserIdAAndFriendCd(int userIdA, int friendCd);

    List<Friend> findByUserIdBAndFriendCd(int userIdB, int friendCd);

    @Query(value = "SELECT u.user_id as userId, u.nickname as nickname, u.img_url as imgUrl, u.level_no as levelNo " +
            "FROM friend as f " +
            "JOIN user as u " +
            "ON (f.user_id_a = :userId and f.user_id_b = u.user_id) " +
            "OR (f.user_id_b = :userId and f.user_id_a = u.user_id) " +
            "WHERE (f.user_id_a = :userId OR f.user_id_b = :userId)" +
            "AND f.friend_cd = :friendCd " +
            "AND u.nickname LIKE CONCAT('%',:keyword,'%') " +
            "AND f.mod_tm < :baseTime", nativeQuery = true)
    Slice<FriendListInterface> findFriendByNickname(int userId, String keyword, String baseTime, int friendCd, Pageable pageable);

    @Query(value = "SELECT u.user_id as userId, u.nickname as nickname, u.img_url as imgUrl, u.level_no as levelNo " +
            "FROM friend as f " +
            "JOIN user as u " +
            "ON (f.user_id_a = :userId and f.user_id_b = u.user_id) " +
            "OR (f.user_id_b = :userId and f.user_id_a = u.user_id) " +
            "WHERE (f.user_id_a = :userId OR f.user_id_b = :userId)" +
            "AND f.friend_cd = :friendCd " +
            "AND u.user_id = :findId " +
            "AND f.mod_tm < :baseTime", nativeQuery = true)
    Slice<FriendListInterface> findFriendByUserId(int userId, int findId, String baseTime, int friendCd, Pageable pageable);

    long countByUserIdAAndFriendCdOrUserIdBAndFriendCd(int userIdA, int friendCdA, int userIdB, int friendCdb);
}
