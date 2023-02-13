import { useCallback, useState } from "react";
import authHeader from "auth/authHeader";
import axios from "axios";
import getRefreshToken from "./getRefreshToken";
import Logout from "./Logout";

// axios 보내고 401 뜨면 refresh 보내는 Hooks
// 로그인 필수인 곳에서 사용
// 간단하게 get / post / push 하는데서만 사용할 수 있음
// 복잡하게 데이터 변경해야하고 이런데서는 friendListReducer/getFriendRequestListAxios 참고해서 작성
function useAxios() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //  axios 함수
  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    console.log('sendRequest!', requestConfig.url);
    try {
      const response = await axios(
        requestConfig.url,
        {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: authHeader(),
          body: requestConfig.body && JSON.stringify(requestConfig.body),
          data: requestConfig.data && JSON.stringify(requestConfig.data),
          params: requestConfig.params,
          validateStatus: (status) => {
            if (requestConfig.validatedateStatus) {
              return requestConfig.validatedateStatus.includes(status) || status === 401;
            } else {
              return status === 200 || status === 204 || status === 401;
            }
          },
        },
      );

      // 1. unauthorized 401 (access 만료)
      // refresh axios
      if (response.status === 401) {
        console.log('unauthorized!-> refresh!')
        const refreshResponse = await getRefreshToken();

        // 1.1 refresh 성공한 경우 -> 다시 sendRequest
        if (refreshResponse === 200) {
           console.log('refresh access!')
           sendRequest(requestConfig);
        } 
        // 1.2 access token 못받은 경우 (refresh 만료)
        else {
          alert('세션이 만료되었습니다.')
          Logout();
        }
      } 
      
      // 2. validate Status인 경우
      else {
        console.log('axios success!')
        setData(response.data);
        setStatus(response.status);
      }
    } catch (err) {
      console.log(err);
      setStatus(err.response.status);
    }
    setIsLoading(false);
  }, []);
  return { data, status, isLoading, sendRequest };
}

export default useAxios;
