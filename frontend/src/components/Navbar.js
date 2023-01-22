import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => { 
  return (
    <nav>
      <div>
        <NavLink to="/">
          corns
        </NavLink>
      </div>
      <div>
        <NavLink to="/conversation">
          쫑알쫑알
        </NavLink>
      </div>      
      <div>
        <NavLink to="/conversationLog">
          쫑알로그
        </NavLink>
      </div>
      <div>
        <NavLink to="/growthRecord">
          성장기록
        </NavLink>
      </div>
      <div>
        <NavLink to="/community">
          커뮤니티
        </NavLink>
      </div>
      
      <div className="not-logged-in">
        <div>
          <NavLink to="/login">
            로그인
          </NavLink>
        </div>
        <div>
          <NavLink to="/signin">
            회원가입
          </NavLink>
        </div>
      </div>
      
      <div className="logged-in">
        <div>
          <p>로그아웃</p>
        </div>
        
        {/* 드롭다운 */}
        <div>
          <div>
            <NavLink to="/mypage">
              마이페이지
            </NavLink>
          </div>
          {/* <div>
            <NavLink to="/friend-list">
              친구신청목록
            </NavLink>
          </div> */}
        </div>
      </div>
    
    </nav>
  );
};

export default Navbar;