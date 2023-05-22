// 링크 텍스트에 underline 지우기
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
        const response = await axios.get(
          "http://127.0.0.1:8000/api/users/info/",
          {
            // const response = await axios.get(
            //     `https://manage.naekkukae.store/api/users/info/`,
            // {
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
      await axios.post("http://127.0.0.1:8000/api/users/logout/");
      // await axios.post(
      //     `https://manage.naekkukae.store/api/users/logout/`
      // );
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
      <nav role="sidebar_navigation">
        <div className="sidebar_menuToggle">
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
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
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
                    {" "}
                    Login{" "}
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
            </div>
            <Footer />
          </ul>
        </div>
      </nav>
      <style jsx>{sidebar}</style>
    </div>
  );
};

export default Sidebar;

const sidebar = css`
  .sidebar_container {
    font-family: "Bazzi";
    width: 100%;
    height: 100vh;
    overflow: hidden;
    max-width: 1200px;
  }

  .sidebar_menuToggle {
    display: block;
    position: relative;
    width: 20vw;
    height: auto;
    margin-top: 11.5vh;
    left: 20vw;

    z-index: 1000;

    /* -webkit-user-select: none;
    user-select: none;  */
  }

  .menu_list {
    display: absolute;
    position: relative;
    margin-top: 15vh;
    font-size: 30px;
  }

  .sidebar_menuToggle ul {
    list-style: none;
    display: block;
    color: #000000;
    float: left;
    font-size: 20px;
    // /* transition: color 0.3s ease; */
  }

  .sidebar_menuToggle ul p {
    display: block;
    width: 100%;
    color: #000000;
    padding-top: 15px;
  }

  .sidebar_menuToggle input {
    display: block;
    width: 55px;
    height: 55px;
    position: absolute;

    margin: -10px 0 0 20px;

    decoration: none;
    border: none;
    outline: none;

    cursor: pointer;

    opacity: 0;
    z-index: 2;
    border: 1px solid #000000;

    -webkit-touch-callout: none;
  }

  // X 버튼
  .sidebar_menuToggle span {
    display: block;
    flex-direction: column;
    width: 40px;
    height: 5px;
    position: relative;
    margin: 10px 35px;

    background: #ffffff;
    border-radius: 3px;

    z-index: 10;

    transform-origin: -6px;

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
    transform: rotate(45deg) translate(-2px, -1px);
    background: #232323;
  }

  .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }

  // 메뉴 바

  .sidebar_menu {
    position: absolute;
    background: #ec9ed6;
    width: 30vw;
    height: 200vh;
    padding: 55px;
    top: -150px;
    left: -260px;
    transform-origin: 0% 0%;
    transform: translate(-1000%, 0);
    list-style-type: none;
  }

  .sidebar_menu p{
    margin: 20px 0 0 10px;
  }

  // .sidebar_menu {
  //     position: absolute;
  //     width: 260px;
  //     height: calc(100vh + 43px);
  //     margin: -100px 0 0 -30px;
  //     padding: 50px;
  //     padding-top: 125px;

  //     background: #ec9ed6;
  //     // list-style-type: none;

  //     transform-origin: 0% 0%;
  //     transform: translate(-1000%, 0);
  // }

  // 메뉴 바 글씨
  .sidebar_menu li {
    top: 100px;
    line-height: 60px;
    font-size: 22px;
    padding: 10px;
  }

  //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
  .sidebar_menuToggle input:checked ~ ul {
    transform: none;
  }


  .loginbtn {
    padding-right: 10px;
    align-items: center;
    vertical-align: middle;
  }

`;
