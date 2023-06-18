import css from "styled-jsx/css";
import Image from "next/image";
import Loginimg500 from "public/images/Loginimg500.png";
import router from "next/router";
import axios from "axios";

export default function Email_login() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력된 데이터를 가져옵니다.
    const name = document.getElementById("input1").value;
    const email = document.getElementById("input2").value;
    const password = document.getElementById("input3").value;
    const passwordConfirm = document.getElementById("input4").value;

    if (!name || !email || !password || !passwordConfirm) {
      alert("모든 항목을 채워주세요.");
      return;
    }

    // 이름 형식 확인 (이름은 알파벳으로만 이루어지거나, 한글로만 이루어져야함/ 모음,자음 따로 안됨, 2-7길이)
    if (!/^[A-Za-z]{2,7}$|^[가-힣]{2,7}$/.test(name)) {
      alert("이름을 올바르게 입력해주세요.");
      return;
    }

    // 대문자 확인 (비밀번호는 소문자+숫자 구성)
    if (!/^(?=.*[a-z])(?=.*\d)/.test(password)) {
      if (password.match(/[A-Z]/) && !password.match(/[a-z]/)) {
        const validationMessage =
          "Caps Lock이 켜져 있습니다. Caps Lock을 끄고 다시 입력해주세요.";
        const validationMessageElement = document.getElementById(
          "password-validation-message"
        );
        validationMessageElement.textContent = validationMessage;
      } else {
        const validationMessage =
          "비밀번호는 소문자와 숫자로만 구성되어야 합니다.";
        const validationMessageElement = document.getElementById(
          "password-validation-message"
        );
        validationMessageElement.textContent = validationMessage;
      }
      return;
    }

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios
      .post(
        "https://manage.naekkukae.store/api/users/signup/email/",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Server response:", response.data);

        alert(
          "회원가입이 완료되었습니다. 이메일 인증을 하신 후 로그인 해주세요!"
        );
        // alert("회원가입이 완료되었습니다. 로그인을 해주세요!");
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            alert("이미 존재하는 이메일입니다.");
            console.log("이미 존재하는 이메일입니다.");
          } else {
            console.log("서버 오류:", error.response.data);
          }
        } else {
          console.log("요청 실패:", error.message);
        }
      });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    // 대문자 확인
    const capsLockOn = password.match(/[A-Z]/) && !password.match(/[a-z]/);
    const capsLockMessage = capsLockOn ? "Caps Lock이 켜져 있습니다." : "";

    // 소문자, 숫자 확인
    const passwordFormatValid = /^(?=.*[a-z])(?=.*\d)/.test(password);
    const formatValidationMessage = passwordFormatValid
      ? ""
      : "비밀번호는 소문자와 숫자로 8자 이상입니다.";

    const validationMessageElement = document.getElementById(
      "password-validation-message"
    );
    validationMessageElement.textContent =
      capsLockMessage || formatValidationMessage;
  };

  return (
    <div className="emaillogin_container">
      <br></br>
      <br></br>
      <div className="login_img">
        <Image src={Loginimg500} alt="loginimg" layout="responsive" />
      </div>
      <h1>회원가입</h1>
      <form className="emaillogin_form" onSubmit={handleSubmit}>
        <div className="emaillogin_label">
          <label htmlFor="input1">이름 : </label>
          <input
            type="name"
            placeholder="이름을 입력해주세요"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "이름을 입력해주세요")}
            className="emaillogin_input"
            id="input1"
            minLength={2}
            maxLength={7}
          />
          <div className="signup-error"></div>
        </div>
        <div className="emaillogin_label">
          <label htmlFor="input2">이메일 : </label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "이메일을 입력해주세요")}
            className="emaillogin_input"
            id="input2"
          />
          <div className="signup-error"></div>
        </div>
        <div className="emaillogin_label">
          <label htmlFor="input3">비밀번호 : </label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "비밀번호를 입력해주세요")}
            className="emaillogin_input"
            id="input3"
            minLength={8}
            maxLength={14}
            onChange={handlePasswordChange}
          />
          <div id="password-validation-message"></div>
        </div>
        <div className="emaillogin_label">
          <label htmlFor="input4">비밀번호 확인 : </label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = "비밀번호를 다시 입력해주세요")
            }
            className="emaillogin_input"
            id="input4"
            minLength={8}
            maxLength={14}
          />
          <div className="signup-error"></div>
        </div>

        <button type="submit" className="emaillogin_button">
          회원가입
        </button>
      </form>

      <style jsx>{emaillogin}</style>
    </div>
  );
}

