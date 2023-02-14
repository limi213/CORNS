import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogFilter from "components/ConversationLog/LogFilter";
import LogHeader from "components/ConversationLog/LogHeader";
import LogList from "components/ConversationLog/LogList";

import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { getLogListAxios } from "store/reducers/logListReducer";

function Log() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.logListReducer.isLogListLoading);
  const filter = useSelector((state) => state.logFilterReducer);
  const logs = useSelector((state) => state.logListReducer.logList);

  useEffect(() => {
    dispatch(getLogListAxios(filter));
  }, [dispatch, filter]);

  return (
    <>
      <h2>쫑알로그</h2>
      
      <LogFilter/>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <LogHeader />
          </TableHead>
          <TableBody>
            <LogList logs={logs} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Log;
