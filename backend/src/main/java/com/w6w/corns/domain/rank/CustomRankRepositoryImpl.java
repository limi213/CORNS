package com.w6w.corns.domain.rank;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.w6w.corns.domain.user.QUser;
import com.w6w.corns.dto.rank.RankListResponseDto;
import com.w6w.corns.util.code.RankCode;

import javax.persistence.EntityManager;
import java.util.List;

public class CustomRankRepositoryImpl implements CustomRankRepository {

    private final JPAQueryFactory queryFactory;

    private QRank rank = QRank.rank;
    private QUser user = QUser.user;

    public CustomRankRepositoryImpl(EntityManager entityManager) {
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public List<RankListResponseDto> findRankListByType(int type, boolean onlyTop) {
        BooleanBuilder builder = new BooleanBuilder();

        //type
        switch (type) {
            case 1:
                builder.and(rank.rankCd.eq(RankCode.RANK_EXP.getCode()));
                break;
            case 2:
                builder.and(rank.rankCd.eq(RankCode.RANK_THUMB.getCode()));
                break;
            case 3:
                builder.and(rank.rankCd.eq(RankCode.RANK_SPEAKING.getCode()));
                break;
            case 4:
                builder.and(rank.rankCd.eq(RankCode.RANK_FRIEND.getCode()));
                break;
            default:
                break;
        }

        //onlyTop
        if (onlyTop) {
            builder.and(rank.ranking.eq(1));
        }

        return queryFactory
                .select(Projections.constructor(RankListResponseDto.class,
                        rank.rankCd.as("rankType"),
                        rank.ranking,
                        user.userId,
                        user.nickname,
                        user.imgUrl,
                        user.level.levelNo,
                        rank.value))
                .from(rank)
                .join(user).on(rank.userId.eq(user.userId))
                .where(builder)
                .limit(50)
                .fetch();
    }

}
