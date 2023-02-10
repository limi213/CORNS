import React from "react";
import axios from "axios";

const GoogleLogin = async (code) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/user/auth/google/callback?code=${code}`
    );
    if (response.status === 200) {
      // 로그인 성공
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);
      sessionStorage.setItem("userId", response.data.loginUser.userId);
      sessionStorage.setItem("imgUrl", response.data.loginUser.imgUrl);
      sessionStorage.setItem("email", response.data.loginUser.email);
      sessionStorage.setItem("nickname", response.data.loginUser.nickname);
      
      if (response.data.isCombine) {
        alert('CORNS 계정이 있으시군요! \n GOOGLE 계정에 연결기존 계정과 모두 자유롭게 이용하실 수 있습니다.')
      }
    
      // Home 페이지로 이동
      window.location.href = '/'
    }
  } catch (e) {
    console.log(e);
  }
};

export default GoogleLogin;
