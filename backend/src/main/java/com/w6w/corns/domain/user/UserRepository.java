package com.w6w.corns.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    User findByUserId(int userId);
    List<User> findAll();

    @Modifying(clearAutomatically = true)
    @Query("UPDATE User set refreshToken=:refreshToken where userId=:userId")
    int updateRefreshToken(int userId, String refreshToken);

    @Modifying(clearAutomatically = true)
    @Query("update User set social=:updateSocial where userId=:userId")
    int updateSocial(int userId, int updateSocial);

    @Modifying(clearAutomatically = true)
    @Query("update User set nickname=:updateNickname where userId=:userId")
    int updateNickname(int userId, String updateNickname);

    @Modifying(clearAutomatically = true)
    @Query("update User set imgUrl=:updateImgUrl where userId=:userId")
    int updateImgUrl(int userId, String updateImgUrl);

    @Modifying(clearAutomatically = true)
    @Query("update User set password=:updatePassword where userId=:userId")
    int updatePassword(int userId, String updatePassword);

    @Modifying(clearAutomatically = true)
    @Query("update User set userCd=:updateUserCd where userId=:userId")
    int updateUserCd(int userId, int updateUserCd);

}
