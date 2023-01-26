import * as React from "react";
import SubjectBtn from "./SubjectBtn";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import { PlusCircleFill, XSquare } from "react-bootstrap-icons";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const style = {
  display: "flex",
  justifyContent: "space-around",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "50%",
  bgcolor: "background.paper",
  border: "3px solid #111",
  boxShadow: 24,
  p: 4,
};

const datas = [
  { id: 1, subject: "일상" },
  { id: 2, subject: "비즈니스" },
  { id: 3, subject: "소개팅" },
  { id: 4, subject: "오픽" },
  { id: 5, subject: "토스" },
  { id: 6, subject: "자유" },
];

const subjectBtn = datas.map((item) => (
  <SubjectBtn active={false} subject={item.subject} key={item.id} />
));

const times = [
  {
    label: "5분",
  },
  {
    label: "10분",
  },
  {
    label: "15분",
  },
  {
    label: "20분",
  },
  {
    label: "25분",
  },
  {
    label: "30분",
  },
];

const people = [{ label: "2명" }, { label: "3명" }, { label: "4명" }];

export default function RoomCreateModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Box>
            <input placeholder="제목을 입력해주세요."></input>
            <Box>주제{subjectBtn}</Box>
            <Box>
              시간
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={times}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="(분)" />}
              />
            </Box>
            <Box>
              인원
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={people}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="(명)" />}
              />
            </Box>
            <Button variant="contained">방만들기</Button>
          </Box>
          <XSquare
            css={css`
              cursor: pointer;
            `}
            onClick={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
