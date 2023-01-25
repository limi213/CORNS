package com.w6w.corns.util.code;

public enum ExpCode {

    EXP_ATTEND(300), EXP_CONVERSATION(301), EXP_THUMB(302);

    private final int code;

    ExpCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}