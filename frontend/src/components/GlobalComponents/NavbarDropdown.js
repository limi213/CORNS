import React, { useEffect, useState } from "react";
import useAxios from "auth/useAxios";
import { NavLink } from "react-router-dom";
import { Collapse, Box, Divider } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProfileImg from "./ProfileImg";

function NavbarDropdown() {
  const [open, setOpen] = React.useState(false);

  // 친구 신청 확인
  const {
    data: getFriendData,
    status: getFriendStatus,
    sendRequest: getFriendRequest,
  } = useAxios();
  const { status: postFriendStatus, sendRequest: postFriendRequest } = useAxios();
  const [newFriend, setNewFriend] = useState(false);

  useEffect(() => {
    // 친구 목록 들어오면 읽었다고 보내기
    if (window.location.pathname.includes("community/friends")) {
      postFriendRequest({
        url: `${
          process.env.REACT_APP_HOST
        }/notification`,
        method: "PUT",
        data: {
          userId: sessionStorage.getItem("userId"),
          read: 0
        }
      });
      setNewFriend(false);
    }
    // 이외의 라우터 들어가면 확인하기
    else {
      getFriendRequest({
        url: `${
          process.env.REACT_APP_HOST
        }/notification/friend/${sessionStorage.getItem("userId")}`,
      });
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (getFriendStatus === 200 && getFriendData.isExist) {
      setNewFriend(true);
    }
  }, [getFriendData]);


  // 초대 목록 확인
  const {
    data: getInviteData,
    status: getInviteStatus,
    sendRequest: getInviteRequest,
  } = useAxios();
  const { status: postInviteStatus, sendRequest: postInviteRequest } = useAxios();
  const [newInvite, setNewInvite] = useState(false);

  useEffect(() => {
    // 초대 목록 들어오면 읽었다고 보내기
    if (window.location.pathname.includes("community/invitation")) {
      postInviteRequest({
        url: `${
          process.env.REACT_APP_HOST
        }/notification`,
        method: "PUT",
        data: {
          userId: sessionStorage.getItem("userId"),
          read: 1
        }
      });
      setNewInvite(false);
    }
    // 이외의 라우터 들어가면 확인하기
    else {
      getInviteRequest({
        url: `${
          process.env.REACT_APP_HOST
        }/notification/room/${sessionStorage.getItem("userId")}`,
      });
    }
  }, [window.location.pathname]);


  useEffect(() => {
    if (getInviteStatus === 200 && getInviteData.isExist) {
      setNewInvite(true);
    }
  }, [getInviteData]);



  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ cursor: "pointer", display: "flex" }} onClick={handleClick}>
        <ProfileImg
          imgSrc={sessionStorage.getItem("imgUrl")}
          nickname={sessionStorage.getItem("nickname")}
          width={"30px"}
        />
        {(newFriend || newInvite) && (
          <Box
            sx={{
              borderRadius: "200px",
              backgroundColor: "red",
              width: "8px",
              height: "8px",
            }}
          />
        )}
      </Box>

      <ul
        css={css`
          list-style: none;
          background-color: white;
        `}
      >
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{
            position: "absolute",
            top: "50px",
            right: "3%",
            backgroundColor: "white",
            border: "3px solid #111",
            width: "120px",
          }}
        >
          <li
            css={css`
              padding: 5%;
            `}
          >
            <NavLink
              to="/mypage/changeProfile"
              style={{ textDecoration: "none", color: "black" }}
              css={css`
                font-weight: ${window.location.href.includes("mypage") &&
                "bold"};
              `}
            >
              마이페이지
            </NavLink>
          </li>

          <Divider />

          <li
            css={css`
              padding: 5%;
              display: flex;
            `}
          >
            <NavLink
              to="/community/friends"
              style={{ textDecoration: "none", color: "black" }}
              css={css`
                font-weight: ${window.location.href.includes(
                  "community/friends"
                ) && "bold"};
              `}
            >
              친구신청
            </NavLink>
            {newFriend && (
              <Box
                sx={{
                  borderRadius: "200px",
                  backgroundColor: "red",
                  width: "8px",
                  height: "8px",
                  ml: "5px",
                }}
              />
            )}
          </li>

          <Divider />

          <li
            css={css`
              padding: 5%;
              display: flex;
            `}
          >
            <NavLink
              to="/community/invitation"
              style={{ textDecoration: "none", color: "black" }}
              css={css`
                font-weight: ${window.location.href.includes(
                  "/community/invitation"
                ) && "bold"};
              `}
            >
              초대목록
            </NavLink>
            {newInvite && (
              <Box
                sx={{
                  borderRadius: "200px",
                  backgroundColor: "red",
                  width: "8px",
                  height: "8px",
                  ml: "5px",
                }}
              />
            )}
          </li>
        </Collapse>
      </ul>
    </>
  );
}

export default NavbarDropdown;
