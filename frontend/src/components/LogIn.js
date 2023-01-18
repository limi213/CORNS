import React, { useState, useRef } from "react";
// import { useScript } from '../hooks/useScript';
// import { postGoogleLogin } from 'api/auth';


// // 구글 소셜 로그인
// function onSocialLogin() {
//   const googleSignInButton = useRef(null);

//   const onGoogleSignIn = async (e) => {
//     const res = await postGoogleLogin(e.credential);
//     //콜백 함수
//   };

//   useScript('https://accounts.google.com/gsi/client', () => {
//     window.google.accounts.id.initialize({
//       client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//       callback: onGoogleSignIn,
//     });
//     window.google.accounts.id.renderButton(googleSignInButton.current, {
//       width: '250',
//       type: 'icon',
//       shape: 'circle',
//     });
//   });

//   return (
//     <div
//       id="google-login-api"
//       ref={googleSignInButton}
//     />
//   );
// }


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
        <button onClick={() => {}}>구글로 로그인 하기</button>
      </div>
    </>
  );
}

export default Login;
