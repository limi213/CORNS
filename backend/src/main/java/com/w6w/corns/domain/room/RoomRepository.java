package com.w6w.corns.domain.room;

import com.w6w.corns.domain.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

    // 대기중, 대화중인 방 리스트만 보여줌
    @Query(value = "SELECT r FROM Room r WHERE r.roomCd <= :roomCd")
    List<Room> findAllByRoomCd(int roomCd);



}
