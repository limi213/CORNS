import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLogBookmarkListAxios } from "store/reducers/logBookmarkListReducer";

import LogHeader from "components/ConversationLog/LogHeader";
import LogList from "components/ConversationLog/LogList";

import { Table, TableBody, TableContainer, TableHead } from "@mui/material";

function LogBookmark() {
  const dispatch = useDispatch();
  const logs = useSelector(
    (state) => state.logBookmarkListReducer.logBookmarkList
  );
  const loading = useSelector(
    (state) => state.logBookmarkListReducer.isLogBookmarkListLoading
  );
  const sort = useSelector((state) => state.logBookmarkListReducer.sort);

  useEffect(() => {
    dispatch(getLogBookmarkListAxios(sort));
  }, [dispatch]);

  return (
    <>
      <h2>즐겨찾기</h2>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <LogHeader />
          </TableHead>
          <TableBody>{logs.length > 0 && <LogList logs={logs} />}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default LogBookmark;
