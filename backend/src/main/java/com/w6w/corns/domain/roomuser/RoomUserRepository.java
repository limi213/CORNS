package com.w6w.corns.domain.roomuser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoomUserRepository extends JpaRepository<RoomUser, Integer>, CustomRoomUserRepository {

    // 유저가 쫑알룸에 입장한 상태인지 체크하기 위해 조회
    @Query(value = "SELECT ru FROM RoomUser ru WHERE ru.userId = :userId and ru.roomUserCd <= :roomUserCd")
    List<RoomUser> findUserInRoom(int userId, int roomUserCd);
    // 쫑알룸 no로 유저 조회
    List<RoomUser> findByRoomNo(int roomNo);
    // 쫑알룸 내 대화중인 유저만 조회 (대화방 나간 유저 x)
    List<RoomUser> findByRoomNoAndRoomUserCd(int roomNo, int roomUserCd);
    // 쫑알룸에서 나갈 때 삭제
    void deleteByUserIdAndRoomNo(int userId, int roomNo);
    // 대화중인 쫑알룸에서 나갔을 때 코드 변경 위해 조회
    RoomUser findByUserIdAndRoomNo(int userId, int roomNo);
    // 쫑알룸 활성 멤버 조회
    @Query(value = "SELECT ru FROM RoomUser ru WHERE ru.roomNo = :roomNo and ru.roomUserCd <= :roomUserCd")
    List<RoomUser> findRoomUserInRoom(int roomNo, int roomUserCd);
    // 쫑알룸 시작 기준 멤버 조회 (=> 중간에 대화방 나간 유저 o)
    @Query(value = "SELECT ru FROM RoomUser ru WHERE ru.roomNo = :roomNo and ru.roomUserCd >= :roomUserCd")
    List<RoomUser> findStartRoomUserInRoom(int roomNo, int roomUserCd);
    // 사용자가 참여 완료한 대화 목록 조회
    List<RoomUser> findByUserIdAndRoomUserCd(int userId, int roomUserCd);
    //날짜를 기준으로 사용자가 참여 완료한 대화에서의 speaking_sec 합 조회
    @Query(value = "select sum(ru.speakingSec) from RoomUser ru " +
            "where ru.userId=:userId and year(ru.regTm)=:year and month(ru.regTm)=:month and day(ru.regTm)=:day")
    Long sumByUserIdAndRegTm(int userId, int year, int month, int day);
}
