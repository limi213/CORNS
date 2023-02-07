import React from "react";
import FriendBtnZero from "./FriendBtnZero";
import FriendBtnOne from "./FriendBtnOne";
import FriendBtnTwo from "./FriendBtnTwo";
import FriendBtnThree from "./FriendBtnThree";


function FriendsBtn({ fromId, toId, status, setRelation }) {
  switch (status) {
    // 아무것도 아닌 상태
    case 0:
      return <FriendBtnZero fromId={fromId} toId={toId} setRelation={setRelation} />
    
      // 내가 친구신청 건 상태 (친구 x)
      case 1:
      return <FriendBtnOne />
    
      // 친구 신청 받은 상태 (친구 x)
      case 2:
      return <FriendBtnTwo fromId={fromId} toId={toId} setRelation={setRelation} />
    
      // 이미 친구인 상태
      case 3:
      return <FriendBtnThree fromId={fromId} toId={toId} setRelation={setRelation} />
    
      default:
      return;
  }
}

export default FriendsBtn;
