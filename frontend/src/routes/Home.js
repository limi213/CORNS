import Navbar from "../components/GlobalComponents/Navbar";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Home() {
  return (
    <div
      css={css`
        margin: 0 105px;
      `}
    >
      <Navbar />
      <h1>CORNS의 첫페이지 입니다!!</h1>
    </div>
  );
}

export default Home;
