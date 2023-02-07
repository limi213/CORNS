package com.w6w.corns.domain.user;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Transactional
public class CustomUserRepositoryImpl implements CustomUserRepository{

    private QUser user = QUser.user;

    private final JPAQueryFactory jpaQueryFactory;

    public CustomUserRepositoryImpl(EntityManager entityManager) {
        this.jpaQueryFactory = new JPAQueryFactory(entityManager);
    }
    @Override
    public Slice<User> findByFilterRegTmLessThanEqual(Pageable pageable, String baseTime, String filter, String keyword) {

        BooleanBuilder builder = new BooleanBuilder();

        // baseTime
        builder.and(user.regTm.lt(LocalDateTime.parse(baseTime, DateTimeFormatter.ofPattern(("yyyy-MM-dd HH:mm:ss")))));

        // filter
        if (keyword == null) keyword = "";
        if (filter.equals("nickname")) {
            // 닉네임 검색
            builder.and(user.nickname.contains(keyword));
        } else {
            // 아이디 검색
            builder.and(user.userId.castToNum(Integer.class).stringValue().contains(keyword));
        }

        List<User> userList = jpaQueryFactory
                .select(user)
                .from(user)
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        return checkLastPage(pageable, userList);
    }

    // 무한 스크롤 방식 처리하는 메서드
    private Slice<User> checkLastPage(Pageable pageable, List<User> userList) {
        boolean hasNext = false;

        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (userList.size() > pageable.getPageSize()) {
            hasNext = true;
            userList.remove(pageable.getPageSize());
        }

        return new SliceImpl<>(userList, pageable, hasNext);
    }
}
