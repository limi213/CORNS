package com.w6w.corns.util.code;

public enum FriendCode {

    FRIEND_SEND_A2B(5000), FRIEND_SEND_B2A(5001), FRIEND_ACCEPT(5002);

    private final int code;

    FriendCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}