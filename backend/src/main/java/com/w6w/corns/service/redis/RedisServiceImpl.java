package com.w6w.corns.service.redis;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.w6w.corns.domain.notification.Notification;
import com.w6w.corns.domain.notification.NotificationRepository;
import com.w6w.corns.domain.room.Room;
import com.w6w.corns.domain.room.RoomRepository;
import com.w6w.corns.domain.roomuser.RoomUser;
import com.w6w.corns.domain.roomuser.RoomUserRepository;
import com.w6w.corns.domain.user.User;
import com.w6w.corns.domain.user.UserRepository;
import com.w6w.corns.dto.redis.SaveScriptRequestDto;
import com.w6w.corns.dto.redis.ScriptDto;
import com.w6w.corns.dto.room.response.RoomListResponseDto;
import com.w6w.corns.util.code.RoomUserCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {

    private final RedisTemplate redisTemplate;

    private final RoomUserRepository roomUserRepo;

    private final UserRepository userRepo;

    private final RoomRepository roomRepo;

    private final NotificationRepository notificationRepo;

    @Value("${upload.path}")
    private String uploadPath;

    @Value("${domain.save.path}")
    private String domainPath;

    // 스크립트 실시간 저장
    @Override
    public void saveScript(SaveScriptRequestDto saveScriptRequestDto) {
        String key = String.valueOf(saveScriptRequestDto.getRoomNo());
        ScriptDto value = ScriptDto.builder()
                                    .userId(saveScriptRequestDto.getUserId())
                                    .sentence(saveScriptRequestDto.getSentence())
                                    .time(saveScriptRequestDto.getTime())
                                    .build();

        ListOperations<String, ScriptDto> listOperations = redisTemplate.opsForList();
        listOperations.rightPush(key, value);
    }

    // 스크립트 파일 생성 및 업로드 후 url 반환
    @Override
    public void makeScriptFile(RoomListResponseDto roomInfo) {
        // 해당 방의 모든 스크립트 불러오기
        ObjectMapper objectMapper = new ObjectMapper();
        ListOperations<String, ScriptDto> listOperations = redisTemplate.opsForList();
        List<ScriptDto> scriptList = objectMapper.convertValue(Objects.requireNonNull(listOperations.range(String.valueOf(roomInfo.getRoom().getRoomNo()), 0, -1)),
                                                                new TypeReference<List<ScriptDto>>() {});

        // ---------------------------------------------------------------------------------------

        //HTML 문법 텍스트
        String ENCODE = "<meta charset=\"utf-8\">";
        String TITLE = "<h1/>";
        String SUBTITLE = "<h2/>";
        String SCRIPT = "<h3/>";
        String LINE = "<hr/>";
        String ENTER = "<br>";
        String CENTER_START = "<center>";
        String CENTER_END = "</center>";
        String ICON_SUBJECT = "\uD83D\uDCAC";
        String ICON_TIME = "⏱";
        String ICON_MEMBER = "\uD83D\uDE0A";
        String ICON_SPEAK = "\uD83D\uDCE2 : ";
        String[] COLOR = {"<span style='background-color: #ffdce0'>",
                            "<span style='background-color: #fff5b1'>",
                            "<span style='background-color: #dcffe4'>",
                            "<span style='background-color: #e1daf0'>"};
        Map<Integer, String> BACKGROUND_START = new HashMap<>();
        String BACKGROUND_END = "</span>";

        // 스크립트 공통 텍스트(방 정보) 세팅
        StringBuilder roomInfoText = new StringBuilder();
        roomInfoText.append(ENCODE);
        roomInfoText.append(CENTER_START).append(TITLE).append("[ ").append(roomInfo.getRoom().getTitle()).append(" ]").append(ENTER);
        roomInfoText.append(SUBTITLE).append(ICON_SUBJECT).append(roomInfo.getSubject().getValue())
                    .append(" | ").append(ICON_TIME).append(roomInfo.getRoom().getTime())
                    .append(" | ").append(ICON_MEMBER).append(roomInfo.getRoom().getCurrentMember()).append("명").append(ENTER).append(CENTER_END);
        roomInfoText.append(ENTER).append(LINE).append(ENTER).append(SCRIPT);

        // 해당 방 roomUser 리스트, user 정보 가져오기
        List<RoomUser> roomUserList = roomUserRepo.findStartRoomUserInRoom(roomInfo.getRoom().getRoomNo(), RoomUserCode.ROOM_USER_END.getCode());
        Map<Integer, User> userInfoList = new HashMap<>();

        Map<Integer, StringBuilder> scriptText = new HashMap<>(); // key : 개인 스크립트는 userId, 합본은 0
        Map<Integer, Integer> scriptSize = new HashMap<>();
        AtomicInteger scriptSizeAll = new AtomicInteger();

        for (int i = 0; i < roomUserList.size(); i++) {
            int userId = roomUserList.get(i).getUserId();
            userInfoList.put(userId, userRepo.findById(userId).get());
            BACKGROUND_START.put(userId, COLOR[i]);
            scriptText.put(userId, new StringBuilder(roomInfoText.toString()));
            scriptSize.put(userId, 0);
        }
        scriptText.put(0, new StringBuilder(roomInfoText.toString()));

        // HTML 문법으로 스크립트 저장
        scriptList.stream().forEach(script -> {
            int userId = script.getUserId();
            StringBuilder sentence = new StringBuilder().append(userInfoList.get(userId).getNickname()).append("#").append(userId)
                                                        .append(ICON_SPEAK).append(script.getSentence());
            scriptText.put(0, scriptText.get(0).append(BACKGROUND_START.get(userId))
                                                .append(sentence.toString())
                                                .append(BACKGROUND_END).append(ENTER));
            scriptText.put(userId, scriptText.get(userId).append(sentence.toString()).append(ENTER));

            int size = script.getSentence().length();
            scriptSizeAll.addAndGet(size);
            scriptSize.put(userId, scriptSize.get(userId) + size);
        });
        
        // HTML 파일로 업로드
        // -- 개인 스크립트
        for (RoomUser roomUser : roomUserList) {
            uploadScriptFile(roomUser.getRoomNo(), roomUser.getUserId(), scriptText.get(roomUser.getUserId()).toString());

            String scriptUrl = domainPath + "/scripts/" + roomInfo.getRoom().getRoomNo() + "_" + roomUser.getUserId() + ".html";
            roomUser.setScriptUrl(scriptUrl);

            double scriptPerc = (double)scriptSize.get(roomUser.getUserId()) / scriptSizeAll.get() * 100;
            int speakingSec = (int)Math.round((roomInfo.getRoom().getTime()* 60) * scriptPerc / 100);
            roomUser.setSpeakingSec(speakingSec);

            User user = userInfoList.get(roomUser.getUserId());
            user.setSpeakingTotal(user.getSpeakingTotal()+speakingSec);
            userRepo.save(user);
        }
        roomUserRepo.saveAll(roomUserList);

        // -- 합본 스크립트
        uploadScriptFile(roomInfo.getRoom().getRoomNo(), 0, scriptText.get(0).toString());

        String scriptUrl = domainPath + "/scripts/" + roomInfo.getRoom().getRoomNo() + "_" + 0 + ".html";
        Room room = roomRepo.findById(roomInfo.getRoom().getRoomNo()).get();
        room.setScriptUrl(scriptUrl);
        roomRepo.save(room);
    }

    // 스크립트 파일 업로드
    public void uploadScriptFile(int roomNo, int userId, String scriptText) {
        String saveDir = uploadPath + "/scripts/";
        String saveUrl = saveDir + roomNo + "_" + userId + ".html";

        try {
            // 파일 객체 생성
            File fileDir = new File(saveDir);
            File file = new File(saveUrl);

            if (!fileDir.exists()) fileDir.mkdirs();
            FileWriter fw = new FileWriter(file);

            BufferedWriter writer = new BufferedWriter(fw);
            writer.write(scriptText);
            writer.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 새 알림 여부 조회
    @Override
    public boolean isExistNewNotify(int userId) {
        // Redis에 있으면 해당 값 반환, 없으면 MySQL에서 가져온 뒤 반환
        boolean isExist = false;
        String key = "notification";
        String hashKey = String.valueOf(userId);

        Object redisResult = redisTemplate.opsForHash().get(key, hashKey);
        if (redisResult != null) {
            if ((char)redisResult == 'Y') {
                isExist = true;
            } else {
                isExist = false;
            }
        } else {
            Notification notification = notificationRepo.findById(userId).get();
            redisTemplate.opsForHash().put(key, hashKey, notification.getNotificationYN());

            if (notification.getNotificationYN() == 'Y') {
                isExist = true;
            } else {
                isExist = false;
            }
        }

        return isExist;
    }

    // 알림 상태 갱신
    @Override
    public void updateNotify(int userId, boolean isRegist) {
        // Redis, MySQL 모두 적용
        String key = "notification";
        String hashKey = String.valueOf(userId);
        char value = isRegist?'Y':'N';

        redisTemplate.opsForHash().put(key, hashKey, value);
        Notification notification = notificationRepo.findById(userId).get();
        notification.setNotificationYN(value);
        notificationRepo.save(notification);
    }

}
