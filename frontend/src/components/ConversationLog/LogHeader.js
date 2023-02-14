import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableCell, Select, MenuItem } from "@mui/material";
import {
  logBookmarkListActions,
  getLogBookmarkListAxios,
} from "store/reducers/logBookmarkListReducer";
import { logFilterActions } from "store/reducers/logFilterReducer";

function LogHeader() {
  const dispatch = useDispatch();
  const [type, setType] = useState("startTm,DESC");

  // window.location.href 따라서 bookmark / 그냥 log -> dispatch 다르게
  // 그냥 로그일때는 LOGFILTER에 보내야함
  const changeHandler = (e) => {
    setType(e.target.value);
    if (window.location.href.includes("bookmarks")) {
      dispatch(logBookmarkListActions.toggleSortOption(e.target.value));
      dispatch(getLogBookmarkListAxios(e.target.value));
    } else if (window.location.href.includes("loglist")) {
      dispatch(logFilterActions.toggleSortOption(e.target.value));
    }
  };

  return (
    <TableRow>
      <TableCell
        width="10%"
        align="center"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Noto Sans KR",
        }}
      >
        북마크
      </TableCell>

      <TableCell
        width="10%"
        align="center"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Noto Sans KR",
        }}
      >
        주제
      </TableCell>

      <TableCell
        width="25%"
        align="center"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Noto Sans KR",
        }}
      >
        제목
      </TableCell>

      <TableCell width="15%" align="center">
        <Select
          value={type}
          variant="standard"
          size="small"
          onChange={changeHandler}
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Noto Sans KR",
          }}
        >
          <MenuItem value={"startTm,DESC"}>최신순</MenuItem>
          <MenuItem value={"startTm,ASC"}>오래된순</MenuItem>
        </Select>
      </TableCell>

      <TableCell
        width="10%"
        align="center"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Noto Sans KR",
        }}
      >
        대화시간
      </TableCell>

      <TableCell
        width="10%"
        align="center"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Noto Sans KR",
        }}
      >
        인원
      </TableCell>

      <TableCell
        width="10%"
        align="center"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Noto Sans KR",
        }}
      >
        자기평가
      </TableCell>

      <TableCell
        width="10%"
        align="center"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "Noto Sans KR",
        }}
      >
        따봉개수
      </TableCell>
    </TableRow>
  );
}

export default LogHeader;
