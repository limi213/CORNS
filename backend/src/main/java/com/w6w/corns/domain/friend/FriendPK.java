package com.w6w.corns.domain.friend;

import lombok.*;

import java.io.Serializable;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
@ToString
public class FriendPK implements Serializable {

    private int userIdA;

    private int userIdB;

}
