import React, { useState, useEffect } from "react";
import useAxios from "auth/useAxios";
import UserProfile from "components/GlobalComponents/UserProfile";
import { Box, Typography } from "@mui/material";
import { XSquare } from "react-bootstrap-icons";
import FriendsBtn from "./FriendsBtn";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function UserProfileModal({ openModal, toId, handleCloseModal }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "45%",
    bgcolor: "background.paper",
    border: "3px solid #111",
    boxShadow: 24,
    p: "32px 0 200px",
  };

  const [user, setUser] = useState({});

  const [relation, setRelation] = useState(-1);
  const fromId = sessionStorage.getItem("userId");

  const { data, status, isLoading, sendRequest } = useAxios();

  useEffect(() => {
    if (!openModal) {
      return;
    }
    const apiUrl =
      fromId === toId.toString() ? `/${fromId}` : `/${fromId}/${toId}`;

    sendRequest({
      url: `${process.env.REACT_APP_HOST}/user/${apiUrl}`,
    });
  }, []);

  useEffect(() => {
    if (status === 200) {
      console.log(data);
      setUser(data.user);
      setRelation(data.relation);
    }
  }, [data]);

  if (!isLoading && status === 200) {
    const userInfo = data.user;

    return (
      <>
        <Box sx={style}>
          <Box sx={{ display: "flex", width: "100%"}}>
            <XSquare
              css={css`
                font-size: 30px;
                cursor: pointer;
                margin-left: 95%
              `}
              onClick={handleCloseModal}
            />
          </Box>

          <UserProfile user={userInfo} rankingList={userInfo.rank} />

          {relation > -1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: "4%" }}>
              <FriendsBtn
                fromId={fromId}
                toId={toId}
                status={relation}
                setRelation={setRelation}
              />
            </Box>
          )}
        </Box>
      </>
    );
  } else {
    return <p>loading 중...</p>;
  }
}

export default UserProfileModal;
