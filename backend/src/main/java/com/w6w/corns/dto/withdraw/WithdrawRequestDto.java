package com.w6w.corns.dto.withdraw;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class WithdrawRequestDto {

    private int userId;

    private int withdrawNo;

    private String description;
}
