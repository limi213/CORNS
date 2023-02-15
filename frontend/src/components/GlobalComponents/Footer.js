import React, { useState, useEffect } from "react";

import logo from "assets/corns_logo.png";
import { Box } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
  EnvelopeFill,
} from "react-bootstrap-icons";
export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#ddd",
        width: "100%",
        height: "30vh",
        position: "absolute",
        transform: "translateY(-100%)",
        mt: '150px'
      }}
    >
      <Box
        sx={{
          mt: "32px",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            src={logo}
            alt="logo"
            css={css`
              width: 10vw;
            `}
          />
        </div>

        <div
          css={css`
            width: 25%;
            display: flex;
            justify-content: space-between;
          `}
        >
          <div>
            <Facebook
              css={css`
                color: #111;
                font-size: 28px;
                cursor: pointer;
              `}
            />
          </div>
          <div>
            <Instagram
              css={css`
                color: #111;
                font-size: 28px;
                cursor: pointer;
              `}
            />
          </div>
          <div>
            <Twitter
              css={css`
                color: #111;
                font-size: 28px;
                cursor: pointer;
              `}
            />
          </div>
          <div>
            <Pinterest
              css={css`
                color: #111;
                font-size: 28px;
                cursor: pointer;
              `}
            />
          </div>
          <div>
            <EnvelopeFill
              css={css`
                color: #111;
                font-size: 28px;
                cursor: pointer;
              `}
            />
          </div>
        </div>
        <p
          css={css`
            margin: 0;
          `}
        >
          Copyright 2023. CORNS all rights reserved.
        </p>
        <p
          css={css`
            margin: 0;
          `}
        >
          서울 강남구 테헤란로 212 (우)06220 (지번: 역삼동 718-5) 1202호 506팀{" "}
        </p>
      </Box>
    </Box>
  );
}
