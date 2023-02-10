import React, { useState } from "react";

import EditIcon from "@mui/icons-material/EditOutlined";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { Box, Button, Grid, Input, Modal, Typography } from "@mui/material";
import { XSquare } from "react-bootstrap-icons";
import { toStringDate } from "store/reducers/roomFilterReducer";

function EditWordButton({ word, setBaseTime, reload, setReload }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [eng, setWordEng] = useState(word.wordEng);
  const [kor, setWordKor] = useState(word.wordKor);

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
  };

  const clickedEditButton = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_HOST}/word`, {
        wordSq: word.wordSq,
        wordEng: eng,
        wordKor: kor,
      });
      if (response.status === 200) {
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
      <EditIcon
        color="warning"
        className="editButton"
        onClick={handleOpenModal}
      ></EditIcon>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", width: "100%", mr: "10%", mb: "5%" }}>
            <Typography variant="h5" sx={{ ml: "32px" }}>
              단어 수정
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
                value={eng}
                onChange={onChangeWordEng}
                rows={4}
                multiline={true}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  padding: "1rem 5.5rem 1rem 1rem",
                }}
                disabled="true"
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
                value={kor}
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
              onClick={clickedEditButton}
              variant="contained"
              sx={{
                border: "3px solid #111",
                borderRadius: "0",
                backgroundColor: "#67C73A",
                color: "#111",
                "&:hover": {
                  backgroundColor: "#45971E",
                },
              }}
            >
              수정하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default EditWordButton;
