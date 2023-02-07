package com.w6w.corns.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, CustomUserRepository {

    User findByEmail(String email);

    User findByUserId(int userId);

    //해당 유저의 누적 exp 순위
    @Query(value = "select rankNo " +
            "from (select user_id, rank() over(order by exp_total desc) as rankNo " +
            "from user where user_cd = 8000) as subrank where user_id=:userId", nativeQuery = true)
    int rankByExp(int userId);

    int countByUserCd(int userCd);
}
