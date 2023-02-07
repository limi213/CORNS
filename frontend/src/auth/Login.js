import React from 'react';
import axios from "axios";

// 로그인 axios
const Login = async (email, password, setErrorMsg = false) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/user/login`,
      {
        email: email,
        password: password,
      },
      {
        validateStatus: (status) => status === 200 || status === 401,
      }
    );

    if (response.status === 200) {
      // 로그인 성공
      // 일단 냅다 다 session에 박아버림...
      // 추후 쿠키나 local 더 고민...
      // 아님 redis....
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      sessionStorage.setItem("userId", response.data.loginUser.userId);
      sessionStorage.setItem("imgUrl", response.data.loginUser.imgUrl);
      sessionStorage.setItem("email", response.data.loginUser.email);
      sessionStorage.setItem("nickname", response.data.loginUser.nickname);

      // Home 페이지로 이동
      window.location.href = '/'

    } else if (response.status === 401) {
      setErrorMsg("아이디 또는 비밀번호를 잘못입력했습니다.");
    }
  } catch (e) {
    console.log(e);
  }
};

export default Login;
