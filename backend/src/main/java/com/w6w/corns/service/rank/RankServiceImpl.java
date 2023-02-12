package com.w6w.corns.service.rank;

import com.w6w.corns.domain.rank.RankRepository;
import com.w6w.corns.dto.rank.RankListResponseDto;
import com.w6w.corns.util.code.RankCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankServiceImpl implements RankService {

    private final RankRepository rankRepo;

    // 종류에 따라 랭킹 리스트 가져오기
    @Override
    public List<RankListResponseDto> getRankList(int type) {
        return rankRepo.findRankListByType(type, false);
    }

    // 각 랭킹 1등 리스트 가져오기
    @Override
    public List<RankListResponseDto> getRankHOF() {
        List<RankListResponseDto> rankHOFList = new ArrayList<>(4);

        // 공동 1등이 있는 경우 한 명만 보내기 위함
        for (int type = 1; type <= 4; type++) {
            RankListResponseDto ranker = rankRepo.findRankListByType(type, true).get(0);
            ranker.setRankType(type);
            rankHOFList.add(ranker);
        }

        return rankHOFList;
    }

}
