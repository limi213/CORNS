package com.w6w.corns.user.domain;

import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    public void saveUser(){

        //given
        String email = "ssafy@ssafy";
        int social = 0;
        String nickname = "hi";
        LocalDateTime lastLoginTm = LocalDateTime.now();

        userRepository.save(User.builder()
                .userId(1)
                .email(email)
                .nickname(nickname)
                .lastLoginTm(lastLoginTm)
                .social(social)
                .build());

        //when
        List<User> userList = userRepository.findAll();

        //then
        User user = userList.get(0);

        assertThat(user.getUserId()).isEqualTo(1);
        assertThat(user.getEmail()).isEqualTo(email);
        assertThat(user.getSocial()).isEqualTo(social);
        assertThat(user.getNickname()).isEqualTo(nickname);

    }

    @Test
    public void login(){

        String email = "ssafy@ssafy";
//        String pass

    }
}
