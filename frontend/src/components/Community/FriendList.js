import React, { useState, useEffect } from "react";
import axios from 'axios';
import SearchComp from "components/GlobalComponents/SearchComp";
import UserList from "./UserList";

import { Box } from "@mui/material";

// 친구 검색 axios -> pagination 추가해야함 ...
const GetFriends = async (type, text, setUsers) => {
  // const startDate = moment().format("YYYY-MM-DDTHH:mm:sszz")
  // console.log(startDate)
  
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/friend/${sessionStorage.getItem("userId")}?` +
        new URLSearchParams({
          filter: type,
          keyword: text,
          baseTime: "2023-02-28 00:00:00",
          page: 0,
          size: 20,
        }),
      {
        validateStatus: (status) => status === 200 || status === 204,
      }
    );
    // console.log('search friend axios', type, text)
    if (response.status === 200) {
      setUsers(response.data.list)
    } else if (response.status === 204) {
      setUsers([])
    }
  } catch (e) {
    console.log(e);
  }
};



function FriendList({ items }) {
  const [type, setType] = useState("nickname");
  const [text, setText] = useState("");
  const [search, setSearch] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    GetFriends(type, text, setUsers);
  }, [type, text])


  return (
    <>
      <h3>친구목록</h3>
      <SearchComp
        type={type}
        setType={setType}
        text={text}
        setText={setText}
        search={search}
        setSearch={setSearch}
      />
      <Box padding="48px 112px">
        <UserList userList={users} />
      </Box>
    </>
  );
}

export default FriendList;
