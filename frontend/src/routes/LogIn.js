import React, { useState, useEffect, useRef } from "react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // 로그인
  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/user/login", {
         method: "POST",
         body: JSON.stringify({ 
          email, 
          password 
        }),
      })
      console.log(res.json())
    } catch (err) {
      console.log(err);
    }
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential)
  } 

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_ID,
      callback: handleCallbackResponse
    })
    window.google.accounts.id.renderButton(
      document.getElementById('socialLogin'),
      {theme: "outline", size: "large"}
    )
  }, []);


  return (
    <>     
      <h1>로그인</h1>
      
      <div>
        <h3>E-MAIL</h3>
        <input
          id="email"
          type="text"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={onChangeEmail}
        />
      </div>

      <div>
        <h3>PASSWORD</h3>
        <input
          id="password1"
          type="text"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={onChangePassword}
        />
      </div>

      <div>
        <button onClick={onLogin}>로그인</button>
      </div>

      <div>
        <h3>SOCIAL LOGIN</h3>
        <div id="socialLogin"></div>
      </div>
    </>
  );
}

export default Login;
