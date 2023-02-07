package com.w6w.corns.domain.roomuser;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.w6w.corns.domain.room.QRoom;
import com.w6w.corns.domain.selfevaluation.QSelfEvaluation;
import com.w6w.corns.dto.conversationlog.RoomLogFilterDto;
import com.w6w.corns.dto.conversationlog.RoomLogResponseDto;
import com.w6w.corns.util.code.RoomUserCode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class CustomRoomUserRepositoryImpl implements CustomRoomUserRepository {

    private final JPAQueryFactory queryFactory;

    private QRoomUser roomUser = QRoomUser.roomUser;
    private QRoom room = QRoom.room;
    private QSelfEvaluation selfEvaluation = QSelfEvaluation.selfEvaluation;

    public CustomRoomUserRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<Integer> findUserByRoomNo(int roomNo) {
        return queryFactory
                .select(roomUser.userId)
                .from(roomUser)
                .where(roomUser.roomNo.eq(roomNo))
                .fetch();
    }

    // 유저가 참여했던 쫑알로그를 필터에 따라 조회 후 페이징
    @Override
    public Slice<RoomLogResponseDto> findLogByUserIdAndFilter(RoomLogFilterDto roomLogFilterDto, String baseTime, int userId, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();

        // userId
        builder.and(roomUser.userId.eq(userId));

        // roomUserCd
        builder.and(roomUser.roomUserCd.between(RoomUserCode.ROOM_USER_END.getCode(), RoomUserCode.ROOM_USER_EXIT.getCode()));

        // baseTime
        builder.and(room.regTm.lt(LocalDateTime.parse(baseTime, DateTimeFormatter.ofPattern(("yyyy-MM-dd HH:mm:ss")))));

        // isOnlyBookmark
        if (roomLogFilterDto.getIsOnlyBookmark()) {
            builder.and(roomUser.bookmarkYN.eq('Y'));
        } else {
            // subject
            BooleanBuilder subjectBuilder = new BooleanBuilder();
            for (int subject: roomLogFilterDto.getSubjects()) {
                subjectBuilder.or(room.subjectNo.eq(subject));
            }
            builder.and(subjectBuilder);

            // time
            builder.and(room.time.between(roomLogFilterDto.getMinTime(), roomLogFilterDto.getMaxTime()));

            // date
            LocalDateTime startDate = LocalDateTime.parse(roomLogFilterDto.getStartDate(), DateTimeFormatter.ofPattern(("yyyy-MM-dd HH:mm:ss")));
            LocalDateTime endDate = LocalDateTime.parse(roomLogFilterDto.getEndDate(), DateTimeFormatter.ofPattern(("yyyy-MM-dd HH:mm:ss")));
            builder.and(room.modTm.between(startDate, endDate));

            // score
            BooleanBuilder selfScoreBuilder = new BooleanBuilder();
            for (int score: roomLogFilterDto.getSelfScores()) {
                selfScoreBuilder.or(selfEvaluation.score.eq(score));
            }
            builder.and(selfScoreBuilder);

            // getThumb
            if (roomLogFilterDto.getGetThumb() == 0) {
                builder.and(roomUser.thumbCnt.eq(0));
            } else if (roomLogFilterDto.getGetThumb() == 1) {
                builder.and(roomUser.thumbCnt.ne(0));
            }
        }

        List<Tuple> tupleRoomLogs = queryFactory
                                        .select(roomUser.roomNo,
                                                roomUser.bookmarkYN,
                                                room.subjectNo,
                                                room.title,
                                                room.startTm,
                                                room.time,
                                                room.currentMember,
                                                selfEvaluation.score,
                                                roomUser.thumbCnt,
                                                roomUser.roomUserCd)
                                        .from(roomUser)
                                        .join(room).on(roomUser.roomNo.eq(room.roomNo))
                                        .join(selfEvaluation).on(roomUser.roomNo.eq(selfEvaluation.roomNo)
                                                                .and(roomUser.userId.eq(selfEvaluation.userId)))
                                        .where(builder)
                                        .orderBy(new OrderSpecifier(getDirection(pageable), room.startTm))
                                        .offset(pageable.getOffset())
                                        .limit(pageable.getPageSize() + 1)
                                        .fetch();

        return checkLastPage(pageable, tupleRoomLogs);
    }

    private Order getDirection(Pageable page) {
        // Pageable 객체에 정렬조건 null 값 체크
        if (!page.getSort().isEmpty()) {
            for (Sort.Order order : page.getSort()) {
                // DESC or ASC 를 가져온다.
                return order.getDirection().isAscending() ? Order.ASC : Order.DESC;
            }
        }
        return null;
    }

    // 무한 스크롤 방식 처리하는 메서드
    private Slice<RoomLogResponseDto> checkLastPage(Pageable pageable, List<Tuple> tupleResults) {
        boolean hasNext = false;

        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (tupleResults.size() > pageable.getPageSize()) {
            hasNext = true;
            tupleResults.remove(pageable.getPageSize());
        }

        //Tuple 데이터 -> RoomLogResponseDto로 변환
        List<RoomLogResponseDto> roomLogs = new ArrayList<>();
        for (Tuple roomLog : tupleResults) {
            roomLogs.add(RoomLogResponseDto.builder()
                    .roomNo(roomLog.get(roomUser.roomNo))
                    .isBookmark((roomLog.get(roomUser.bookmarkYN)=='Y')?true:false)
                    .subject(roomLog.get(room.subjectNo))
                    .title(roomLog.get(room.title))
                    .startTime(roomLog.get(room.startTm).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .time(roomLog.get(room.time))
                    .member(roomLog.get(room.currentMember))
                    .selfScore(roomLog.get(selfEvaluation.score))
                    .thumbCnt(roomLog.get(roomUser.thumbCnt))
                    .canRead(roomLog.get(roomUser.roomUserCd)==RoomUserCode.ROOM_USER_END.getCode()?true:false)
                    .build());
        }

        return new SliceImpl<>(roomLogs, pageable, hasNext);
    }
}
