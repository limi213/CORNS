import React, { useState, useEffect } from "react";
import useAxios from "auth/useAxios";
import axios from "axios";
import LogItem from "components/ConversationLog/LogItem";
import ParticipantScriptList from "components/ConversationLog/ParticipantScriptList";
import SelfEvaluation from "components/GlobalComponents/SelfEvaluation";

import { Table, TableBody, Box, Button } from "@mui/material";
import backgroundImage from "assets/backgroundImage.png";

// open handler
const openScript = (scriptUrl) => {
  if (!scriptUrl) {
    return;
  }
  window.open(scriptUrl, "_blank");
};

// download handler
const downloadScript = async (scriptUrl, roomNo, userId) => {
  if (!scriptUrl) {
    return;
  }
  window.open(
    `${process.env.REACT_APP_HOST}/corns-log/script/${roomNo}/${userId}`,
    "_blank"
  );
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
      setLog(false);
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

        <ParticipantScriptList
          roomNo={log.roomNo}
          participants={participants}
        />

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
              borderRadius: "0",
              fontWeight: "bold",
              fontSize: "18px",
              fontFamily: "Noto Sans KR",
              "&:hover": {
                backgroundColor: "#FFD704",
              },
            }}
            onClick={() => openScript(log.scriptUrl)}
          >
            전체 스크립트 보기
          </Button>

          <Button
            sx={{
              backgroundColor: "#024A9E",
              color: "white",
              border: "2px solid #111",
              width: "30%",
              height: "50px",
              borderRadius: "0",
              fontWeight: "bold",
              fontSize: "18px",
              fontFamily: "Noto Sans KR",
              "&:hover": {
                backgroundColor: "#1766C3",
              },
            }}
            onClick={() => downloadScript(log.scriptUrl, roomNo, 0)}
          >
            전체 스크립트 다운
          </Button>
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
  } else if (log) {
    return <p>중도퇴장하여 확인할 수 없는 방입니다.</p>;
  } else {
    return <p>확인할 수 없는 방입니다.</p>;
  }
}

export default LogDetail;
export { openScript, downloadScript };
