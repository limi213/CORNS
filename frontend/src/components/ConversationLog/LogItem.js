import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getLogBookmarkListAxios } from "store/reducers/logBookmarkListReducer";
import { Link } from "react-router-dom";
import { TableRow, TableCell } from "@mui/material";
import {
  BookmarkStar,
  BookmarkStarFill,
  Star,
  HandThumbsUp,
} from "react-bootstrap-icons";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 즐겨찾기 등록 / 해제 patch
// doRegister: true -> 등록
// doRegister: false -> 해제
const toggleBookmark = async (roomNo, userId, doRegister) => {
  console.log("toggle!", doRegister)
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_HOST}/corns-log/bookmark`,
      {
        roomNo,
        userId,
        doRegister,
      }
    );
    if (response.status === 200) {
      return doRegister;
    }
  } catch (e) {
    console.log(e);
  }
};


function LogItem({ log }) {
  const {
    roomNo,
    isBookmark,
    subject,
    title,
    startTime,
    time,
    member,
    selfScore,
    thumbCnt,
    canRead,
  } = log;

  const logUrl = `/conversationLog/logdetail/${roomNo}`;
  const subjectString = (subject) => {
    switch (subject) {
      case 1:
        return "일상";
      case 2:
        return "비즈니스";
      case 3:
        return "시험";
      case 4:
        return "소개팅";
      case 5:
        return "자유";
      default:
        return "";
    }
  };

  const dispatch = useDispatch();
  const bookmarkSort = useSelector((state) => state.logBookmarkListReducer.sort);

  const [bookmarkState, setBookmarkState] = useState(false);

  useEffect(() => {
    setBookmarkState(isBookmark)
  }, [log])


  // 북마크 삭제 / 추가 handler
  const onToggleHandler = async () => {   
    if (!canRead) {
      return;
    }
    
    const res = await toggleBookmark(roomNo, sessionStorage.getItem("userId"), !bookmarkState);
    setBookmarkState(res)

    // 즐겨찾기 page일때만 갱신
    if (window.location.pathname.includes("bookmarks")) {
      dispatch(getLogBookmarkListAxios(bookmarkSort));
    }
  };

  return (
    <>
      <TableRow
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        
        // canread -> blur
        css={css`
          filter: ${!canRead ? "grayscale(70%) blur(2px)" : "none"};
        `}
      >

        {/* 북마크 */}
        <TableCell
          component="th"
          scope="row"
          width="10%"
          align="center"
          sx={{ fontSize: "25px", color: "#3c90f2"}}
          css={css`cursor: ${canRead ? "pointer" : "cursor"}`}
          onClick={onToggleHandler}
        >
          {bookmarkState ? <BookmarkStarFill /> : <BookmarkStar />}
        </TableCell>

        {/* 주제 */}
        <TableCell width="10%" align="center">
          <div
            css={css`
              border: 2px solid #111111;
              background: #ffa903;
              text-align: center;
              width: 100%;
            `}
          >
            {subjectString(subject)}
          </div>
        </TableCell>

        {/* 제목 */}
        <TableCell width="25%" align="center">
          {window.location.href.includes("logdetail") || canRead === false ? (
            title
          ) : (
            <Link
              to={logUrl}
              style={{ textDecoration: "none", color: "black" }}
            >
              {title}
            </Link>
          )}
        </TableCell>

        {/* 날짜 */}
        <TableCell width="15%" align="center">
          {startTime}
        </TableCell>

        {/* 대화시간 */}
        <TableCell width="10%" align="center">
          <div
            css={css`
              border: 2px solid #111111;
              background: #3c90f2;
              color: white;
              text-align: center;
              width: 100%;
            `}
          >
            {time}분
          </div>
        </TableCell>

        {/* 인원 */}
        <TableCell width="10%" align="center">
          {member}명
        </TableCell>

        {/* 자기평가 */}
        <TableCell width="10%" align="center">
          <div
            css={css`
              border: 2px solid #111111;
              text-align: center;
              width: 100%;
            `}
          >
            <Star
              css={css`
                font-size: 17px;
              `}
            />

            {selfScore}
          </div>
        </TableCell>

        {/* 따봉개수 */}
        <TableCell width="10%" align="center">
          <div
            css={css`
              border: 2px solid #111111;
              text-align: center;
              width: 100%;
            `}
          >
            <HandThumbsUp
              css={css`
                font-size: 17px;
              `}
            />
            {thumbCnt}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}

export default LogItem;
