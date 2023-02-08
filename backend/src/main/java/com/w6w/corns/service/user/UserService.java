package com.w6w.corns.service.user;

import com.w6w.corns.dto.user.*;
import com.w6w.corns.dto.withdraw.WithdrawRequestDto;
import com.w6w.corns.util.PageableResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    //기본 회원가입 처리
    int signUp(UserJoinRequestDto requestUser) throws Exception;
    //이메일 중복 확인
    int validateDuplicateUser(String emails) throws Exception;
    //기본 로그인 처리
    UserDetailResponseDto login(UserLoginRequestDto requestUser) throws Exception;
    //로그인했을 때 로그인로그 남김
    void makeLoginLog(int userId) throws Exception;
    //accessToken, refreshToken 부여
    String[] giveToken(int userId) throws Exception;
    //refreshToken 가져오기
    String getRefreshToken(int userId) throws Exception;
    //user db에서 refreshToken 삭제
    void deleteRefreshToken(int userId) throws Exception;
    //userId로 상세 정보 갖는 dto 반환
    UserDetailResponseDto getUser(int userId) throws Exception;
    //email로 상세 정보 갖는 dto 반환
    UserDetailResponseDto findByEmail(String email) throws Exception;
    //비밀번호 인증
    boolean isSamePassword(UserLoginRequestDto requestUser) throws Exception;
    //비밀번호 변경 
    boolean updateUserPassword(UserPassModifyRequestDto requestDto) throws Exception;
    //닉네임, 이미지 수정
    void updateUserInfo(UserModifyRequestDto modifyRequestDto, MultipartFile multipartFile) throws Exception;
    //회원 상태코드 변경
    void updateUserCd(int userId, int userCd) throws Exception;
    //조건에 따른 객체 리스트 페이지처리
    PageableResponseDto findAllUserByCondition(Pageable pageable, String baseTime, String filter, String keyword) throws Exception;
    //회원 탈퇴
    void withdrawUser(WithdrawRequestDto requestDto) throws Exception;
    //출석경험치 확인 및 lastLoginTm 변경
    void checkAttendance(UserDetailResponseDto responseDto) throws Exception;
}
