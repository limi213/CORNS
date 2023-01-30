import React, { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword1 = (e) => {
    setPassword1(e.target.value);
  };

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  // 이메일 유효성 검사 -> 추후 수정
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  // ***************************************
  // 이메일 중복 확인 -> fetch
  const onCheckEmail = async (e) => {
    e.preventDefault();
    try {
      // GET 요청
      console.log(email);
      const res = await fetch(`/user/idcheck/${email}`);
      console.log(res.json());
    } catch (err) {
      console.log(err);
    }
    // fetch get 테스트
    // try {
    //   const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    //   console.log(res.json());
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // 비밀번호 유효성 검사 -> 추후 수정
  const validatePwd = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  };

  // 비밀번호1, 비밀번호2 확인
  const checkPwd = (password1, password2) => {
    return password1 === password2;
  };

  // 닉네임 유효성 검사 -> 추후 수정
  const validateNickname = (nickname) => {
    return nickname.toLowerCase().match(/^[a-z|A-Z|].{1,8}$/);
  };

  // 회원가입 -> fetch
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(email, password1);

      // POST 요청
      const res = await fetch("/user/join", {
        method: "POST",
        // headers: {
        //   Accept: "application/json",
        // },
        body: JSON.stringify({
          email,
          password1,
          nickname
        }),
      });
      console.log(res.json());

      // // fetch post 테스트
      // const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email,
      //     password1,
      //   }),
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8",
      //   },
      // });
      // console.log(res.json());

    } catch(err) {
      console.log(err)
    }
  };


  return (
    <>
      <h1>회원가입</h1>

      <div>
        <h3>E-MAIL</h3>
        <input
          id="email"
          type="text"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={onChangeEmail}
        />
        <button onClick={onCheckEmail}>중복확인</button>
      </div>

      <div>
        <h3>PASSWORD</h3>
        <input
          id="password1"
          type="text"
          placeholder="비밀번호를 입력하세요."
          value={password1}
          onChange={onChangePassword1}
        />
        <input
          id="password2"
          type="text"
          placeholder="비밀번호를 재입력하세요."
          value={password2}
          onChange={onChangePassword2}
        />
        <div>비밀번호는 영문, 숫자, 특수문자를 포함한 8-20글자여야합니다.</div>
      </div>

      <div>
        <h3>NICKNAME</h3>
        <input
          id="nickname"
          type="text"
          placeholder="닉네임을 입력하세요."
          value={nickname}
          onChange={onChangeNickname}
        />
        <div>닉네임을 실제로 불릴 이름이며, 영문으로 표기해야합니다.</div>
      </div>

      <div>
        <button onClick={onSubmit}>회원가입</button>
      </div>
    </>
  );
}

export default Signin;
