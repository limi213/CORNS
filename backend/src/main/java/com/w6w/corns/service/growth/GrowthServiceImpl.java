package com.w6w.corns.service.growth;

import com.w6w.corns.domain.explog.ExpLog;
import com.w6w.corns.domain.explog.ExpLogRepository;
import com.w6w.corns.domain.loginlog.LoginLogRepository;
import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.explog.ExpLogRequestDto;
import com.w6w.corns.dto.explog.ExpLogResponseDto;
import com.w6w.corns.dto.level.LevelDto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.w6w.corns.util.PageableResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GrowthServiceImpl implements GrowthService {

    private final UserRepository userRepository;
    private final ExpLogRepository expLogRepository;
    private final LoginLogRepository loginLogRepository;

    public int calExpPercentile(int userId) throws Exception{

        //user에서 usercd 탈퇴, 정지를 제외한 나머지 사람들의 총 exp 순위
        int cntAll = userRepository.countAll();

        int rank = userRepository.rankByExp(userId);

        return rank / cntAll * 100;
    }

    public LevelDto getUserLevel(int userId) throws Exception{

        User user = userRepository.findByUserId(userId);
        return LevelDto.fromEntity(user.getLevel());
    }

    public PageableResponseDto getExpLogList(int userId, Pageable pageable, String baseTime) throws Exception{
        //baseTime -> LocalDate 타입으로
        LocalDateTime localDateTime = LocalDateTime.parse(baseTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Slice<ExpLog> slice = expLogRepository.findByUserIdAndRegTmLessThanEqual(userId, pageable, localDateTime);
        System.out.println("slice = " + slice.getContent());

        List<ExpLogResponseDto> users = new ArrayList<>();
        for(ExpLog expLog : slice.getContent())
            users.add(ExpLogResponseDto.fromEntity(expLog));

        return PageableResponseDto.builder().list(users).hasNext(slice.hasNext()).build();
    }

    //경험치 부여
    @Override
    @Transactional
    public void giveExp(ExpLogRequestDto expLogRequestDto){

        expLogRepository.save(expLogRequestDto.toEntity());
    }

    //출석률 반환
    @Override
    public int calAttendanceRate(int userId) throws Exception {

        long countPerMonth = loginLogRepository.findByRegTmAndUserIdPerMonth(userId);
        System.out.println(countPerMonth);

        double rate = (double)countPerMonth / 30;
        return (int)(rate * 100);
    }

    //주제별 비율 계산
    @Override
    public void calSubjectRaio(int userId) throws Exception {


    }
}
