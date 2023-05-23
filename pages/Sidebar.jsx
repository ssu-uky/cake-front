// 사이드바 전역 사용 설정

import css from "styled-jsx/css";
import Footer from "./components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleCakeClick = async () => {
    const accessToken = sessionStorage.getItem("access");

    if (accessToken) {
      try {
        // const response = await axios.get("http://127.0.0.1:8000/api/users/info/",{
        const response = await axios.get(
          `https://manage.naekkukae.store/api/users/info/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // 케이크 테이블이 있으면 테이블로 이동
        const user_pk = response.data.user_pk;
        router.push(`/caketables/${user_pk}`);
        console.log(user_pk);
      } catch (error) {
        console.log("로그인 오류");
      }
    } else {
      router.push("/");
    }
  };

  const handleLogout = async () => {
    const CheckLogout = window.confirm("정말 로그아웃 하시겠습니까?");
    if (!CheckLogout) {
      return;
    }
    try {
      // await axios.post("http://127.0.0.1:8000/api/users/logout/");
      await axios.post(`https://manage.naekkukae.store/api/users/logout/`);
      sessionStorage.removeItem("access");
      sessionStorage.removeItem("refresh");
      router.push("/");
    } catch (error) {
      console.log("로그아웃에 실패하였습니다.");
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false); // 페이지 이동 전에 사이드바를 닫습니다.
  };

  return (
    <div className="sidebar_container">
      <div className="sidebar_menuToggle">
        <nav role="sidebar_navigation">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={() => setIsOpen(!isOpen)}
          />
          <span></span>
          <span></span>
          <span></span>

          <ul className={`sidebar_menu ${isOpen ? "open" : ""}`}>
            <div className="menu_list">
              {/* <div className="signbtn"> */}
              <Link href="/" style={{ textDecoration: "none", color: "black" }}>
                <p
                  className="loginbtn"
                  onClick={() => {
                    handleLinkClick();
                  }}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Login
                </p>
              </Link>
              {/* <li className="slash"> / </li> */}
              {/* </div> */}
              <p
                onClick={() => {
                  handleCakeClick();
                  handleLinkClick();
                }}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                내 케이크 보기
              </p>
              <Link
                href="/"
                style={{ textDecorationLine: "none", color: "black" }}
              >
                <p
                  onClick={() => {
                    handleLinkClick();
                  }}
                  style={{ textDecoration: "none" }}
                >
                  서비스 소개
                </p>
              </Link>
              <Link
                href="/"
                style={{ textDecorationLine: "none", color: "black" }}
              >
                <p
                  onClick={() => {
                    handleLinkClick();
                  }}
                  style={{ textDecoration: "none" }}
                >
                  개발자 소개
                </p>
              </Link>
              <p
                className="logoutbtn"
                onClick={() => {
                  handleLogout();
                  handleLinkClick();
                }}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </p>
              <Footer />
            </div>
          </ul>
        </nav>
      </div>
      <style jsx>{sidebar}</style>
    </div>
  );
};

export default Sidebar;

