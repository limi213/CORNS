import IsLogin from "auth/IsLogin";

function authHeader() {
  if (IsLogin()) {
    return {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Credentials": true,
    };
  } else {
    return {};
  }
}

export default authHeader;
