package com.w6w.corns.util.code;

public enum RankCode {

    RANK_EXP(2000), RANK_SPEAKING(2001), RANK_THUMB(2002), RANK_FRIEND(2003);

    private final int code;

    RankCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}