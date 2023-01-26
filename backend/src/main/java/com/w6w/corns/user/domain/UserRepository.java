package com.w6w.corns.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    List<User> findAll();

    @Modifying(clearAutomatically = true)
    @Query("UPDATE User set refreshToken=:refreshToken where userId=:userId")
    int updateRefreshToken(int userId, String refreshToken);

    @Modifying(clearAutomatically = true)
    @Query("update User set social=:updateSocial where userId=:userId")
    int updateSocial(int userId, int updateSocial);


}
