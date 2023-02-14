import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SubjectsContainer from "store/containers/SubjectsContainer";
import SelfEvaluationFilter from "components/ConversationLog/SelfEvaluationFilter";
import ThumbBadgeFilter from "components/ConversationLog/ThumbBadgeFilter";
import DropDown from "./DropDown";

import { logFilterActions } from "store/reducers/logFilterReducer";

import { Checkbox, Box, FormControlLabel, Button, Input } from "@mui/material";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function LogFilter() {
  const dispatch = useDispatch();
  const ddabongOptions = [
    { value: "2", label: "전체" },
    { value: "0", label: "없음" },
    { value: "1", label: "있음" },
  ];
  const selfEvaluationOptions = [
    { value: "6", label: "전체" },
    { value: "0", label: "자기평가 안 함" },
    { value: "1", label: "1개" },
    { value: "2", label: "2개" },
    { value: "3", label: "3개" },
    { value: "4", label: "4개" },
    { value: "5", label: "5개" },
  ];
  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(30);

  const getMintime = (e) => {
    setMinTime(() => e.target.value);
  };

  const getMaxtime = (e) => {
    setMaxTime(() => e.target.value);
  };

  const sendFilter = () => {
    checkFilter("min", minTime);
    checkFilter("max", maxTime);
  };

  const getStartDate = (e) => {
    checkFilter("startDate", e.target.value);
  };
  const getEndDate = (e) => {
    checkFilter("endDate", e.target.value);
  };
  const getThumb = (e) => {
    const thumb = e.value;
    checkFilter("thumb", thumb);
  };
  const getSelfEvaluation = (e) => {
    let selfEvaluation = e.map((e) => {
      return e.value;
    });

    if (selfEvaluation.includes("6")) {
      selfEvaluation = "0 1 2 3 4 5";
    } else {
      selfEvaluation = selfEvaluation.join(" ");
    }
    checkFilter("selfEvaluation", selfEvaluation);
  };

  const checkFilter = (content, e) => {
    if (content === "min") {
      dispatch(logFilterActions.modifyMinTime(e, "MODIFY_MIN_TIME"));
    } else if (content === "max") {
      dispatch(logFilterActions.modifyMaxTime(e, "MODIFY_MAX_TIME"));
    } else if (content === "startDate") {
      dispatch(logFilterActions.modifyStartDate(e, "MODIFY_START_DATE"));
    } else if (content === "endDate") {
      dispatch(logFilterActions.modifyEndDate(e, "MODIFY_END_DATE"));
    } else if (content === "thumb") {
      dispatch(logFilterActions.modifyThumb(e, "MODIFY_THUMB"));
    } else {
      dispatch(
        logFilterActions.modifySelfEvaluation(e, "MODIFY_SELF_EVALUATION")
      );
    }
  };
  return (
    <Box
      component="form"
      sx={{
        border: "3px solid #111",
        backgroundColor: "#FFD704",
        p: "32px",
        display: "flex",
      }}
    >
      <Box
        sx={{
          mr: "48px",
          pr: "48px",
          borderRight: "3px solid #111",
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "font-family: 'Noto Sans KR', sans-serif",
        }}
      >
        <p
          css={css`
            margin: 0 0 64px 0;
          `}
        >
          주제
        </p>
        <p
          css={css`
            margin: 0 0 64px 0;
          `}
        >
          시간
        </p>
        <p
          css={css`
            margin: 0 0 64px 0;
          `}
        >
          날짜
        </p>
        <p
          css={css`
            margin: 0 0 64px 0;
          `}
        >
          자기평가
        </p>
        <p>따봉뱃지</p>
      </Box>
      <Box>
        {/* 주제 */}
        <Box sx={{ mb: "48px", display: "flex" }}>
          <SubjectsContainer />
        </Box>

        {/* 시간 */}
        <Box sx={{ mb: "48px" }}>
          <span
            css={css`
              margin-right: 1rem;
            `}
          >
            최소시간(분)
          </span>
          <Input
            placeholder="5"
            sx={{
              backgroundColor: "#fff",
              border: "3px solid #111",
              pl: "1rem",
              mr: "1rem",
              width: "128px",
              height: "45px",
            }}
            onChange={getMintime}
          />
          <span
            css={css`
              margin-right: 1rem;
            `}
          >
            최대시간(분)
          </span>
          <Input
            placeholder="30"
            sx={{
              backgroundColor: "#fff",
              border: "3px solid #111",
              pl: "1rem",
              width: "128px",
              height: "45px",
            }}
            onChange={getMaxtime}
          />
          <Button
            variant="contained"
            sx={{
              ml: "16px",
              border: "3px solid #111",
              borderRadius: 0,
              backgroundColor: "#3C90F2",
              color: "#111",
              "&:hover": {
                backgroundColor: "#7DB6FA",
              },
            }}
            onClick={sendFilter}
          >
            적용
          </Button>
        </Box>

        {/* 날짜 */}
        <Box sx={{ mb: "48px" }}>
          <input
            type="date"
            css={css`
              height: 23px;
              padding: 10px;
              font-size: 14px;
              border: 3px solid #111;
            `}
            onChange={getStartDate}
          />
          <span
            css={css`
              margin: 20px;
              font-size: 20px;
            `}
          >
            ~
          </span>
          <input
            type="date"
            css={css`
              height: 23px;
              padding: 10px;
              font-size: 14px;
              border: 3px solid #111;
            `}
            onChange={getEndDate}
          />
        </Box>

        {/* 자기평가 */}
        <Box sx={{ mb: "48px", display: "flex" }}>
          <DropDown
            isSearchable
            isMulti
            placeHolder="자기평가 별점을 선택하세요."
            options={selfEvaluationOptions}
            onChange={getSelfEvaluation}
          />
          {/* <SelfEvaluationFilter /> */}
        </Box>

        {/* 따봉뱃지 */}
        <Box sx={{ display: "flex" }}>
          <span>
            <DropDown
              isSearchable
              placeHolder="따봉뱃지 여부를 선택하세요."
              options={ddabongOptions}
              onChange={getThumb}
            />
          </span>

          {/* <span>
          <select
            id="user-selection"
            onChange={(e) => console.log(e.target.value)}
            css={css`
              width: 20vw;
              height: 45px;
              box-sizing: border-box;
              border: 3px solid #111;
              border-radius: 0;
            `}
          >
            <option value="2">전체</option>
            <option value="1">있음</option>
            <option value="0">없음</option>
          </select>
        </span> */}
          {/* <FormControlLabel control={<Checkbox />} label="있음" />
        <FormControlLabel control={<Checkbox />} label="없음" /> */}
        </Box>

        {/* <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          variant="contained"
          sx={{
            border: "3px solid #111",
            borderRadius: "0",
            backgroundColor: "#3C90F2",
            color: "#111",
            "&:hover": {
              backgroundColor: "#1766C3",
            },
          }}
        >
          전체해제
        </Button>
      </Box> */}
      </Box>
    </Box>
  );
}

export default LogFilter;
