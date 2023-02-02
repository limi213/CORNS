package com.w6w.corns.service.user;

import com.w6w.corns.dto.user.*;

public interface UserService {

    int signUp(UserJoinRequestDto requestUser) throws Exception;
    int validateDuplicateUser(String emails) throws Exception;
    LoginResponseDto login(UserLoginRequestDto requestUser) throws Exception;
    void makeLoginLog(int userId) throws Exception;
    void updateLastLoginTm(int userId) throws Exception;
    int saveRefreshToken(int userId, String refreshToken) throws Exception;
    String getRefreshToken(int userId) throws Exception;
    void deleteRefreshToken(int userId) throws Exception;
    LoginResponseDto findByUserId(int userId) throws Exception;
    LoginResponseDto findByEmail(String email) throws Exception;
    boolean isSamePassword(UserLoginRequestDto requestUser) throws Exception;
    UserModifyRequestDto updateUserInfo(UserModifyRequestDto requestUser) throws Exception;
    void updateUserCd(int userId, int userCd) throws Exception;
}
