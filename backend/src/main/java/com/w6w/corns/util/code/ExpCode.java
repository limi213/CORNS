package com.w6w.corns.util.code;

public enum ExpCode {

    EXP_ATTEND(3000), EXP_CONVERSATION(3001), EXP_THUMB(3002);

    private final int code;

    ExpCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}