import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const {data, status, isLoading, sendRequest} = useAxios();

  useEffect(() => {
    if (!openModal) {
      return;
    }
    const apiUrl =
    fromId === toId.toString()
      ? `/${fromId}`
      : `/${fromId}/${toId}`;
    
    sendRequest({
      url: `${process.env.REACT_APP_HOST}/user/${apiUrl}`,
    })
  }, [])


  useEffect(() => {
    if (status === 200) {
      console.log(data);
      setUser(data.user);
      setRelation(data.relation);
    }
  }, [data])


  // dummy data
  const rankingList = [
    { type: "sungsil", rank: 80, indicate: 1800 },
    { type: "ddabong", rank: null, indicate: 8 },
    { type: "suda", rank: 67, indicate: 387 },
    { type: "ingi", rank: null, indicate: 4 },
  ];


  return (
    user && (
      <>
        <Box sx={style}>
          <Box sx={{ display: "flex", width: "100%", mr: "10%" }}>
            <Typography variant="h5" sx={{ ml: "32px"}}>
              {user.nickname} 페이지
            </Typography>
            <XSquare
              css={css`
                margin-left: 75%;
                font-size: 30px;
                cursor: pointer;
              `}
              onClick={handleCloseModal}
            />
          </Box>

          <UserProfile user={user} rank={rankingList} />

          {relation > -1 && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: "4%" }}
            >
              <FriendsBtn fromId={fromId} toId={toId} status={relation} setRelation={setRelation}/>
            </Box>
          )}
        </Box>

      </>
    )
  );
}

export default UserProfileModal;
