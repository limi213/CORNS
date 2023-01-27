package com.w6w.corns.domain.friend;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class FriendPK implements Serializable {

    private int userIdA;

    private int userIdB;

}
