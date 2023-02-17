package com.w6w.corns.util.code;

public enum WordCode {

    WORD_TODO(7000), WORD_DONE(7001);

    private final int code;

    WordCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}