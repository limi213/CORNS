package com.w6w.corns.util.code;

public enum FriendLogCode {

    FRIEND_LOG_SEND(4000), FRIEND_LOG_ACCEPT(4001), FRIEND_LOG_REJECT(4002), FRIEND_LOG_DELETE(4003);

    private final int code;

    FriendLogCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}