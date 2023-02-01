package com.w6w.corns.util.code;

public enum RoomUserCode {

    ROOM_USER_WAITING(6000), ROOM_USER_CONVERSATION(6001), ROOM_USER_EXIT(6002), ROOM_USER_END(6003);

    private final int code;

    RoomUserCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}