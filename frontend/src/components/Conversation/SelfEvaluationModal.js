import React from "react";

import { Box, Modal, Button } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { XSquare } from "react-bootstrap-icons";
import ParticipantList from "./ParticipantList";
import SelfEvaluation from "../../components/GlobalComponents/SelfEvaluation";

function SelfEvaluationModal({}) {
  const evaluationStyle = {
    display: "flex",
    justifyContent: "space-around",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
    bgcolor: "background.paper",
    border: "3px solid #111",
    boxShadow: 24,
    p: 4,
  };

  const participants = [
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "isk2",
      user_id: 100000,
      thumbs: 2,
      ignition: "3분 20초",
      script: "",
    },
    {
      img_url:
        "https://i.pinimg.com/564x/af/7b/de/af7bde50489a2cb932a98741b877704b.jpg",
      nickname: "haun",
      user_id: 100001,
      thumbs: 1,
      ignition: "4분",
      script: "",
    },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>평가모달 테스트</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={evaluationStyle}>
          <Box>
            <h1>따봉멤버 결과</h1>
            <ParticipantList participants={participants} />
            <SelfEvaluation />
          </Box>
          <XSquare />
        </Box>
      </Modal>
    </>
  );
}

export default SelfEvaluationModal;
