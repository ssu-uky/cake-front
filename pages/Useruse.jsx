import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import Image from "next/image";
import cakeimg from "public/images/Caketable.png";
import { createGlobalStyle } from "styled-components";
import css from "styled-jsx/css";
// import Sidebar from "pages/components/Sidebar.jsx";
import { useRouter } from "next/router";

export default function Useruse() {
  const router = useRouter();
  const user_pk = router.query.user_pk;

  const [tablecolor, setTableColor] = useState("#ffffff");
  const [nickname, setNickname] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = () => {
      return window.sessionStorage.getItem("access");
    };
    setToken(getToken());
  }, []);

  const isLoggedIn = () => {
    return token !== "";
  };

  const handleChange = (newColor) => {
    setTableColor(newColor.hex);
    document.getElementById("image-container").style.backgroundColor =
      newColor.hex;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      alert("로그인이 필요합니다");
      window.location.href = "/Login";
      return;
    }

    // fetch(`http://127.0.0.1:8000/api/caketables/new/`, {
    fetch(`https://manage.naekkukae.store/api/caketables/new/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        tablecolor: tablecolor,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("1-케이크는 하나만 생성이 가능합니다.");
        }
        return response.json();
      })
      .then((data) => {
        const { owner } = data;
        router.push(`/caketables/${owner}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("2-케이크는 하나만 생성이 가능합니다.");
      });
    console.log(user_pk, nickname, tablecolor);
  };

  return (
    <div className="useruse_container">
      <Global />
      {/* <Sidebar /> */}
      <form className="useruse_form" onSubmit={handleSubmit}>
        <div className="useruse_nickname_container font">
          <label htmlFor="nickname" className="useruse_name font">
            닉네임 :
          </label>
          <input
            type="text"
            maxLength="7"
            className="useruse_nickname font"
            id="nickname"
            value={nickname}
            placeholder="닉네임을 입력해주세요"
            onChange={(event) => setNickname(event.target.value)}
          />
        </div>
        <div className="useruse_color_button">
          <ChromePicker
            id="color-picker"
            layout="responsive"
            color={tablecolor}
            onChange={handleChange}
            width={450}
            height={400}
          />
          <div id="image-container" style={{ backgroundColor: tablecolor }}>
            <Image
              src={cakeimg}
              id="color-picker"
              layout="responsive"
              width={600}
              height={550}
            />
          </div>
        </div>
        <button type="submit" className="useruse_submit_button font">
          만들기
        </button>
      </form>
      <style jsx>{useruse}</style>
    </div>
  );
}

//react-color custom
const Global = createGlobalStyle`
.flexbox-fix:last-child {
  visibility: hidden;
}
.flexbox-fix:nth-child(1) {
  visibility: hidden;
}
.chrome-picker > div > div:nth-child(1){
  height:100px;
  /* margin-top: 50px; */
}
.chrome-picker:nth-child(1){
  height:100px;
  
}
.hue-horizontal {
  visibility: visible;
  position: fixed;
  top: -175px;
  left: -15px;
}

@media(max-width: 450px){
  .useruse_container{
    width: 80%;
    height: 90%;
  }

  .saturation-black{
    width: 100vw;
    height: 100%;
  }
  .saturation-white{
    width: 100vw ;
    height: 100%;
  }

  .chrome-picker{
    width: 100%;
    margin: 20px 0;
  }

  .chrome-picker:nth-child(1){
    width: 100%;
  }

  .hue-horizontal{
    width: 80vw;
    // center: 50% !important;
    left: -12%;
  }
`;

const useruse = css`
  #image-container {
    width: 450px;
    height: 450px;
  }

  #color-picker {
    width: 450px;
    height: 400px;
  }

  @font-face {
    font-family: "Bazzi";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  .font {
    font-family: "Bazzi";
  }

  // 전체 배경 //
  .useruse_container {
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

  // 전체 이동 //
  .useruse_nickname_container {
    margin-top: 10vh;
    padding: 5vh;
  }

  // 닉네임 : //
  .useruse_name {
    font-size: 35px;
    vertical-align: middle;
    margin-right: 10px;
  }

  // 닉네임 입력창 //
  .useruse_nickname {
    border: none;
    height: 40px;
    width: 200px;
    border-radius: 15px;
    text-align: center;
    font-size: 25px;
    vertical-align: middle;
    align-items: center;
    line-height: 40px;
  }

  .useruse_nickname::placeholder {
    margin: 0 auto;
    padding: 5px;
    font-size: 15px;
    text-align: center;
    vertical-align: middle;
    align-items: center;
    align-content: center;
    line-height: 40px;
  }

  .useruse_nickname:focus {
    border: 2px solid #f073cd;
    outline: none;
  }

  // 색상 선택창 //
  .useruse_color_button {
    height: 400px;
    width: 450px;
    margin: 0 auto;
  }

  // 보내기 버튼 //
  .useruse_submit_button {
    position: relative;
    border: none;
    margin: 0 auto;
    border-radius: 15px;
    height: 40px;
    width: 100px;
    font-size: 20px;
    margin-top: 200px;
    color: white;
    background-color: #f073cd;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
  }

  @media (max-width: 640px) {
    .useruse_container {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }

    .useruse_nickname_container {
      margin-top: -1vh;
      margin-bottom: -7vw;
    }

    .useruse_form {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      position: absolute;
      top: 10vw;
      transform: translate(10vw, 10vw);
      overflow: hidden;
      background-color: #f7bedf;
    }

    .useruse_name {
      font-size: 24px;
      vertical-align: middle;
      align-items: center;
      align-content: center;
      margin-right: 7px;
    }

    .useruse_nickname {
      border: none;
      height: 35px;
      width: 150px;
      border-radius: 15px;
      font-size: 20px;
    }

    .useruse_nickname::placeholder {
      margin: 0 auto;
      padding: 3px;
      font-size: 15px;
      line-height: 15px;
      text-align: center;
      vertical-align: middle;
      align-items: center;
      align-content: center;
    }

    .useruse_nickname:focus {
      border: 2px solid #f073cd;
      outline: none;
    }

    #image-container {
      position: fixed;
      width: 100%;
      height: auto;
    }

    #color-picker {
      width: 80%;
      height: 200px;
    }

    .useruse_color_button {
      width: 450px;
      height: 230px;
      margin: 0 auto;
    }

    .useruse_submit_button {
      height: 35px;
      width: 90px;
      border-radius: 15px;
      font-size: 20px;
      color: white;
      background-color: #f073cd;
      cursor: pointer;
      position: relative;
      margin: 0 auto;
      top: 32vh;
      // transform: translate(10%, 80%);
    }
  }

  @media (max-width: 350px) {
    .useruse_submit_button {
      height: 35px;
      width: 87px;
      border-radius: 15px;
      font-size: 18px;
      color: white;
      background-color: #f073cd;
      cursor: pointer;
      position: relative;
      margin: 0 auto;
      top: 23vh;
    }
  }
`;
