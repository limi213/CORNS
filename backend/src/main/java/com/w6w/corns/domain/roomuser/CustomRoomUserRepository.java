package com.w6w.corns.domain.roomuser;

import java.util.List;

public interface CustomRoomUserRepository {
    List<Integer> findUserByRoomNo(int roomNo);
}
