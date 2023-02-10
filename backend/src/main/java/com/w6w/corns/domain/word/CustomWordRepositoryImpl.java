package com.w6w.corns.domain.word;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.w6w.corns.domain.room.Room;
import com.w6w.corns.util.code.WordCode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Transactional
public class CustomWordRepositoryImpl implements CustomWordRepository {

    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;

    private QWord word = QWord.word;

    public CustomWordRepositoryImpl(EntityManager em) {
        this.em = em;
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Slice<Word> searchBySlice(int userId, String baseTime, int wordStatus, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();

        // userId
        builder.and(word.userId.eq(userId));

        // baseTime
        builder.and(word.modTm.lt(LocalDateTime.parse(baseTime, DateTimeFormatter.ofPattern(("yyyy-MM-dd HH:mm:ss")))));

        // wordStatus
        if (wordStatus == 1) {
            builder.and(word.wordCd.eq(WordCode.WORD_TODO.getCode()));
        } else if (wordStatus == 2) {
            builder.and(word.wordCd.eq(WordCode.WORD_DONE.getCode()));
        }

        List<Word> words = jpaQueryFactory.selectFrom(word)
                .where(builder)
                .orderBy(word.wordEng.asc()) // 사전순 정렬
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        return checkLastPage(pageable, words);
    }

    // 무한 스크롤 방식 처리하는 메서드
    private Slice<Word> checkLastPage(Pageable pageable, List<Word> results) {

        boolean hasNext = false;

        // 조회한 결과 개수가 요청한 페이지 사이즈보다 크면 뒤에 더 있음, next = true
        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }

        return new SliceImpl<>(results, pageable, hasNext);
    }

}
