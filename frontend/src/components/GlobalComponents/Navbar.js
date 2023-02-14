import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logout from "auth/Logout";
import IsLogin from "auth/IsLogin";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NavbarDropdown from "./NavbarDropdown";
import white_logo from "assets/corns_logo.png";

function Navbar() {
  const [user, setUser] = useState(true);
  // user 로그인했는지 확인하기 전에 랜더링돼서 area 밀려버림 -> 일단은 flag로 임시 해결
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setUser(IsLogin());
    setFlag(true);
  }, [user]);

  const onLogout = () => {
    Logout();
    setUser(false);
  };

  // router / window 바뀔때마다 is new? 체크하고 빨간거 만들고
  // 새로 들어온거 있으면 무조건 api -> true (빨간거 띄우고)
  // 친구 page 들어오면 -> 확인했다고 api 보내면 -> false (빨간거 없어짐)

  return (
    <>
      {flag && (
        <nav
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 36px;
            width: 1620px;
            height: 60px;
            background: #ffc804;
            border: 3px solid #111;
            position: sticky;
            top: 0;
            left: 105px;
            z-index: 1000;
          `}
        >
          <div
            css={css`
              flex: none;
              order: 0;
              flex-grow: 0;
              color: "black";
            `}
          >
            <NavLink to="/">
              <img
                src={white_logo}
                alt="corns-logo"
                css={css`
                  height: 2rem;
                `}
              />
            </NavLink>
          </div>

          <ul
            css={css`
              list-style: none;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding: 0px;
              width: 40%;
              height: 26px;
              color: black;
            `}
          >
            <li>
              <NavLink
                to="/conversation"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                }}
                activeStyle={{ fontWeight: "bold" }}
              >
                쫑알쫑알
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/conversationLog/loglist"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                }}
                css={css`
                  font-weight: ${window.location.href.includes(
                    "conversationLog"
                  ) && "bold"};
                `}
              >
                쫑알로그
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/growthRecord/myProfile"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                }}
                css={css`
                  font-weight: ${window.location.href.includes(
                    "growthRecord"
                  ) && "bold"};
                `}
              >
                성장기록
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community/ranking/sincerity"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                }}
                css={css`
                  font-weight: ${window.location.href.includes("community") &&
                  "bold"};
                `}
              >
                커뮤니티
              </NavLink>
            </li>

            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "20px",
                    }}
                  >
                    로그인
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signin"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "20px",
                    }}
                  >
                    회원가입
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "20px",
                    }}
                    onClick={onLogout}
                  >
                    로그아웃
                  </NavLink>
                </li>
                <li>
                  <NavbarDropdown />
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navbar;
