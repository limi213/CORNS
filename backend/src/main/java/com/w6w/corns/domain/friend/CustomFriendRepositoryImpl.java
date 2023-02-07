package com.w6w.corns.domain.friend;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.w6w.corns.domain.user.QUser;
import com.w6w.corns.dto.friend.FriendListRequestDto;
import com.w6w.corns.dto.friend.FriendListResponseDto;
import com.w6w.corns.util.code.FriendCode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class CustomFriendRepositoryImpl implements CustomFriendRepository {

    private final JPAQueryFactory queryFactory;

    private QFriend friend = QFriend.friend;
    private QUser user = QUser.user;

    public CustomFriendRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public Slice<FriendListResponseDto> findFriendByKeyword(FriendListRequestDto friendListRequestDto, int userId, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();

        // userId
        builder.and(friend.userIdA.eq(userId));

        // baseTime
        builder.and(friend.modTm.lt(LocalDateTime.parse(friendListRequestDto.getBaseTime(), DateTimeFormatter.ofPattern(("yyyy-MM-dd HH:mm:ss")))));

        // relation
        builder.and(friend.friendCd.eq(FriendCode.FRIEND_ACCEPT.getCode()));

        // filter
        if (friendListRequestDto.getKeyword() == null) friendListRequestDto.setKeyword("");
        if (friendListRequestDto.getFilter() == 0) {
            // 닉네임 검색
            builder.and(user.nickname.contains(friendListRequestDto.getKeyword()));
        } else {
            // 아이디 검색
            builder.and(user.userId.castToNum(Integer.class).stringValue().contains(friendListRequestDto.getKeyword()));
        }

        List<FriendListResponseDto> friendList = queryFactory
                                                    .select(Projections.constructor(FriendListResponseDto.class,
                                                                                    user.userId,
                                                                                    user.nickname,
                                                                                    user.imgUrl,
                                                                                    user.level.levelNo))
                                                    .from(friend)
                                                    .join(user).on(friend.userIdB.eq(user.userId))
                                                    .where(builder)
                                                    .offset(pageable.getOffset())
                                                    .limit(pageable.getPageSize() + 1)
                                                    .fetch();

        return checkLastPage(pageable, friendList);
    }

    // 무한 스크롤 방식 처리하는 메서드
    private Slice<FriendListResponseDto> checkLastPage(Pageable pageable, List<FriendListResponseDto> friendList) {
        boolean hasNext = false;

        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (friendList.size() > pageable.getPageSize()) {
            hasNext = true;
            friendList.remove(pageable.getPageSize());
        }

        return new SliceImpl<>(friendList, pageable, hasNext);
    }
}
