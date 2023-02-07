package com.w6w.corns.domain.user;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.time.LocalDateTime;


public interface CustomUserRepository {
    //필터 적용한 유저 검색 페이지네이션 처리
    Slice<User> findByFilterRegTmLessThanEqual(Pageable pageable, String baseTime, String filter, String keyword);
}
