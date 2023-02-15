import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "components/GlobalComponents/Navbar";
import Footer from "components/GlobalComponents/Footer";
import useAxios from "auth/useAxios";
import ParticipantList from "components/Conversation/ParticipantList";
import SelfEvaluation from "components/GlobalComponents/SelfEvaluation";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function ResultEvolution({ match }) {
  const { roomNo } = match.params;
  const {
    data: resultData,
    status: resultStatus,
    isLoading: resultIsLoading,
    sendRequest: resetSendRequest,
  } = useAxios();
  const {
    data: roomData,
    status: roomStatus,
    isLoading: roomIsLoading,
    sendRequest: roomSendRequest,
  } = useAxios();
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    resetSendRequest({
      url: `${process.env.REACT_APP_HOST}/evaluation/thumb/${roomNo}`,
    });
  }, []);

  useEffect(() => {
    roomSendRequest({
      url: `${process.env.REACT_APP_HOST}/room/${roomNo}`,
    });
  }, []);

  const resultList = resultData.resultList;
  console.log(roomData);
  const logDetailUrl = `/conversationLog/logdetail/${roomNo}`;

  if (!roomIsLoading && !resultIsLoading && resultStatus === 200) {
    return (
      <div>
        <div
          css={css`
            margin: 0 105px;
            height: auto;
            min-height: 100%;
            padding-bottom: 30vh;
          `}
        >
          <Navbar />
          <div
            css={css`
              margin: 64px 0 0 0;
              border: 3px solid #111;
              padding: 64px 32px 32px;
            `}
          >
            <div
              css={css`
                margin-bottom: 64px;
                display: flex;
                justify-content: space-between;
              `}
            >
              <h1
                css={css`
                  margin: 0;
                `}
              >
                {roomData.room.room.title} 방의 평가 결과입니다.
              </h1>
              <div>
                <span>스크립트를 보기 원한다면?</span>
                <button
                  css={css`
                    border: 3px solid #111;
                    padding: 8px 16px;
                    margin-left: 16px;
                    font-size: 16px;
                    background-color: #67c73a;
                  `}
                >
                  <Link
                    to={logDetailUrl}
                    css={css`
                      text-decoration: none;
                      color: #111;
                    `}
                  >
                    쫑알로그로 이동하기
                  </Link>
                </button>
              </div>
            </div>
            <ParticipantList participants={resultList} myId={userId} />
            <SelfEvaluation roomNo={roomNo} />
            <p>(작성하지 않고 나가시면 쫑알로그에서 작성하실 수 있습니다.)</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <p>loading 중...</p>;
  }
}

export default ResultEvolution;
