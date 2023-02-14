import React, { useState } from "react";
import UserProfileModal from "components/GlobalComponents/UserProfileModal";
import { Box, Modal } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function UserNameTag({ nickname, userId }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Box
        onClick={handleOpenModal}
        sx={{
          cursor: "pointer",
        }}
      >
        <span css={css`font-weight: bold;`}>{nickname}</span> #{userId}
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box>
          <UserProfileModal
            openModal={openModal}
            toId={userId}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      </Modal>
    </>
  );
}

export default UserNameTag;
