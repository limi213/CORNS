package com.w6w.corns.domain.user;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, CustomUserRepository {

    User findByEmail(String email);

    User findByUserId(int userId);

    List<User> findAll();

    @Query(value = "select rank() over(order by exp_total desc) from user where user_cd = 8000 and user_id=:userId", nativeQuery = true)
    int rankByExp(int userId);

    @Query(value = "select count(*) from user where user_cd = 8000", nativeQuery = true)
    int countAll();
}
