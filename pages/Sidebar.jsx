// 사이드바 전역 사용 설정

import css from "styled-jsx/css";
import Footer from "./components/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (!sidebarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
    <div className="sidebar_container" ref={sidebarRef}>
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
  // 전체 컨테이너
  .sidebar_container {
    font-family: "Bazzi";
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }


  // 메뉴 바
  .sidebar_menu {
    position: absolute;
    width: 40vw;
    height: calc(100vh + 43px);
    margin: -100px 0 0 -30px;
    padding: 60px;
    padding-top: 180px;
    font-size: 30px;
    line-height: 50px;
    overflow: hidden;

    background: #ec9ed6;
    // list-style-type: none;

    transform-origin: 0% 0%;
    transform: translate(-1000%, 0);
  }

  .sidebar_menuToggle {
    display: block;
    position: relative;
    width: 40px;
    height: 40px;
    top: 50px;
    left: 30px;

    z-index: 1000;

    /* -webkit-user-select: none;
    user-select: none;  */
    }
    
  .sidebar_menuToggle input {
    display: block;
    width: 40px;
    height: 40px;
    left: 15px;
    // top: 20px;
    position: absolute;

    cursor: pointer;

    opacity: 0;
    z-index: 2;

    -webkit-touch-callout: none;
  }


  // X 버튼
  .sidebar_menuToggle span {
    display: block;
    flex-direction: column;
    width: 35px;
    height: 4px;
    margin: 10px 20px;
    position: relative;
    

    background: #ffffff;
    border-radius: 3px;

    z-index: 10;

    transform-origin: 4px 0px;

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
    transform: rotate(45deg) translate(3px, 7px);
    background: #232323;
  }

  .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(-1px, -1px);
  }

  //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
  .sidebar_menuToggle input:checked ~ ul {
    transform: none;
  }

  @media (max-width: 768px){
    // 메뉴 바
  .sidebar_menu {
    position: absolute;
    width: 35vw;
    height: calc(100vh + 43px);
    padding: 50px;
    padding-top: 170px;
    font-size: 22px;
    line-height: 45px;
    overflow: hidden;

    background: #ec9ed6;

    transform-origin: 0% 0%;
    transform: translate(-1000%, 0);
  }

  .sidebar_menuToggle {
    display: block;
    position: relative;
    top: 40px;
    left: 30px;

    z-index: 1000;

    /* -webkit-user-select: none;
    user-select: none;  */
  }

    .sidebar_menuToggle span {
      display: block;
      flex-direction: column;
      width: 35px;
      height: 3px;
      margin: 8px 20px;
      position: relative;
      
  
      background: #ffffff;
      border-radius: 3px;
  
      z-index: 10;
  
      transform-origin: 5px 0px;
  
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
      transform: rotate(45deg) translate(0px, 3px);
      background: #232323;
    }
  
    .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }
  
    .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
      transform: rotate(-45deg) translate(-1px, -1px);
    }
  
    //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
    .sidebar_menuToggle input:checked ~ ul {
      transform: none;
    }
  }

  
  @media (max-width: 640px){
    // 메뉴 바
    .sidebar_menu {
      position: absolute;
      width: 45vw;
      height: calc(100vh + 43px);
      padding: 40px;
      padding-top: 150px;
      font-size: 18px;
      line-height: 30px;
      overflow: hidden;
  
      background: #ec9ed6;
      // list-style-type: none;
  
      transform-origin: 0% 0%;
      transform: translate(-1000%, 0);
    }
  
    .sidebar_menuToggle {
      display: block;
      position: relative;
      padding-top: 10px;
      top: 40px;
      left: 30px;
  
      z-index: 1000;
  
      /* -webkit-user-select: none;
      user-select: none;  */
    }
  
      .sidebar_menuToggle span {
        display: block;
        flex-direction: column;
        width: 35px;
        height: 3px;
        margin: 8px 15px;
        position: relative;
        
    
        background: #ffffff;
        border-radius: 3px;
    
        z-index: 10;
    
        transform-origin: 5px 0px;
    
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
        transform: rotate(45deg) translate(0px, 3px);
        background: #232323;
      }
    
      .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
    
      .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
        transform: rotate(-45deg) translate(-1px, -1px);
      }
    
      //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
      .sidebar_menuToggle input:checked ~ ul {
        transform: none;
      }
  }

  
  @media (max-width: 376px){
    // 메뉴 바
    .sidebar_menu {
      position: absolute;
      width: 45vw;
      height: calc(100vh + 43px);
      padding: 30px;
      padding-top: 145px;
      font-size: 15px;
      line-height: 27px;
      overflow: hidden;
  
      background: #ec9ed6;
  
      transform-origin: 0% 0%;
      transform: translate(-1000%, 0);
    }
  
    .sidebar_menuToggle {
      display: block;
      position: relative;
      // padding-top: 20px;
      top: 40px;
      left: 30px;
  
      z-index: 1000;
  
      /* -webkit-user-select: none;
      user-select: none;  */
    }

    .sidebar_menuToggle input {
      display: block;
      width: 40px;
      height: 40px;
      left: 14px;
      top: 17px;
      position: absolute;
  
      cursor: pointer;
  
      opacity: 0;
      z-index: 2;
  
      -webkit-touch-callout: none;
    }
  
      .sidebar_menuToggle span {
        display: block;
        flex-direction: column;
        width: 30px;
        height: 3px;
        margin: 7px 15px;
        position: relative;
        
    
        background: #ffffff;
        border-radius: 3px;
    
        z-index: 10;
    
        transform-origin: 3px -1px;
    
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
        transform: rotate(45deg) translate(0px, 3px);
        background: #232323;
      }
    
      .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
    
      .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
        transform: rotate(-45deg) translate(-1px, -1px);
      }
    
      //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
      .sidebar_menuToggle input:checked ~ ul {
        transform: none;
      }
  }

  @media (max-width: 300px){
    // 메뉴 바
    .sidebar_menu {
      position: absolute;
      width: 50vw;
      height: calc(100vh + 43px);
      padding: 20px;
      padding-top: 50vw;
      font-size: 15px;
      line-height: 25px;
  
      background: #ec9ed6;
  
      transform-origin: 0% 0%;
      transform: translate(-1000%, 0);
    }
  
    .sidebar_menuToggle {
      display: block;
      position: relative;
      padding-top: 20px;
      top: 40px;
      left: 30px;
  
      z-index: 1000;
  
      /* -webkit-user-select: none;
      user-select: none;  */
    }
  
      .sidebar_menuToggle span {
        display: block;
        flex-direction: column;
        width: 25px;
        height: 3px;
        margin: 6px 15px;
        position: relative;
        
    
        background: #ffffff;
        border-radius: 3px;
    
        z-index: 10;
    
        transform-origin: 5px 0px;
    
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
        transform: rotate(45deg) translate(0px, 3px);
        background: #232323;
      }
    
      .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
    
      .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
        transform: rotate(-45deg) translate(2px, -2px);
      }
    
      //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
      .sidebar_menuToggle input:checked ~ ul {
        transform: none;
      }
  }

}`;
