import React, { useState } from "react";
import UserProfileModal from "components/GlobalComponents/UserProfileModal";
import { Box, Modal } from "@mui/material";

function UserNameTag({ nickname, user_id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box onClick={handleOpen} sx={{ cursor: "pointer" }}>
        {nickname}#{user_id}
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box>
          <UserProfileModal />
        </Box>
      </Modal>
    </>
  );
}

export default UserNameTag;
