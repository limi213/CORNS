import React from "react";

import UserProfileModal from "components/GlobalComponents/UserProfileModal";
import { TableRow, TableCell, Modal } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function RankingTableItem({ item, ranking }) {
  const { img_url, nickname, user_id, level, value } = item;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>{ranking + 1}등</TableCell>
        <TableCell>
          <img
            src={img_url}
            alt={nickname}
            css={css`
              border-radius: 200px;
              width: 40px;
              height: 40px;
            `}
          />
        </TableCell>
        <TableCell onClick={handleOpen} sx={{ cursor: "pointer" }}>
          {nickname}#{user_id}
        </TableCell>
        <TableCell>Lv.{level}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserProfileModal />
      </Modal>
    </>
  );
}

export default RankingTableItem;
