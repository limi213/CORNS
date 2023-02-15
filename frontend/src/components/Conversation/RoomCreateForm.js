import * as React from "react";
import { useState } from "react";

import IsLogin from "auth/IsLogin";
import { FormControl, Box, Modal, Tooltip, Button } from "@mui/material";

import { PlusCircleFill, XSquare } from "react-bootstrap-icons";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import makeRoom from "components/Conversation/MakeRoom";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
// import { Radio } from "@mui/material";
import { useSelector } from "react-redux";

import MakeRoomSubjectBtn from "components/Conversation/MakeRoomSubjectBtn";

const style = {
  justifyContent: "space-between",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "50%",
  bgcolor: "background.paper",
  border: "3px solid #111",
  boxShadow: 24,
  p: "32px",
  fontFamily: "'Noto Sans KR', sans-serif",
};

export default function RoomCreateModal() {
  const subjects = useSelector((state) => state.subjectsReducer);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (IsLogin()) {
      setOpen(true);
    } else return alert("로그인이 필요한 서비스입니다.");
  };
  const handleClose = () => setOpen(false);

  // const handleChange = (e) => {
  //   setOpen(e.target.value);
  // };

  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [selectCount, setSelectCount] = useState("");
  
  const onChangeTopic=(e)=>{
    console.log(e.target.value)
    setTopic(e.target.value)
  }

  const subjectBtn = subjects.map((item) => (
    <MakeRoomSubjectBtn subject={item} key={item.subjectNo} onChange={onChangeTopic} />
  ));

  const onChangeSelectTime = (e) => {
    setSelectTime(e.target.value);
  };

  const onChangeSelectCount = (e) => {
    setSelectCount(e.target.value);
  };

  const goToMakeRoom = (e) => {
    if (!subject) {
      alert("제목을 입력하세요");
      return;
    }

    if(!topic){
      alert("주제를 선택하세요");
      return;
    }

    if (!selectTime) {
      alert("시간을 선택하세요");
      return;
    }

    if (!selectCount) {
      alert("인원을 선택하세요");
      return;
    }

    // makeRoom(subject, topic, selectTime, selectCount);
    makeRoom(subject, topic, selectTime, selectCount);

  }
  


  return (
    <div>
      <Tooltip title="쫑알룸 만들기" placement="top-start">
        <PlusCircleFill
          style={{
            fontSize: "64px",
            color: "#ffa903",
            position: "fixed",
            bottom: "40px",
            right: "105px",
            borderRadius: "40px",
            border: "3px solid #111",
            boxShadow: "4px 4px 4px rgb(0,0,0,.5)",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        />
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            css={css`
              padding: 0 32px;
              display: flex;
              justify-content: space-between;
            `}
          >
            <p
              css={css`
                font-size: 32px;
                font-weight: bold;
                margin: 0;
              `}
            >
              쫑알룸 만들기
            </p>
            <XSquare
              css={css`
                cursor: pointer;
                font-size: 28px;
              `}
              onClick={handleClose}
            />
          </div>

          <Box
            css={css`
              margin: 32px 80px 0;
            `}
          >
            <input
              css={css`
                border: 3px solid #111;
                width: 100%;
                height: 45px;
                padding-left: 16px;
                box-sizing: border-box;
              `}
              value={subject}
              onChange={({ target: { value } }) => setSubject(value)}
              placeholder="제목을 입력해주세요."
              maxlength='50'
            ></input>

            <div
              css={css`
                display: flex;
              `}
            >
              <div
                css={css`
                  margin-top: 32px;
                  font-size: 20px;
                  font-weight: bold;
                  padding-right: 40px;
                  margin-right: 40px;
                  border-right: 3px solid #111;
                `}
              >
                <p
                  css={css`
                    margin: 0;
                    margin-bottom: 80px;
                  `}
                >
                  주제
                </p>
                <p
                  css={css`
                    margin: 0;
                    margin-bottom: 80px;
                  `}
                >
                  시간
                </p>
                <p
                  css={css`
                    margin: 0;
                  `}
                >
                  인원
                </p>
              </div>
              <div>
                <Box
                  css={css`
                    margin-top: 40px;
                    margin-bottom: 72px;
                  `}
                >
                  {subjectBtn}
                </Box>
                <Box
                  css={css`
                    margin-bottom: 60px;
                  `}
                >
                  <FormControl
                    variant="standard"
                    sx={{
                      backgroundColor: "#fff",
                      border: "3px solid #111",
                      width: "50%",
                      height: "100%",
                      pl: "1%",
                      margin: "5px",
                    }}
                  >
                    <Select min-width="100px" onChange={onChangeSelectTime}>
                      <MenuItem value={5}>5분</MenuItem>
                      <MenuItem value={10}>10분</MenuItem>
                      <MenuItem value={15}>15분</MenuItem>
                      <MenuItem value={20}>20분</MenuItem>
                      <MenuItem value={25}>25분</MenuItem>
                      <MenuItem value={30}>30분</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  css={css`
                    // margin: 25px;
                    margin-top: 25px;
                  `}
                >
                  <FormControl
                    variant="standard"
                    sx={{
                      backgroundColor: "#fff",
                      border: "3px solid #111",
                      width: "50%",
                      height: "100%",
                      pl: "1%",
                      margin: "5px",
                    }}
                  >
                    <Select onChange={onChangeSelectCount} min-width="100px">
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <button
              css={css`
                float: right;
                padding: 8px 16px;
                font-size: 18px;
                font-weight: bold;
                border-radius: 0;
                border: 3px solid #111;
                background-color: #67c73a;
                cursor: pointer;
              `}
              variant="contained"
              onClick={goToMakeRoom}
            >
              방만들기
            </button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
