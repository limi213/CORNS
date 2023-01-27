package com.w6w.corns.domain.cal;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class CalTotalPK implements Serializable {

    private int userId;
    private int rankCd;
}
