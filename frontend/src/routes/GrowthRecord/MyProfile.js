import React from "react";
import { useEffect } from "react";
import UserProfile from "../../components/GlobalComponents/UserProfile";

function MyProfile() {
  // 데이터 fetch (from_id == to_id)
  // dummy data
  const user = {
    basicInfo: {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      id: 1001,
      level: 30,
      exp: 1980,
      friendCnt: 10,
      totalDay: 13,
      totalDdabong: 4,
      totalTalk: 123,
    },
    rankingList: [
      { type: "sungsil", rank: 80, indicate: 1800 },
      { type: "ddabong", rank: null, indicate: 8 },
      { type: "suda", rank: 67, indicate: 387 },
      { type: "ingi", rank: null, indicate: 4 },
    ],
  };

  return (
    <>
      <h5>내 정보</h5>
      <UserProfile user={user} />
    </>
  );
}

export default MyProfile;
