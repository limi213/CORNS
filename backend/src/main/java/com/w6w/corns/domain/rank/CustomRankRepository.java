package com.w6w.corns.domain.rank;

import com.w6w.corns.dto.rank.RankListResponseDto;
import java.util.List;

public interface CustomRankRepository {
    List<RankListResponseDto> findRankListByType(int type, boolean onlyTop);
}
