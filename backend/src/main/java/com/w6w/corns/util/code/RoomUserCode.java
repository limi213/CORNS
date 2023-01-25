package com.w6w.corns.util.code;

public enum RoomUserCode {

    ROOM_USER_WAITING(600), ROOM_USER_CONVERSATION(601), ROOM_USER_EXIT(602);

    private final int code;

    RoomUserCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}