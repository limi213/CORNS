import React from 'react';
import axios from "axios";

const Logout = async () => {

  try {
    const user_id = sessionStorage.getItem("userId");
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/user/logout/${user_id}`
    );
    if (response.status === 200) {
      sessionStorage.clear();

      window.location.href = '/'
    }
  } catch (e) {
    console.log(e);
  }
};

export default Logout;
