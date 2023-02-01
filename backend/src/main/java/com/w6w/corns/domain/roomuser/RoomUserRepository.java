package com.w6w.corns.domain.roomuser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoomUserRepository extends JpaRepository<RoomUser, Integer> {

    // 유저가 쫑알룸에 입장한 상태인지 체크하기 위해 조회
    @Query(value = "SELECT ru FROM RoomUser ru WHERE ru.userId = :userId and ru.roomUserCd <= 6001")
    List<RoomUser> findByUserIdAndRoomUserCd(int userId);
    // 쫑알룸 no로 유저 조회
    List<RoomUser> findByRoomNo(int roomNo);
    // 쫑알룸 내 대화중인 유저만 조회 (대화방 나간 유저 x)
    List<RoomUser> findByRoomNoAndRoomUserCd(int roomNo, int roomUserCd);
    // 쫑알룸에서 나갈 때 삭제
    void deleteByUserIdAndRoomNo(int userId, int roomNo);
    // 대화중인 쫑알룸에서 나갔을 때 코드 변경 위해 조회
    RoomUser findByUserIdAndRoomNo(int userId, int roomNo);
}
