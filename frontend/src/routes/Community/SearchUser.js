import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchComp from "components/GlobalComponents/SearchComp";
import UserList from "components/Community/UserList";

import Box from "@mui/material/Box";

// user 검색 axios
// 무한스크롤 구현 해야함
const GetUser = async (type, text, setUsers) => {
  // const startDate = moment().format("YYYY-MM-DDTHH:mm:sszz")
  // console.log(startDate)
  console.log('axios', type, text)
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/user?` +
        new URLSearchParams({
          page: 0,
          size: 10,
          baseTime: "2023-02-30 00:00:00",
          filter: type,
          keyword: text,
        }),
      {
        validateStatus: (status) => status === 200 || status === 204,
      }
    );
    if (response.status === 200) {
      setUsers(response.data.list)

    } else if (response.status === 204) {
      // 검색 결과 없는 경우
      setUsers([]);
    }
  } catch (e) {
    console.log(e);
  }
};

function SearchUser() {
  const [type, setType] = useState("nickname");
  const [text, setText] = useState("");
  const [search, setSearch] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (text) {
      GetUser(type, text, setUsers)
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
        search={search}
        setSearch={setSearch}
      />

      <Box padding="48px 112px">
        {search > 0 && users.length > 0 && <UserList userList={users} />}
        {search > 0 && users.length === 0 && <p>검색 결과가 없습니다.</p>}

      </Box>
    </>
  );
}

export default SearchUser;
