package com.w6w.corns.service.user;

import com.w6w.corns.domain.explog.ExpLog;
import com.w6w.corns.domain.friend.FriendRepository;
import com.w6w.corns.domain.loginlog.LoginLogRepository;
import com.w6w.corns.domain.thumblog.ThumbLogRepository;
import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.explog.ExpLogResponseDto;
import com.w6w.corns.dto.loginlog.LoginLogSaveDto;
import com.w6w.corns.dto.user.*;
import com.w6w.corns.util.PageableResponseDto;
import com.w6w.corns.util.SHA256Util;
import com.w6w.corns.util.code.FriendCode;
import com.w6w.corns.util.code.UserCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final LoginLogRepository loginLogRepository;
    private final ThumbLogRepository thumbLogRepository;
    private final FriendRepository friendRepository;

    @Override
    @Transactional
    public int signUp(UserJoinRequestDto requestUser) throws Exception {

        //최종적으로 이메일 검증
        int result = validateDuplicateUser(requestUser.getEmail());

        if (result == 1) return -1;
         else {
             //암호화
            String salt = SHA256Util.generateSalt();
            String newPass = SHA256Util.getEncrypt(requestUser.getPassword(), salt);

            userRepository.save(
                    User.userRegister()
                            .email(requestUser.getEmail())
                            .nickname(requestUser.getNickname())
                            .password(newPass) //암호화된 비밀번호 저장
                            .salt(salt) 
                            .social(1) //기본 회원가입 사용자로 설정
                            .build()); //회원 저장
            return 1;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public int validateDuplicateUser(String email){
        User findUser = userRepository.findByEmail(email);
        if(findUser == null) return 0; //중복 x
        else return 1; //중복
    }


    @Override
    @Transactional(readOnly = true)
    public UserDetailResponseDto login(UserLoginRequestDto requestUser) throws Exception{

        //해당 이메일을 가진 객체를 db에서 찾음
        User user = userRepository.findByEmail(requestUser.getEmail());

        //탈퇴회원 및 이용정지회원은 나중에 처리하기
        //이메일, 비밀번호 일치 확인 && 회원코드 확인
        if(isSamePassword(requestUser) && user.getUserCd() == UserCode.USER_DEFAULT.getCode()){

            //로그인로그 insert
            makeLoginLog(user.getUserId());

            return getUser(user.getUserId());
        }
        return null;
    }
    @Override
    @Transactional
    public void makeLoginLog(int userId) throws Exception{

        //로그인로그 데이터 삽입
        LoginLogSaveDto loginLogSaveDto = LoginLogSaveDto.builder().userId(userId).build();
        loginLogRepository.save(loginLogSaveDto.toEntity());
    }
    @Override
    @Transactional(readOnly = true)
    public void updateLastLoginTm(int userId) throws Exception{
        
        //last_login_tm 변경
        User user = userRepository.findByUserId(userId);
        user.setLastLoginTm();
        userRepository.save(user);
        System.out.println("user = " + user);
    }

    @Override
    @Transactional
    public void saveRefreshToken(int userId, String refreshToken) throws Exception {
        User user = userRepository.findByUserId(userId);
        user.setRefreshToken(null);
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public String getRefreshToken(int userId) throws Exception {
        User user = userRepository.findByUserId(userId);
        return user.getRefreshToken();
    }

    @Override
    @Transactional
    public void deleteRefreshToken(int userId) throws Exception {
        User user = userRepository.findByUserId(userId);
        user.setRefreshToken(null);
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetailResponseDto getUser(int userId) throws Exception{
        User user = userRepository.findByUserId(userId);

        //발화량, 랭킹 나중에 추가
        long attendanceTotal = loginLogRepository.findByRegTmAndUserId(userId);
        long thumbTotal = thumbLogRepository.countByToUserId(userId);
        long friendTotal = friendRepository.countByUserIdAAndFriendCdOrUserIdBAndFriendCd(userId, FriendCode.FRIEND_ACCEPT.getCode(), userId, FriendCode.FRIEND_ACCEPT.getCode());

        UserDetailResponseDto responseDto = UserDetailResponseDto.fromEntity(user);
        responseDto.setAttendTotal(attendanceTotal);
        responseDto.setThumbTotal(thumbTotal);
        responseDto.setFriendTotal(friendTotal);

        return responseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetailResponseDto findByEmail(String email) throws Exception{
        User user = userRepository.findByEmail(email);
        return UserDetailResponseDto.fromEntity(user);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isSamePassword(UserLoginRequestDto requestUser) throws Exception {

        User user = userRepository.findByEmail(requestUser.getEmail());

        if(user != null){
            String userSalt = user.getSalt();

            //입력받은 user의 password 정보
            String inputPass = requestUser.getPassword();
            String newPass = SHA256Util.getEncrypt(inputPass, userSalt);

            if(newPass.equals(user.getPassword())) return true;
        }
        return false;
    }

    public boolean updateUserPassword(UserPassModifyRequestDto requestDto) throws Exception{

        User user = userRepository.findByUserId(requestDto.getUserId());

        //비밀번호 확인
        if(!isSamePassword(new UserLoginRequestDto(user.getEmail(), requestDto.getPassword()))) return false;

        //비밀번호 변경
        String salt = SHA256Util.generateSalt();
        String encryptPass = SHA256Util.getEncrypt(requestDto.getNewPassword(), salt);

        user.setPassword(encryptPass);
        user.setSalt(salt);
        userRepository.save(user);
        return true;
    }
    @Override
    @Transactional
    public void updateUserInfo(UserModifyRequestDto requestUser) throws Exception{

        System.out.println("requestUser = " + requestUser);
        User user = userRepository.findByUserId(requestUser.getUserId());

        //설정 안하면 null로 넘어오는지, 아니면 기존 내용이 넘어오는지 아마도 후자?!
        user.setNickname(requestUser.getNickname());
        user.setImgUrl(requestUser.getImgUrl());

        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateUserCd(int userId, int userCd) throws Exception{

        User user = userRepository.findByUserId(userId);
        user.setUserCd(userCd);
        userRepository.save(user);
    }

    @Override
    public PageableResponseDto findAllUserByCondition(Pageable pageable, String baseTime, String filter, String keyword) throws Exception {

        //baseTime -> LocalDate 타입으로
        LocalDateTime localDateTime = LocalDateTime.parse(baseTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Slice<User> slice = userRepository.findByFilterRegTmLessThanEqual(pageable, localDateTime, filter, keyword);

        List<UserListResponseDto> exps = new ArrayList<>();
        for(User user : slice.getContent())
            exps.add(UserListResponseDto.builder()
                            .userId(user.getUserId())
                            .imgUrl(user.getImgUrl())
                            .nickname(user.getNickname())
                            .level(user.getLevel().getLevelNo())
                            .build());

        return PageableResponseDto.builder()
                .list(exps)
                .hasNext(slice.hasNext())
                .build();
    }
}
