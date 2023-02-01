package com.w6w.corns.domain.roomuser;

import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

public class RoomUserRepositoryImpl implements CustomRoomUserRepository {

    private final JPAQueryFactory queryFactory;

    public RoomUserRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<Integer> findUserByRoomNo(int roomNo) {
        QRoomUser roomUser = QRoomUser.roomUser;
        return queryFactory
                .select(roomUser.userId)
                .from(roomUser)
                .where(roomUser.roomNo.eq(roomNo))
                .fetch();
    }
}
