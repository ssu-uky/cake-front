import css from "styled-jsx/css";
import Image from "next/image";
// import Loginimg from "public/images/Loginimg.png";
import Loginimg500 from "public/images/Loginimg500.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import router from "next/router";
import axios from "axios";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const access = sessionStorage.getItem("access");
    if (access) {
      // axios.get(`http://127.0.0.1:8000/api/users/info/`, {
      axios
        .get(`https://manage.naekkukae.store/api/users/info/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        .then((response) => {
          const user_pk = response.data.user_pk;
          router.push(`/caketables/${user_pk}/`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("모든 항목을 채워주세요.");
      return;
    }

    try {
      const response = await fetch(
        // `http://127.0.0.1:8000/api/users/login/`,
        `https://manage.naekkukae.store/api/users/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("로그인 오류");
      }

      const data = await response.json();
      console.log(data);

      const accessToken = data.token.access;
      const refreshToken = data.token.refresh;

      sessionStorage.setItem("access", accessToken);
      sessionStorage.setItem("refresh", refreshToken);

      // caketable 존재 확인
      const user_pk = data.user_pk;
      console.log(user_pk);

      const caketableResponse = await fetch(
        // `http://127.0.0.1:8000/api/caketables/${user_pk}/`
        `https://manage.naekkukae.store/api/caketables/${user_pk}/`
      );
      // 백엔드 데이터에 user_pk를 가진 사람 정보 확인 중 tablecolor 가 있으면 본인 페이지로 이동
      //  tablecolor 가 없다면 Useruse로 이동
      const caketableData = await caketableResponse.json();
      if (caketableData[0] && caketableData[0].tablecolor) {
        router.push(`/caketables/${user_pk}`);
      } else {
        router.push("/Useruse");
      }

      console.log(caketableData.tablecolor, email, password);
    } catch (error) {
      alert("아이디와 비밀번호를 다시 확인해주세요");
      console.log(error);
      console.log("아이디와 비밀번호를 다시 확인해주세요");
    }
  };

  const handleSignup = async () => {
    router.push("signup/");
  };

  const handleFindPw = async () => {
    router.push("resetpw/");
  };

  return (
    <div className="email_container">
      <br></br>
      <br></br>
      <div className="login_img">
        <Image src={Loginimg500} alt="loginimg" layout="responsive" />
      </div>
      <h1> 네가 꾸민 케이크 </h1>
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="email_label">
          <input
            type="email"
            id="input2"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "아이디")}
            className="email_input"
          />
        </div>
        <div className="email_label">
          <input
            type="password"
            id="input3"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "비밀번호")}
            className="email_input"
          />
        </div>
        <div className="login_button">
          <button type="submit" className="login_btn">
            로그인
          </button>
        </div>
        <div className="find_button">
          <li>아이디 찾기</li>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <li onClick={handleFindPw} style={{ cursor: "pointer" }}>
            비밀번호 찾기
          </li>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <li onClick={handleSignup} style={{ cursor: "pointer" }}>
            회원가입
          </li>
        </div>
      </form>

      <style jsx>{email_login}</style>
    </div>
  );
}

const email_login = css`
  @font-face {
    font-family: "Bazzi";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  .email_container {
    // padding: 5vw 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #f7bedf;
    color: white;
    text-align: center;
    align-items: center;
    vertical-align: middle;
    //중앙정렬
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login_img {
    width: 300px;
    height: auto;
    margin: 0 auto;
  }

  h1 {
    font-family: "Bazzi";
    font-size: 45px;
    margin-bottom: 20px;
  }

  .login_form {
    font-family: "Bazzi";
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    margin: 20px;
  }

  .email_label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 15px;
  }

  .email_input {
    font-size: 18px;
    width: 255px;
    height: 50px;
    border: none;
    border-radius: 5px;
    // outline: none;
    margin: 0 auto;
    padding-left: 10px;
    align-items: center;
    vertical-align: middle;
    outline-color: #f073cd;
  }

  .login_btn {
    width: 120px;
    height: 45px;
    align-items: center;
    vertical-align: middle;
    justify-content: center;
    margin: 20px;
    border: none;
    border-radius: 25px;
    color: white;
    background-color: #f073cd;
    font-size: 20px;
    // background-color: white;
  }

  .find_button {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    margin-top: 10px;
    color: white;
    text-decoration: none;
    list-style: none;
  }

  @media (max-width: 640px) {
    .email_container {
      padding:8vw 0;
      width: 100vw;
      height: 100%;
      overflow: hidden;
      background-color: #f7bedf;
      color: white;
      text-align: center;
      align-items: center;
      vertical-align: middle;
      //중앙정렬
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .login_img {
      width: 200px;
      height: auto;
    }
    h1 {
      font-size: 37px;
      margin-bottom: 20px;
    }
    .email_input {
      font-size: 15px;
      width: 220px;
      height: 45px;
      border: none;
      border-radius: 10px;
      margin: -5px 0;
    }

    .login_btn {
      width: 115px;
      height: 45px;
      align-items: center;
      vertical-align: middle;
      justify-content: center;
      margin: 20px;
      border: none;
      border-radius: 25px;
      color: white;
      background-color: #f073cd;
      margin: 15px;
    }

    .find_button {
      display: flex;
      flex-direction: row;
      font-size: 15px;
      margin-top: 10px;
      color: white;
      text-decoration: none;
      list-style: none;
    }
  }

  @media(max-width: 376px) {
    .email_container {
      padding:8vw 0;
      width: 100vw;
      height: 100%;
      overflow: hidden;
      background-color: #f7bedf;
      color: white;
      text-align: center;
      align-items: center;
      vertical-align: middle;
      //중앙정렬
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .login_img {
      width: 170px;
      height: auto;
      margin-top: 30px;
    }
    h1 {
      font-size: 28px;
      // margin-bottom: -7px;
    }
    .email_input {
      font-size: 13px;
      width: 200px;
      height: 45px;
      border: none;
      border-radius: 10px;
    }

    .login_btn {
      width: 80px;
      height: 35px;
      font-size: 14px;
      align-items: center;
      vertical-align: middle;
      justify-content: center;
      // margin: 10px;
      border: none;
      border-radius: 20px;
      color: white;
      background-color: #f073cd;
    }

    .find_button {
      display: flex;
      flex-direction: row;
      font-size: 12px;
      margin-top: 7px;
      color: white;
      text-decoration: none;
      list-style: none;
    }
  }
`;
