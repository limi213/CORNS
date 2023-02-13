package com.w6w.corns.domain.invitelog;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.w6w.corns.domain.room.CustomRoomRepository;
import com.w6w.corns.domain.room.QRoom;
import com.w6w.corns.domain.room.Room;
import com.w6w.corns.domain.roomuser.QRoomUser;
import com.w6w.corns.domain.user.QUser;
import com.w6w.corns.dto.invitelog.InviteRoomListResponseDto;
import com.w6w.corns.dto.rank.RankListResponseDto;
import com.w6w.corns.util.code.RoomCode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Transactional
public class CustomInviteLogRepositoryImpl implements CustomInviteLogRepository {

    private final JPAQueryFactory queryFactory;

    private QInviteLog inviteLog = QInviteLog.inviteLog;
    private QRoom room = QRoom.room;
    private QUser user = QUser.user;

    public CustomInviteLogRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<InviteRoomListResponseDto> findInviteRoomByUserId(int userId) {
        return queryFactory
                .select(Projections.constructor(InviteRoomListResponseDto.class,
                        user.userId,
                        user.nickname,
                        user.imgUrl,
                        inviteLog.roomNo,
                        room.title,
                        room.time,
                        room.maxMember,
                        room.subjectNo))
                .from(inviteLog)
                .join(room).on(inviteLog.roomNo.eq(room.roomNo))
                .join(user).on(inviteLog.fromUserId.eq(user.userId))
                .where(inviteLog.toUserId.eq(userId))
                .fetch();
    }

}
