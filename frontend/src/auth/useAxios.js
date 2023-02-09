import { useCallback, useState } from "react";
import authHeader from "auth/authHeader";
import axios from "axios";

// axios 보내고 401 뜨면 refresh 보내는 함수
// 로그인 필수인 곳에만 사용
// hook 아닌 곳에서 사용 못함 -> 참고해서 작성할 것
function useAxios() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //  axios 함수
  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    console.log('sendRequest!', requestConfig.url)

    try {
      const response = await axios(
        requestConfig.url,
        {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: authHeader(),
          body: requestConfig.body && JSON.stringify(requestConfig.body),
        },
      );

      // unauthorized 401 (access 만료)
      // refresh axios
      if (response.status === 401) {
        console.log('401 error -> refresh axios!')
        const response = await axios.post(
          `${process.env.REACT_APP_HOST}/user/refresh`,
          {
            headers: {
              "Authorization-refresh": `Bearer ${sessionStorage.getItem("refreshToken")}`,
            },
          }
        );
        // access token 못받은 경우 (refresh 만료)
        if (!response.ok) {
          throw new Error("Failed refresh");
        }
        // access token 받은 경우
        console.log('refresh access!')
        console.log('다시 sendrequest!')
        const data = await response.data;
        sessionStorage.setItem("accessToken", data.accessToken); // access token 갱신 후
        sendRequest(requestConfig); // axios 다시 보내기
      } else if (!response.ok) {
        throw new Error("Request failed");
      }
      // 데이터 잘 받은 경우
      else {
        console.log('200! 데이터 잘 받음!')
        const data = await response.json();
        setData(data);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);
  return { data, isLoading, sendRequest };
}

export default useAxios;
