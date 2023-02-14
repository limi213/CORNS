import React, {useState} from "react";
import useAxios from "auth/useAxios";
import InvitationList from "components/Community/InvitationList";
import { useEffect } from "react";

/** @jsxImportSource @emotion/react */

function Invitation() {
  const {data, status, isLoading, sendRequest} = useAxios();
  const [inviteList, setInviteList] = useState([]);

  useEffect(() => {
   sendRequest({
    url: `${process.env.REACT_APP_HOST}/invitation/${sessionStorage.getItem("userId")}`,
   }) 
  }, [])

  useEffect(() => {
    if (status === 200) {
      setInviteList(data.inviteList);
    }
  }, [status])
  
  return (
    <>
      <h2>초대목록</h2>
      {isLoading && <p>loading 중...</p>}
      {!isLoading && inviteList.length === 0 && <p>초대 목록이 없습니다.</p>}
      {!isLoading && inviteList.length > 0 && <InvitationList inviteList={inviteList} setInviteList={setInviteList}/>}
    </>
  );
}

export default Invitation;
