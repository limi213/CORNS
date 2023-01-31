import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import yellow_logo from "assets/corns_logo_yellow.png";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: "5%"
      }}
    >
      <Link to="/">
        <img
          src={yellow_logo}
          alt="corns-logo"
          css={css`
            height: 5rem;
          `}
        />
      </Link>
      <Box sx={{width: "60%", ml: "20%", mt: "5%"}}>
        <h2>죄송합니다.</h2>
        <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
        <p> 방문하시려는 페이지의 주소가 잘못 입력되었거나,</p>
        <p>페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</p>
        <p>입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
      </Box>
    </Box>
  );
}

export default NotFound;
