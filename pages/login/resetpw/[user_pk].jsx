import css from "styled-jsx/css";
import Image from "next/image";
import Loginimg500 from "public/images/Loginimg500.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import router from "next/router";
import axios from "axios";

export default function ResetPw() {
  const router = useRouter();
  const { user_pk } = router.query;
  const [new_password, setNewPassword] = useState("");
  const [check_password, setCheckPassword] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);

  useEffect(() => {
    if (user_pk) {
      // user_pk가 정상적으로 가져와졌을 때 처리
      console.log(user_pk);
    }
  }, [user_pk]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new_password !== check_password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        // `http://127.0.0.1:8000/api/users/login/resetpw/${user_pk}/`,
        `https://manage.naekkukae.store/api/users/login/resetpw/${user_pk}/`,
        {
          new_password: new_password,
          check_password: check_password,
        }
      );
      alert(response.data.detail);
      router.push("/");
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
      alert("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 비밀번호 변경 (비밀번호는 소문자 + 숫자로 구성되어야 함)
  const handlePasswordChange = (e) => {
    const password = e.target.value;

    // 대문자 확인
    const capsLockOn = password.match(/[A-Z]/) && !password.match(/[a-z]/);
    const capsLockMessage = capsLockOn ? "Caps Lock이 켜져 있습니다." : "";

    // 소문자, 숫자 확인
    const passwordFormatValid = /^(?=.*[a-z])(?=.*\d)/.test(password);
    const formatValidationMessage = passwordFormatValid
      ? ""
      : "비밀번호는 소문자와 숫자로 구성되어야 합니다.";

    const validationMessageElement = document.getElementById(
      "password-validation-message"
    );
    validationMessageElement.textContent =
      capsLockMessage || formatValidationMessage;
  };

  return (
    <div className="reset_container">
      {/* <div className="reset_pw"> */}
      <br></br>
      <br></br>
      <div className="login_img">
        <Image src={Loginimg500} alt="loginimg" layout="responsive" />
      </div>
      {/* </div> */}
      {/* <h1> 네가 꾸민 케이크 </h1> */}
      <h1>비밀번호 재설정</h1>
      {/* <h2> 비밀번호 재설정 </h2> */}
      <div className="login_form">
        <form onSubmit={handleSubmit}>
          <div className="email_label">
            <input
              type="password"
              placeholder="새 비밀번호"
              value={new_password}
              onChange={(e) => {
                setNewPassword(e.target.value);
                handlePasswordChange(e);
              }}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "새 비밀번호")}
              className="email_input"
              minLength={8}
              maxLength={14}
            />
          </div>
          <div id="password-validation-message"></div>
          <div className="email_label">
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={check_password}
              onChange={(e) => setCheckPassword(e.target.value)}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "새 비밀번호 확인")}
              className="email_input"
              minLength={8}
              maxLength={14}
            />
          </div>
          <div className="signup-error"></div>
          <div className="login_button">
            <button type="submit" className="login_btn">
              확인
            </button>
          </div>
        </form>
      </div>
      <style jsx>{resetPw}</style>
    </div>
  );
}

const resetPw = css`
  @font-face {
    font-family: "Bazzi";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  .reset_container {
    padding-top: 40px;
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
    width: 350px;
    height: auto;
    margin: 0 auto;
  }

  h1 {
    font-family: "Bazzi";
    font-size: 45px;
  }

  .login_form {
    font-family: "Bazzi";
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
  }

  .email_label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
    
  .email_input {
    margin-top: 20px;
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

  .emaillogin_container .emaillogin_label:first-child {
    margin-top: 20px;
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
    font-size: 22px;
    // background-color: white;
  }

  #password-validation-message {
    font-family: "Bazzi";
    font-size: 15px;
    color: red;
    opacity: 0.7;
    height: 30px;
    position: relative;
    text-align: right;
  }

  .signup-error {
    font-family: "Bazzi";
    font-size: 15px;
    color: red;
    opacity: 0.7;
    right: 0;
    margin: 20px;
  }

  @media (max-width: 640px) {
    .login_img {
      width: 280px;
      height: auto;
      margin-top: 30px;
    }

    h1 {
      font-size: 40px;
      margin-bottom: 20px;
    }
    .email_input {
      font-size: 17px;
      width: 230px;
      height: 45px;
      border: none;
      border-radius: 5px;
    }

    .login_btn {
      width: 115px;
      height: 45px;
      align-items: center;
      vertical-align: middle;
      justify-content: center;
      border: none;
      border-radius: 25px;
      color: white;
      font-size: 18px;
      background-color: #f073cd;
    }
  }

  @media (max-width: 376px) {
    .login_img {
      width: 200px;
      height: auto;
      margin-top: 30px;
      margin-bottom: 10px;
    }

    h1 {
      font-size: 35px;
    }

    .email_input {
      font-size: 15px;
      width: 200px;
      height: 45px;
      border: none;
      border-radius: 5px;
    }

    .login_btn {
      width: 100px;
      height: 40px;
      align-items: center;
      vertical-align: middle;
      justify-content: center;
      border: none;
      border-radius: 25px;
      color: white;
      background-color: #f073cd;
    }

  }
`;
