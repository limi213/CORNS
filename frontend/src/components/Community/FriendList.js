import React, { useState, useEffect } from "react";
import SearchComp from "components/GlobalComponents/SearchComp";
import UserList from "./UserList";
import { useSelector, useDispatch } from "react-redux";
import { getFriendListAxios } from "store/reducers/friendListReducer";
import { Box } from "@mui/material";

function FriendList({ items }) {
  const dispatch = useDispatch();
  const [type, setType] = useState("nickname");
  const [text, setText] = useState("");
  const [search, setSearch] = useState(0);
  const users = useSelector((state) => state.friendListReducer.friendList);
  const loading = useSelector((state) => state.friendListReducer.isFriendListLoading);


  useEffect(() => {
    dispatch(getFriendListAxios(type, text));
  }, [type, text, dispatch]);

  return (
    <>
      <h3>친구목록</h3>
      <SearchComp
        type={type}
        setType={setType}
        text={text}
        setText={setText}
        setSearch={setSearch}
      />
      <Box padding="48px 112px">
        {loading && <p>loading중...</p>}
        {!loading && users.length > 0 && <UserList userList={users} />}
        {!loading && users.length === 0 && !text && <p>친구가 없습니다.</p> }
        {!loading && users.length === 0 && text &&  <p>검색결과가 없습니다.</p> }
      </Box>
    </>
  );
}

export default FriendList;
