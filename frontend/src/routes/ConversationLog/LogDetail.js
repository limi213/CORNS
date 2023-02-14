import React, { useState, useEffect } from "react";
import useAxios from "auth/useAxios";
import LogItem from "components/ConversationLog/LogItem";
import ParticipantScriptList from "components/ConversationLog/ParticipantScriptList";
import SelfEvaluation from "components/GlobalComponents/SelfEvaluation";

import { Table, TableBody, Box, Button } from "@mui/material";
import backgroundImage from "assets/backgroundImage.png";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const openScript = (scriptUrl) => {
  if (!scriptUrl) {
    return;
  }
  window.open(scriptUrl, "_blank");
};

function LogDetail({ match }) {
  const { roomNo } = match.params;
  const [log, setLog] = useState({});
  const [participants, setParticipants] = useState([]);

  const { data, status, isLoading, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest({
      url: `${
        process.env.REACT_APP_HOST
      }/corns-log/${roomNo}/${sessionStorage.getItem("userId")}`,
      validateStatus: [200, 500],
    });
  }, []);

  useEffect(() => {
    if (status === 200) {
      console.log(data);
      setLog(data.room);
      setParticipants(data.memberList);
    } else if (status === 500) {
      setLog({});
    }
  }, [status]);

  if (isLoading) {
    return <p>loading 중...</p>;
  } else if (log["canRead"]) {
    return (
      <>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <LogItem log={log} />
          </TableBody>
        </Table>
        <hr />

        <ParticipantScriptList participants={participants} />

        <hr />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "30px 0",
            gap: "5%",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#FFC804",
              color: "#111111",
              border: "2px solid #111",
              width: "30%",
              height: "50px",
            }}
            onClick={() => openScript(log.scriptUrl)}
          >
            전체 스크립트 보기
          </Button>
          <a
            href={log.scriptUrl}
            download
            type="text/html"
            target="_self"
            css={css`
              text-decoration: none;
              color: black;
              width: 30%;
              height 50px;
            `}
          >
            <Button
              sx={{
                backgroundColor: "#024A9E",
                color: "#111111",
                border: "2px solid #111",
                width: "100%",
                height: "50px",
              }}
            >
              전체 스크립트 다운
            </Button>
          </a>
        </Box>

        <Box
          sx={{
            width: "95.4%",
            padding: "32px",
            backgroundImage: `url(${backgroundImage})`,
            // position: "absolute",
            bottom: "0",
            left: "0",
          }}
        >
          <SelfEvaluation
            roomNo={log.roomNo}
            selfScore={log.selfScore}
            selfDesc={log.selfDesc}
          />
        </Box>
      </>
    );
  } else {
    return <p>확인할 수 없는 방입니다.</p>;
  }
}

export default LogDetail;
export { openScript };
