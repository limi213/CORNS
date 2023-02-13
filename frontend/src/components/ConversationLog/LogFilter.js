import React from "react";
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
    { value: "0", label: "0개" },
    { value: "1", label: "1개" },
    { value: "2", label: "2개" },
    { value: "3", label: "3개" },
    { value: "4", label: "4개" },
    { value: "5", label: "5개" },
  ];

  const getMintime = (e) => {
    checkFilter("min", e.target.value);
  };

  const getMaxtime = (e) => {
    checkFilter("max", e.target.value);
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
      }}
    >
      {/* 주제 */}
      <Box sx={{ mb: "48px", display: "flex" }}>
        <span
          css={css`
            margin-right: 64px;
          `}
        >
          주제
        </span>
        <SubjectsContainer />
      </Box>

      {/* 시간 */}
      <Box sx={{ mb: "48px" }}>
        <span
          css={css`
            margin-right: 64px;
          `}
        >
          시간
        </span>
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
      </Box>

      {/* 날짜 */}
      <Box sx={{ mb: "48px" }}>
        <span
          css={css`
            margin-right: 64px;
          `}
        >
          날짜
        </span>
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
        <span
          css={css`
            margin-right: 35px;
          `}
        >
          자기평가
        </span>
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
      <Box sx={{ mb: "48px", display: "flex" }}>
        <span
          css={css`
            margin-right: 64px;
          `}
        >
          따봉뱃지
        </span>
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

      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
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
      </Box>
    </Box>
  );
}

export default LogFilter;
