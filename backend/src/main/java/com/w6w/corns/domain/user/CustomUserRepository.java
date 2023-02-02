package com.w6w.corns.domain.user;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.time.LocalDateTime;


public interface CustomUserRepository {
    Slice<User> findByFilterRegTmLessThanEqual(Pageable pageable, LocalDateTime baseTime, String filter, String keyword);
}
