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
  @font-face {
    font-family: "Bazzi";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
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
      font-size: 20px;
      line-height: 37px;
  
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
      font-size: 18px;
      line-height: 30px;
  
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

  @media (max-width: 300px){
    // 메뉴 바
    .sidebar_menu {
      position: absolute;
      width: 50vw;
      height: calc(100vh + 43px);
      padding: 20px;
      padding-top: 22vh;
      font-size: 15px;
      line-height: 30px;
  
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

//   .sidebar_container {
//     top:0;
//     left:0;
//     font-family: "Bazzi";
//     text-decoration: none;
//     list-style: none;
//     list-style-type: none;

//     .sidebar_menuToggle {
//       position: relative;
//       left: 0;
//       top: 0;
//       z-index: 1000;

//       /* -webkit-user-select: none;
//     user-select: none;  */
//     }

//     // 메뉴 바
//     .sidebar_menu {
//       position: fixed;
//       background: #ec9ed6;
//       width: 30vw;
//       height: 100vh;
//       top: 0;
//       left: 0;
//       list-style-type: none;
//       padding: 15vw 5vw;
//       z-index: 100;
//       transform-origin: 0% 0%; // 사이드바 오픈 버튼
//       transform: translate(-1000%, 0); // 사이드바 오픈 버튼
//     }

//     .sidebar_menu p {
//       margin-top: 30px;
//       font-size: 1.8em;
//     }

//     // 햄버거바 클릭되는 부분 //
//     .sidebar_menuToggle input {
//       display: block;
//       width: 50px;
//       height: 50px;
//       position: absolute;

//       top: 100px;
//       left: 165px;

//       // decoration: none;
//       // border: none;
//       // outline: none;

//       cursor: pointer;

//       opacity: 0;
//       background: transparent;
//       z-index: 200;

//       -webkit-touch-callout: none;

//     }

//     // X 버튼
//     .sidebar_menuToggle span {
//       display: block;
//       flex-direction: column;
//       width: 50px;
//       height: 5px;
//       position: relative;
//       decoration: none;
//       background: #ffffff;
//       border-radius: 3px;
//       top: 110px;
//       left: 150px;
//       margin: 0 0 10px 0;

//       z-index: 250;

//       transform-origin: -5px;

//       transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
//         background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
//     }

//     .sidebar_menuToggle span:first-child {
//       transform-origin: 0% 0%;
//     }

//     .sidebar_menuToggle span:nth-last-child(2) {
//       transform-origin: 0% 100%;
//     }

//     .sidebar_menuToggle input:checked ~ span {
//       opacity: 1;
//       transform: rotate(45deg) translate(3px, -20px);
//       background: #232323;
//     }

//     .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
//       opacity: 0;
//       transform: rotate(0deg) scale(0.2, 0.2);
//     }

//     .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
//       transform: rotate(-45deg) translate(15px, 10px);
//     }

//     //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
//     .sidebar_menuToggle input:checked ~ ul {
//       transform: none;
//     }

//     @media (max-width: 768px) {
//       .sidebar_menu {
//       position: fixed;
//       background: #ec9ed6;
//       width: 30vw;
//       height: 100vh;
//       top: 0;
//       left: 0;
//       list-style-type: none;
//       padding: 30vw 5vw;
//       z-index: 100;
//       transform-origin: 0% 0%; // 사이드바 오픈 버튼
//       transform: translate(-1000%, 0); // 사이드바 오픈 버튼
//     }

//     .sidebar_menu p {
//       margin-top: 30px;
//       font-size: 1.5em;
//     }

//     // 햄버거바 클릭되는 부분 //
//     .sidebar_menuToggle input {
//       display: block;
//       width: 60px;
//       height: 60px;
//       position: absolute;

//       top: 110px;
//       left: 175px;

//       // decoration: none;
//       // border: none;
//       // outline: none;

//       cursor: pointer;

//       opacity: 0;
//       background: transparent;
//       z-index: 200;

//       -webkit-touch-callout: none;

//     }

//     // X 버튼
//     .sidebar_menuToggle span {
//       display: block;
//       flex-direction: column;
//       width: 40px;
//       height: 4px;
//       position: relative;
//       decoration: none;
//       background: #ffffff;
//       border-radius: 3px;
//       margin: 5px 0px;
//       top: 120px;
//       left: -80px;

//       z-index: 250;

//       transform-origin: -7px;

//       transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
//         background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
//     }

//     .sidebar_menuToggle span:first-child {
//       transform-origin: 0% 0%;
//     }

//     .sidebar_menuToggle span:nth-last-child(2) {
//       transform-origin: 0% 100%;
//     }

//     .sidebar_menuToggle input:checked ~ span {
//       opacity: 1;
//       transform: rotate(45deg) translate(-2px, -5px);
//       background: #232323;
//     }

//     .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
//       opacity: 0;
//       transform: rotate(0deg) scale(0.2, 0.2);
//     }

//     .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
//       transform: rotate(-45deg) translate(0px, 0px);
//     }

//     //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
//     .sidebar_menuToggle input:checked ~ ul {
//       transform: none;
//     }

//     @media (max-width: 500px) {
//       .sidebar_menu {
//         position: fixed;
//         background: #ec9ed6;
//         width: 40vw;
//         height: 100vh;
//         top: 0;
//         left: 0;
//         list-style-type: none;
//         padding: 35vw 7vw;
//         z-index: 100;
//         transform-origin: 0% 0%; // 사이드바 오픈 버튼
//         transform: translate(-1000%, 0); // 사이드바 오픈 버튼
//       }

//       .sidebar_menu p {
//         margin-top: 30px;
//         font-size: 1em;
//       }

//       // 햄버거바 클릭되는 부분 //
//       .sidebar_menuToggle input {
//         display: block;
//         width: 30px;
//         height: 30px;
//         position: absolute;

//         top: 50px;
//         left: 15px;

//         decoration: none;
//         border: none;
//         outline: none;

//         cursor: pointer;

//         opacity: 0;
//         background: transparent;
//         z-index: 200;

//         -webkit-touch-callout: none;

//       }

//       // 햄버거 버튼
//       .sidebar_menuToggle span {
//         display: flex;
//         flex-direction: column;
//         width: 25px;
//         height: 3px;
//         position: relative;
//         decoration: none;
//         background: #ffffff;
//         border-radius: 3px;
//         top: 50px;
//         left: 27px;

//         z-index: 250;

//         // X 버튼
//         transform-origin: -8px;

//         transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
//           background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
//       }

//       .sidebar_menuToggle span:first-child {
//         transform-origin: 0% 0%;
//       }

//       .sidebar_menuToggle span:nth-last-child(2) {
//         transform-origin: 0% 100%;
//       }

//       .sidebar_menuToggle input:checked ~ span {
//         opacity: 1;
//         transform: rotate(45deg) translate(1px, -1px);
//         background: #232323;
//       }

//       .sidebar_menuToggle input:checked ~ span:nth-last-child(3) {
//         opacity: 0;
//         transform: rotate(0deg) scale(0.5, 0.5);
//       }

//       .sidebar_menuToggle input:checked ~ span:nth-last-child(2) {
//         transform: rotate(-45deg) translate(-4px, 5px);
//       }

//       //햄버거바 클릭했을 때 메뉴 열고 닫기 기능
//       .sidebar_menuToggle input:checked ~ ul {
//         transform: none;
//       }

//     }
//   }
// `;
