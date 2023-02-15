import React, { useState } from "react";
import { Box, Button, Grid, Input, Modal, Typography } from "@mui/material";
import { XSquare } from "react-bootstrap-icons";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { toStringDate } from "store/reducers/roomFilterReducer";
import authHeader from "auth/authHeader";
import getRefreshToken from "auth/getRefreshToken";

function AddWordButton({ setBaseTime, reload, setReload }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [wordEng, setWordEng] = useState("");
  const [wordKor, setWordKor] = useState("");

  const onChangeWordEng = (e) => {
    setWordEng(e.target.value);
  };

  const onChangeWordKor = (e) => {
    setWordKor(e.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "10%",
    bgcolor: "background.paper",
    border: "3px solid #111",
    boxShadow: 24,
    p: "32px 0 200px",
    fontFamily: "Noto Sans KR",
  };

  const clickedSubmitButton = async () => {
    if (!wordEng) {
      window.alert("영어 단어를 입력해 주세요.");
      return;
    }
    const sendRequest = async () => {
      // console.log(`[add word] - eng: ${wordEng}, kor: ${wordKor}`);
      const response = await axios.post(
        `${process.env.REACT_APP_HOST}/word`,
        {
          userId: sessionStorage.getItem("userId"),
          wordEng: wordEng,
          wordKor: wordKor,
        },
        {
          headers: authHeader(),
          validateStatus: (status) =>
            status === 200 || status === 204 || status === 401,
        }
      );

      if (response.status === 401) {
        // console.log("unauthorized!-> refresh!");
        const refreshResponse = await getRefreshToken();

        if (refreshResponse === 200) {
          sendRequest();
        }
      } else if (response.status === 200) {
        return response;
      }
    };
    try {
      const submit = await sendRequest();
      // console.log(submit);
      if (submit.status === 200) {
        setWordEng("");
        setWordKor("");
        setBaseTime(toStringDate(new Date()));
        setReload(!reload);
        handleCloseModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="contained"
        sx={{
          border: "3px solid #111",
          borderRadius: "0",
          backgroundColor: "#3C90F2",
          fontFamily: "Noto Sans KR",
          color: "#111",
          "&:hover": {
            backgroundColor: "#1766C3",
          },
        }}
      >
        추가
      </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", width: "100%", mr: "10%", mb: "5%" }}>
            <Typography
              variant="h5"
              sx={{ ml: "32px", fontFamily: "Noto Sans KR" }}
            >
              단어 등록
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
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Grid
              item
              xs={5}
              sx={{
                boxShadow: "4px 4px 4px rgba(0,0,0,0.25)",
                border: "3px solid #111",
              }}
            >
              <Input
                placeholder="Word"
                value={wordEng}
                onChange={onChangeWordEng}
                rows={4}
                multiline={true}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  padding: "1rem 5.5rem 1rem 1rem",
                }}
              ></Input>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{
                boxShadow: "4px 4px 4px rgba(0,0,0,0.25)",
                border: "3px solid #111",
              }}
            >
              <Input
                placeholder="의미"
                value={wordKor}
                onChange={onChangeWordKor}
                rows={4}
                multiline={true}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  padding: "1rem 5.5rem 1rem 1rem",
                }}
              ></Input>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: "4%" }}>
            <Button
              onClick={clickedSubmitButton}
              variant="contained"
              sx={{
                border: "3px solid #111",
                borderRadius: "0",
                backgroundColor: "#3C90F2",
                fontFamily: "Noto Sans KR",
                color: "#111",
                "&:hover": {
                  backgroundColor: "#1766C3",
                },
              }}
            >
              등록하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddWordButton;
