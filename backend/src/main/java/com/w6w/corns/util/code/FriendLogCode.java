package com.w6w.corns.util.code;

public enum FriendLogCode {

    FRIEND_LOG_SEND(400), FRIEND_LOG_ACCEPT(401), FRIEND_LOG_REJECT(402), FRIEND_LOG_DELETE(403);

    private final int code;

    FriendLogCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}