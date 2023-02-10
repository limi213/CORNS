import { useCallback, useState } from "react";
import authHeader from "auth/authHeader";
import axios from "axios";
import getRefreshToken from "./getRefreshToken";
import Logout from "./Logout";

// axios 보내고 401 뜨면 refresh 보내는 Hooks
// 로그인 필수인 곳에서 사용
// hook 아닌 곳에서 사용 못함 -> 참고해서 작성할 것
function useAxios() {
  const [data, setData] = useState([]);
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
           sendRequest();
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
        console.log('response', response)
        setData(response.data);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);
  return { data, isLoading, sendRequest };
}

export default useAxios;
