import React from "react";
import RequestList from "./RequestList";

import { ChevronDoubleRight, ChevronDoubleLeft } from "react-bootstrap-icons";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
function FriendRequest() {
  const users = [
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "1번임",
      user_id: 1000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "2번임",
      user_id: 1000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "3번임",
      user_id: 1000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "4번임",
      user_id: 1000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "5번임",
      user_id: 1000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "6번임",
      user_id: 1000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "7번임",
      user_id: 1000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "8번임",
      user_id: 1000,
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "9번임",
      user_id: 1000,
    },
  ];

  return (
    <>
      <h3>친구신청</h3>

      <RequestList users={users} />
    </>
  );
}

export default FriendRequest;
