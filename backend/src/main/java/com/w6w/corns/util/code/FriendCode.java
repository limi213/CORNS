package com.w6w.corns.util.code;

public enum FriendCode {

    FRIEND_SEND_A2B(500), FRIEND_SEND_B2A(501), FRIEND_ACCEPT(502);

    private final int code;

    FriendCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}