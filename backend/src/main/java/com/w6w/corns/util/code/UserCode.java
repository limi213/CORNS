package com.w6w.corns.util.code;

public enum UserCode {

    USER_DEFAULT(800), USER_UNREGISTER(801), USER_SUSPEND(802);

    private final int code;

    UserCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}