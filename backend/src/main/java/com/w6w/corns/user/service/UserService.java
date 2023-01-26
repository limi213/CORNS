package com.w6w.corns.user.service;

import com.w6w.corns.user.domain.User;
import com.w6w.corns.user.dto.LoginResponseDto;
import com.w6w.corns.user.dto.UserRequestDto;

public interface UserService {

    int signUp(UserRequestDto user) throws Exception;
    int validateDuplicateUser(String emails) throws Exception;
    LoginResponseDto login(UserRequestDto user) throws Exception;
    void updateLastLoginTm(int userId) throws Exception;
    int saveRefreshToken(int userId, String refreshToken) throws Exception;
    Object getRefreshToken(int userId) throws Exception;
    void deleteRefreshToken(int userId) throws Exception;

}
