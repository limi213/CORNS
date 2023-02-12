package com.w6w.corns.service.rank;

import com.w6w.corns.dto.rank.RankListResponseDto;

import java.util.List;

public interface RankService {
    // 종류에 따라 랭킹 리스트 가져오기
    public List<RankListResponseDto> getRankList(int type);
    // 각 랭킹 1등 리스트 가져오기
    public List<RankListResponseDto> getRankHOF();
}