const sidebar = css`
  .sidebar_container {
    top:0;
    left:0;
    font-family: "Bazzi";
    text-decoration: none;
    list-style: none;
    list-style-type: none;

    .sidebar_menuToggle {
      position: relative;
      left: 0;
      top: 0;
      z-index: 1000;

      /* -webkit-user-select: none;
    user-select: none;  */
    }

    // 메뉴 바
    .sidebar_menu {
      position: fixed;
      background: #ec9ed6;
      width: 30vw;
      height: 100vh;
      top: 0;
      left: 0;
      list-style-type: none;
      padding: 15vw 5vw;
      z-index: 100;
      transform-origin: 0% 0%; // 사이드바 오픈 버튼
      transform: translate(-1000%, 0); // 사이드바 오픈 버튼
    }

    .sidebar_menu p {
      margin-top: 30px;
      font-size: 1.8em;
    }

    // 햄버거바 클릭되는 부분 // 
    .sidebar_menuToggle input {
      display: block;
      width: 50px;
      height: 50px;
      position: absolute;
  
      top: 100px;
      left: 165px;
  
      // decoration: none;
      // border: none;
      // outline: none;
  
      cursor: pointer;
  
      opacity: 0;
      background: transparent;
      z-index: 200;

      -webkit-touch-callout: none;

    }
  

    // X 버튼
    .sidebar_menuToggle span {
      display: block;
      flex-direction: column;
      width: 50px;
      height: 5px;
      position: relative;
      decoration: none;
      background: #ffffff;
      border-radius: 3px;
      top: 110px;
      left: 150px;
      margin: 0 0 10px 0;

      z-index: 250;

      transform-origin: -5px;

      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
    }

    .sidebar_menuToggle span:first-child {
      transform-origin: 0% 0%;
    }

    .sidebar_menuToggle span:nth-last-child(2) {
      transform-origin: 0% 100%;
    }

    .sidebar_menuToggle input:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(3px, -20px);
      background: #232323;
    }

    .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }

    .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
      transform: rotate(-45deg) translate(15px, 10px);
    }

    //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
    .sidebar_menuToggle input:checked ~ ul {
      transform: none;
    }

    @media (max-width: 768px) {
      .sidebar_menu {
      position: fixed;
      background: #ec9ed6;
      width: 30vw;
      height: 100vh;
      top: 0;
      left: 0;
      list-style-type: none;
      padding: 30vw 5vw;
      z-index: 100;
      transform-origin: 0% 0%; // 사이드바 오픈 버튼
      transform: translate(-1000%, 0); // 사이드바 오픈 버튼
    }

    .sidebar_menu p {
      margin-top: 30px;
      font-size: 1.5em;
    }

    // 햄버거바 클릭되는 부분 // 
    .sidebar_menuToggle input {
      display: block;
      width: 60px;
      height: 60px;
      position: absolute;
  
      top: 110px;
      left: 175px;
  
      // decoration: none;
      // border: none;
      // outline: none;
  
      cursor: pointer;
  
      opacity: 0;
      background: transparent;
      z-index: 200;

      -webkit-touch-callout: none;

    }
  

    // X 버튼
    .sidebar_menuToggle span {
      display: block;
      flex-direction: column;
      width: 40px;
      height: 4px;
      position: relative;
      decoration: none;
      background: #ffffff;
      border-radius: 3px;
      margin: 5px 0px;
      top: 120px;
      left: -80px;

      z-index: 250;

      transform-origin: -7px;

      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
    }

    .sidebar_menuToggle span:first-child {
      transform-origin: 0% 0%;
    }

    .sidebar_menuToggle span:nth-last-child(2) {
      transform-origin: 0% 100%;
    }

    .sidebar_menuToggle input:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(-2px, -5px);
      background: #232323;
    }

    .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }

    .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
      transform: rotate(-45deg) translate(0px, 0px);
    }

    //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
    .sidebar_menuToggle input:checked ~ ul {
      transform: none;
    }


    @media (max-width: 500px) {
      .sidebar_menu {
        position: fixed;
        background: #ec9ed6;
        width: 40vw;
        height: 100vh;
        top: 0;
        left: 0;
        list-style-type: none;
        padding: 35vw 7vw;
        z-index: 100;
        transform-origin: 0% 0%; // 사이드바 오픈 버튼
        transform: translate(-1000%, 0); // 사이드바 오픈 버튼
      }
  
      .sidebar_menu p {
        margin-top: 30px;
        font-size: 1em;
      }
  
      // 햄버거바 클릭되는 부분 // 
      .sidebar_menuToggle input {
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
    
        top: 50px;
        left: 30px;
    
        // decoration: none;
        // border: none;
        // outline: none;
    
        cursor: pointer;
    
        opacity: 0;
        background: transparent;
        z-index: 200;
  
        -webkit-touch-callout: none;
  
      }
    
  
      // X 버튼
      .sidebar_menuToggle span {
        display: block;
        flex-direction: column;
        width: 30px;
        height: 3px;
        position: relative;
        decoration: none;
        background: #ffffff;
        border-radius: 3px;
        top: 50px;
        left: 50px;
        margin: 5px 0;
  
        z-index: 250;
  
        transform-origin: -5px;
  
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
          background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
      }
  
      .sidebar_menuToggle span:first-child {
        transform-origin: 0% 0%;
      }
  
      .sidebar_menuToggle span:nth-last-child(2) {
        transform-origin: 0% 100%;
      }
  
      .sidebar_menuToggle input:checked ~ span {
        opacity: 1;
        transform: rotate(45deg) translate(-10px, 7px);
        background: #232323;
      }
  
      .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
  
      .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
        transform: rotate(-45deg) translate(-13px, -4px);
      }
  
      //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
      .sidebar_menuToggle input:checked ~ ul {
        transform: none;
      }
  
    }
  }
`;
