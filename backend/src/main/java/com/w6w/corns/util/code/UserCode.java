package com.w6w.corns.util.code;

public enum UserCode {

    USER_DEFAULT(8000), USER_UNREGISTER(8001), USER_SUSPEND(8002);

    private final int code;

    UserCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}