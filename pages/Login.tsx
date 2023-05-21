"use client";

import css from "styled-jsx/css";
import Image from "next/image";
import Loginimg from "public/images/Loginimg.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faComment } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useEffect } from "react";

export default function Login() {
    const handleKakaoLogin = () => {
        // 로그인 페이지로 리디렉션
        // window.location.href = "http://127.0.0.1:8000/api/users/signin/kakao/";  // 로컬용
        window.location.href = `https://manage.naekkukae.store/api/users/signin/kakao/`;
    };

    return (
        <div className="login_container">
            <h1 className="login_title">네가 꾸민 케이크</h1>
            <Image
                src={Loginimg}
                alt="loginimg"
                width={300}
                height={250}
                className="login_img"
            />
            <div className="login_btn_container">
                <button
                    className="login_kakao_btn loginbtn"
                    onClick={handleKakaoLogin}
                >
                    <div className="login_text_box">
                        <FontAwesomeIcon icon={faComment} className="icon" />
                        &nbsp; 카카오 로그인
                    </div>
                </button>
                <br></br>
                <br></br>
                <Link href="/login/email">
                    <button className="login_email_btn loginbtn">
                        <div className="login_text_box">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="icon"
                            />
                            &nbsp; 이메일 로그인
                        </div>
                    </button>
                </Link>

                {/* <Link href="/components/signup">
          <button className="login_email_btn loginbtn">
            <div className="login_text_box">
              <FontAwesomeIcon icon={faEnvelope} />
              이메일 로그인
            </div>
          </button>
        </Link> */}
            </div>
            <style jsx>{login}</style>
        </div>
    );
}

const login = css`
    @font-face {
        font-family: "Bazzi";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
            format("woff");
        font-weight: normal;
        font-style: normal;
    }

    .login_container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: #f7bedf;
        color: white;
        text-align: center;
        //중앙정렬
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .login_title {
        text-align: center;
        font-size: 55px;
        margin-top: 10vh;
        margin-bottom: 8vh;
        font-family: "Bazzi";
    }

    .login_btn_container {
        margin-top: 8vh;
    }

    .login_text_box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }

    .loginbtn {
        width: 300px;
        height: 60px;
        border-radius: 15px;
        border: none;
        font-size: 20px;
        cursor: pointer;
        font-family: "Bazzi";
        background-color: yellow;
        margin-bottom: 5px;
    }

    .login_email_btn {
        background-color: white;
    }
`;

// const login = css`
//   @font-face {
//     font-family: "Bazzi";
//     src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
//       format("woff");
//     font-weight: normal;
//     font-style: normal;
//   }
//   .login_container {
//     width: 500px;
//     height: 100vh;
//     background-color: #f7bedf;
//     color: white;
//     text-align: center;
//     //중앙정렬
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
//   .login_title {
//     text-align: center;
//     font-size: 55px;
//     margin-top: 15vh;
//     margin-bottom: 10vh;
//     font-family: "Bazzi";
//   }

//   .login_btn_container {
//     margin-top: 7vh;
//   }
//   .login_text_box {
//     display: flex;
//     justify-content: center;
//   }
//   span {
//     margin-left: 0px;
//   }
//   .loginbtn {
//     width: 300px;
//     height: 60px;
//     border-radius: 15px;
//     border: none;
//     font-size: 20px;
//     cursor: pointer;
//     font-family: "Bazzi";
//     background-color: yellow;
//     margin-bottom: 10px;
//   }
// `;