const emaillogin = css`
  .emaillogin_container {
    font-family: "Bazzi";
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
    width: 230px;
    height: auto;
    margin: 0 auto;
    paddinf: 10px;
  }

  h1 {
    font-size: 45px;
    margin-bottom: 10px;
  }

  .emaillogin_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    vertical-align: middle;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .emaillogin_form > label {
    vertical-align: middle;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .emaillogin_label > label {
    font-family: "Bazzi";
    font-size: 20px;
    display: inline-block;
    width: 120px;
    vertical-align: middle;
    // margin-bottom: 12px;
    margin-right: 10px;
  }

  
  .emaillogin_input {
    align-items: center;
    text-align: center;
    vertical-align: middle;
    width: 235px;
    border: none;
    height: 50px;
    border-radius: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
    font-size: 17px;
    outline-color: #f073cd;
  }

  .emaillogin_label:first-child {
    margin-top: 10px;
  }
  

  .emaillogin_button {
    width: 170px;
    height: 50px;
    align-items: center;
    vertical-align: middle;
    justify-content: center;
    border: none;
    border-radius: 25px;
    background-color: #f073cd;
    color: white;
    margin-top: 5px;
    font-size: 20px;
  }

  #password-validation-message {
    font-family: "Bazzi";
    font-size: 15px;
    color: red;
    opacity: 0.7;
    height: 30px;
    margin-top: -10px;
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

  @media (max-width: 768px) {
    .login_img {
      width: 200px;
      height: auto;
      margin: 0 auto;
      padding-top: 3vh;
    }

    h1{
      font-size: 40px;
    }
    .emaillogin_form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px;
    }
  
    .emaillogin_label > label {
      font-size: 18px;
      // display: inline-block;
      width: 100px;
      vertical-align: middle;
      margin-right: 10px;
      margin-bottom: 12px;
    }
  
    .emaillogin_input {
      align-items: center;
      text-align: center;
      vertical-align: middle;
      width: 235px;
      height: 50px;
      border-radius: 10px;
      margin-bottom: 10px;
      justify-content: flex-start;
      font-size: 18px;
      outline-color: #f073cd;
    }
  
    @media (max-width: 640px) {
      .login_img {
        width: 200px;
        height: auto;
        margin: 0 auto;
      }
  
      h1{
        font-size: 30px;
        margin-top: 10px;
      }

      .emaillogin_form {
        display: flex;
        margin: 0 auto;
        flex-direction: column;
        align-items: center;
        margin: 10px;
      }
    
      .emaillogin_label > label {
        // margin-top: 20px;
        display: none;
      }
    
      .emaillogin_input {
        align-items: center;
        text-align: center;
        width: 230px;
        height: 45px;
        border-radius: 10px;
        font-size: 15px;
        outline-color: #f073cd;
        margin-bottom: 10px;
      }

    .emaillogin_button {
      width: 130px;
      height: 45px;
      align-items: center;
      vertical-align: middle;
      justify-content: center;
      border: none;
      border-radius: 25px;
      background-color: #f073cd;
      color: white;
      margin-top: 5px;
      font-size: 17px;
    }
  }

  @media (max-width: 376px){
    .login_img {
      width: 150px;
      height: auto;
      margin: 0 auto;
      margin-top: 40px;
    }
    h1{
      font-size: 30px;
    }

    .emaillogin_form {
      display: flex;
      margin: 0 auto;
      flex-direction: column;
      align-items: center;
      margin: 10px;
    }
  
    .emaillogin_label > label {
      display: none;
    }
  
    .emaillogin_input {
      align-items: center;
      text-align: center;
      width: 180px;
      height: 40px;
      border-radius: 10px;
      font-size: 12px;
      outline-color: #f073cd;
      margin-bottom: 10px;
    }

  .emaillogin_button {
    width: 120px;
    height: 40px;
    align-items: center;
    vertical-align: middle;
    justify-content: center;
    border: none;
    border-radius: 25px;
    background-color: #f073cd;
    color: white;
    font-size: 14px;
  }
}

`;
