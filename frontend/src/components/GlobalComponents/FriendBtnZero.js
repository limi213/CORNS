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
          border: "3px solid #111",
          color: "#111111",
          backgroundColor: "#67C73A",
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
