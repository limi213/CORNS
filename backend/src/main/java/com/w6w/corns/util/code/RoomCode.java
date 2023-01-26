package com.w6w.corns.util.code;

public enum RoomCode {

    ROOM_WAITING(1000), ROOM_START(1001), ROOM_END(1002);

    private final int code;

    RoomCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}