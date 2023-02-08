package com.w6w.corns.dto.user;

import com.w6w.corns.domain.user.User;
import io.swagger.annotations.ApiModel;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value="유저 수정 요청 정보")
public class UserModifyRequestDto {

    private int userId;
    private String nickname;
}
