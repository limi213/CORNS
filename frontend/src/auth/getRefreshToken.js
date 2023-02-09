import axios from "axios";

const getRefreshToken = async () => {
  console.log("get refresh token!");

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/user/refresh`,
      {
        headers: {
          "Authorization-refresh": `Bearer ${sessionStorage.getItem(
            "refreshToken"
          )}`,
        },
      },
      {
        validateStatus: (status) => status === 200 || status === 401,
      }
    );

    if (response.status === 200) {
      console.log("refresh token success!");
      sessionStorage.setItem("accessToken", response.data.accessToken);
      return true;
    } else if (response.status === 401) {
      return false;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
};

export default getRefreshToken;
