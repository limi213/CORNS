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
    data: getData,
    status: getStatus,
    sendRequest: getRequest,
  } = useAxios();
  const { status: postStatus, sendRequest: postRequest } = useAxios();
  const [newFriend, setNewFriend] = useState(false);

  useEffect(() => {
    // 친구 목록 들어오면 읽었다고 보내기
    if (window.location.pathname.includes("community/friends")) {
      postRequest({
        url: `${
          process.env.REACT_APP_HOST
        }/notification/${sessionStorage.getItem("userId")}`,
        method: "POST",
      });
      setNewFriend(false);
    }
    // 이외의 라우터 들어가면 확인하기
    else {
      getRequest({
        url: `${
          process.env.REACT_APP_HOST
        }/notification/${sessionStorage.getItem("userId")}`,
      });
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (getStatus === 200 && getData.isExist) {
      setNewFriend(true);
      console.log(newFriend);
    }
  }, [getData]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ cursor: "pointer", display: "flex" }} onClick={handleClick}>
        <ProfileImg
          imgSrc={
            sessionStorage.getItem("imgUrl") !== "null"
              ? sessionStorage.getItem("imgUrl")
              : ""
          }
          nickname={sessionStorage.getItem("nickname")}
          width={"30px"}
        />
        {newFriend && (
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
            backgroundColor: "#fff",
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
        </Collapse>
      </ul>
    </>
  );
}

export default NavbarDropdown;
