package com.w6w.corns.dto.oauth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class GoogleUserDto {
    public String email;
    public String imgUrl;
}