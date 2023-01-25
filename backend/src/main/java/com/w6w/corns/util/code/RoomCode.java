package com.w6w.corns.util.code;

public enum RoomCode {

    ROOM_WAITING(100), ROOM_START(101), ROOM_END(102);

    private final int code;

    RoomCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}