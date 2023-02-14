import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import RequestForm from "./RequestForm";

// 아무것도 아닌 상태
// click하면 친구신청 Form
function FriendBtnZero({fromId, toId, setRelation}) {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  return (
    <>
      <Button
        sx={{
          backgroundColor: "#67C73A",
          color: "black",
          border: "2px solid #111",
          width: "30%",
          height: "50px",
          borderRadius: "0",
          fontWeight: "bold",
          fontSize: "18px",
          fontFamily: "Noto Sans KR",
          "&:hover": {
            backgroundColor: "#98DA7A",
          },
        }}
        onClick={handleOpenForm}
      >
        친구신청
      </Button>

      <Modal open={openForm} onClose={handleCloseForm}>
        <Box>
          <RequestForm fromId={fromId} toId={toId} handleCloseForm={handleCloseForm} setRelation={setRelation}/>
        </Box>
      </Modal>
    </>
  );
}

export default FriendBtnZero;
