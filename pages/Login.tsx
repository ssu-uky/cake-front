"use client";

import css from "styled-jsx/css";
import Image from "next/image";
import Loginimg from "public/images/Loginimg.png";
import Loginimg2 from "public/images/Loginimg2.png";
import Loginimg500 from "public/images/Loginimg500.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faComment } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { useEffect } from "react";

export default function Login() {
  const handleKakaoLogin = () => {
    // 로그인 페이지로 리디렉션
    // window.location.href = "http://127.0.0.1:8000/api/users/signin/kakao/"; // 로컬용
    window.location.href = `https://manage.naekkukae.store/api/users/signin/kakao/`;
  };

  return (
    <div className="login_container">
      <h1>네가 꾸민 케이크</h1>
      <div className="login_img">
        <Image
          src={Loginimg500}
          alt="loginimg"
          layout="responsive"
        />
      </div>
      <div className="login_btn_container">
        <button className="login_kakao_btn loginbtn" onClick={handleKakaoLogin}>
          <div className="login_text_box"  style={{textDecoration:"none", color:"black"}}>
            <FontAwesomeIcon icon={faComment} className="icon" />
            &nbsp; 카카오 로그인
          </div>
        </button>
        <br></br>
        <br></br>
        <Link href="/login/email">
          <button className="login_email_btn loginbtn">
            <div className="login_text_box" style={{textDecoration:"none", color:"black"}} >
              <FontAwesomeIcon icon={faEnvelope} className="icon"/>
              &nbsp; 이메일 로그인
            </div>
          </button>
        </Link>
      </div>
      <style jsx>{login}</style>
    </div>
  );
}

const login = css`

  .login_container {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
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


  h1 {
    text-align: center;
    font-size: 60px;
    margin-top: 10vh;
    margin-bottom: 3vh;
    font-family: "Bazzi";
  }

  .login_img{
    width: 450px;
    height: 430px;
    margin: 0 auto;
    }

  .login_btn_container {
    margin-top: 5vh;
  }

  .login_text_box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .loginbtn {
    width: 350px;
    height: 65px;
    border-radius: 15px;
    border: none;
    font-size: 22px;
    cursor: pointer;
    color: black;
    font-family: "Bazzi";
    background-color: yellow;
    margin-bottom: 10px;
  }

  .login_email_btn {
    background-color: white;
    color: black;
  }


  // 반응형 미디어쿼리

  @media (max-width: 768px) {
    .login_container {
      width: 100vw;
      height: 100vh;
      }

    h1 {
    font-size: 47px;
    margin-top: 12vh;
    font-family: "Bazzi";
    }

    .login_img{
      width: 300px;
      height: auto;
      margin: 0 auto;
      }

    .login_btn_container {
    margin-top: 6vh;
    }

  .login_text_box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto; 
  }

  .loginbtn {
    width: 255px;
    height: 55px;
    border-radius: 15px;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: black;
    font-family: "Bazzi";
    background-color: yellow;
    // margin-bottom: 7px;
    }

  .login_email_btn {
    background-color: white;
    color: black;
    }
  }


  @media (max-width: 376px) {
    .login_container {
      width: 100vw;
      height: 100vh;
      }

    h1 {
    font-size: 40px;
    margin-top: 12vh;
    font-family: "Bazzi";
    margin-bottom: 3vh;
    }

    .login_img{
      width: 250px;
      height: auto;
      margin:0 auto;
    }

    .login_btn_container {
    margin-top: 6vh;
    }

  .login_text_box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto; 
  }

  .loginbtn {
    width: 240px;
    height: 52px;
    border-radius: 15px;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: black;
    font-family: "Bazzi";
    background-color: yellow;
    margin-bottom: 5px;
    }

  .login_email_btn {
    background-color: white;
    color: black;
    }
}
`;
