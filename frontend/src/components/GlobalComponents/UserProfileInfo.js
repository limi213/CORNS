import React from 'react';

function UserProfileInfo({basicInfo}) {
    const {imgUrl, nickname, id, level, exp, friendCnt, totalDay, totalDdabong, totalTalk} = basicInfo

    return (
        <div>
            <img src={imgUrl} alt={nickname} />
            <div>{nickname}#{id}</div>
            <div>
                <span>Lv.{level}</span>
                <span>{exp}exp</span>
                <span>친구수{friendCnt}명</span>
            </div>
            <div>
                <span>누적 출석수 {totalDay}일</span>
                <span>누적 칭찬수 {totalDdabong}개</span>
                <span>누적 발화량수 {totalTalk}분</span>
            </div>
        </div>
    )
}

export default UserProfileInfo;