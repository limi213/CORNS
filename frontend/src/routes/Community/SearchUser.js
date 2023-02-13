import React, { useState, useEffect } from "react";
import useAxios from "auth/useAxios";
import { toStringDate } from "store/reducers/roomFilterReducer";
import SearchComp from "components/GlobalComponents/SearchComp";
import UserList from "components/Community/UserList";

import Box from "@mui/material/Box";


function SearchUser() {
  const [type, setType] = useState("nickname");
  const [text, setText] = useState("");
  const [search, setSearch] = useState(0);

  const { data, status, isLoading, sendRequest } = useAxios();

  // useAxios 활용
  useEffect(() => {
    if (text) {
      sendRequest({
        url: `${process.env.REACT_APP_HOST}/user?`,
        params: {
          page: 0,
          size: 100,
          baseTime: toStringDate(new Date()),
          filter: type,
          keyword: text,
        },
      });
    }
  }, [search]);

  return (
    <>
      <h2>유저 검색</h2>
      <SearchComp
        type={type}
        setType={setType}
        text={text}
        setText={setText}
        setSearch={setSearch}
        isIcon={true}
      />

      <Box padding="48px 112px">
        {isLoading && <p>loading 중...</p>}
        {!isLoading && search > 0 && status === 200 && (
          <UserList userList={data.list} />
        )}
        {!isLoading && search > 0 && status === 204 && (
          <p>검색 결과가 없습니다.</p>
        )}
      </Box>
    </>
  );
}

export default SearchUser;
