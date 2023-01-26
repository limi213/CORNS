package com.w6w.corns.user.service;

import com.w6w.corns.user.domain.User;
import com.w6w.corns.user.domain.UserRepository;
import com.w6w.corns.user.dto.LoginResponseDto;
import com.w6w.corns.user.dto.UserRequestDto;
import com.w6w.corns.util.SHA256Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public int signUp(UserRequestDto user) throws Exception {

        //이메일 검증
        int result = validateDuplicateUser(user.getEmail());

        if (result == 1) return -1;
         else {
            user.setSocial(1); //기본 회원가입 설정
            userRepository.save(user.toEntity()); //회원 저장
            return 1;
        }
    }

    @Override
    public int validateDuplicateUser(String email){
        User findUser = userRepository.findByEmail(email);

        if(findUser == null) return 0; //중복 x
        else return 1; //중복
    }


    @Override
    @Transactional(readOnly = true)
    public LoginResponseDto login(UserRequestDto requestUser) throws Exception{

        //해당 이메일을 가진 객체를 db에서 찾음
        User user = userRepository.findByEmail(requestUser.getEmail());
        if(user != null){
            String userSalt = user.getSalt();

            //입력받은 user의 password 정보
            String inputPass = requestUser.getPassword();
            String newPass = SHA256Util.getEncrypt(inputPass, userSalt);

            //탈퇴회원 및 이용정지회원은 나중에 처리하기
            if(newPass.equals(user.getPassword()) && user.getUserCd() == 8000) {

                //따봉, 친구, 출석, 발화량 나중에 추가 필요
                return LoginResponseDto.builder()
                        .userId(user.getUserId())
                        .email(user.getEmail())
                        .nickname(user.getNickname())
                        .imgUrl(user.getImgUrl())
                        .expTotal(user.getExpTotal())
                        .level(user.getLevel().getLevelNo())
                        .social(user.getSocial())
                        .refreshToken(user.getRefreshToken())
                        .build();
            }
        }
        return null;
    }
    @Override
    public void updateLastLoginTm(int userId) throws Exception{
        User user = userRepository.getReferenceById(userId);
        user.updateLastLoginTM();
    }

    @Override
    public int saveRefreshToken(int userId, String refreshToken) throws Exception {
        return userRepository.updateRefreshToken(userId, refreshToken);
    }

    @Override
    public Object getRefreshToken(int userId) throws Exception {
        return null;
    }

    @Override
    public void deleteRefreshToken(int userId) throws Exception {

        userRepository.updateRefreshToken(userId, null);
    }

}
