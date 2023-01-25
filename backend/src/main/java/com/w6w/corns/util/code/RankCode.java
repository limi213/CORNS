package com.w6w.corns.util.code;

public enum RankCode {

    RANK_EXP(200), RANK_SPEAKING(201), RANK_THUMB(202), RANK_FRIEND(203);

    private final int code;

    RankCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}