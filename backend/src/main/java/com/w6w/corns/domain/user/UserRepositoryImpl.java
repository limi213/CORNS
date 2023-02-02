package com.w6w.corns.domain.user;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

public class UserRepositoryImpl implements CustomUserRepository{

    private final JPAQueryFactory jpaQueryFactory;
    public UserRepositoryImpl(EntityManager entityManager) {
        this.jpaQueryFactory = new JPAQueryFactory(entityManager);
    }
    @Override
    public Slice<User> findByFilterRegTmLessThanEqual(Pageable pageable, LocalDateTime baseTime, String filter, String keyword) {

        JPAQuery<User> jpaQuery = jpaQueryFactory
                .selectFrom(QUser.user)
                .where(condition(filter, keyword))
//                .where(regTm.lt(baseTime))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize()+1);

        List<User> list = jpaQuery.fetch();

        boolean hasNext = false;
        if(list.size() > pageable.getPageSize()){
            list.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(list, pageable, hasNext);
    }

    private BooleanExpression condition(String filter, String keyword){
        if(filter.equals("id")){
            int userId = Integer.parseInt(keyword);
             return QUser.user.userId.eq(userId);
        }
        return QUser.user.nickname.eq(keyword);
    }
}
