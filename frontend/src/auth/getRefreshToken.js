import axios from "axios";

const getRefreshToken = async () => {
  console.log("get refresh token!");

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/user/refresh`, {
        userId: sessionStorage.getItem("userId")
      },
      {
        headers: {
          refreshToken: `${sessionStorage.getItem("refreshToken")}`,
        },
        validateStatus: (status) => {
          return status === 200 || status === 401;
        },
      }
    );
    console.log('get refresh response', response)
    if (response.status === 200) {
      console.log("refresh token success!");
      sessionStorage.setItem("accessToken", response.data.accessToken);
      return 200;
    } else if (response.status === 401) {
      console.log('refresh token failed!')
      console.log(response)
      return 401;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
};

export default getRefreshToken;
