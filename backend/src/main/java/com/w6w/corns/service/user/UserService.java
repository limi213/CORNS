package com.w6w.corns.service.user;

import com.w6w.corns.dto.user.LoginResponseDto;
import com.w6w.corns.dto.user.UserRequestDto;

public interface UserService {

    int signUp(UserRequestDto user) throws Exception;
    int validateDuplicateUser(String emails) throws Exception;
    LoginResponseDto login(UserRequestDto user) throws Exception;
    void updateLastLoginTm(int userId) throws Exception;
    int saveRefreshToken(int userId, String refreshToken) throws Exception;
    Object getRefreshToken(int userId) throws Exception;
    void deleteRefreshToken(int userId) throws Exception;

}
