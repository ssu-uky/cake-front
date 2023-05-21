import css from "styled-jsx/css";
import Image from "next/image";
import Loginimg from "public/images/Loginimg.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import router from "next/router";
import axios from "axios";

export default function Findpw() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                // "http://127.0.0.1:8000/api/users/login/findpw/",
                "https://manage.naekkukae.store/api/users/login/findpw/",
                {
                    email: email,
                }
            );
            console.log("Password reset link:", response.data.link);
            alert(
                "비밀번호 재설정 링크를 이메일로 전송되었습니다. 이메일을 확인해주세요!"
            );
            router.push("/");
        } catch (error) {
            console.error("비밀번호 재설정 링크 전송 실패:", error);
            alert("가입 된 이메일이 없습니다.");
        }
    };

    return (
        <div className="reset_container">
            {/* <div className="reset_pw"> */}
            <br></br>
            <br></br>
            <div className="login__img">
                <Image
                    src={Loginimg}
                    alt="로그인 이미지"
                    width={180}
                    height={130}
                    className="loginimg"
                />
                {/* </div> */}
                {/* <h1> 네가 꾸민 케이크 </h1> */}
                <h1>비밀번호 찾기</h1>
                {/* <h2> 비밀번호 재설정 </h2> */}
                <div className="login_form">
                    <form onSubmit={handleSubmit}>
                        <div className="find_form_input">
                            <input
                                type="email"
                                placeholder="가입하셨던 이메일을 입력해주세요."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={(e) => (e.target.placeholder = "")}
                                onBlur={(e) => (e.target.placeholder = "ID")}
                                className="email_input"
                            />
                        </div>
                        <div className="login_button">
                            <button type="submit" className="login_btn">
                                확인
                            </button>
                        </div>
                    </form>
                </div>
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
        margin: 10vh;
        display: block;
        text-align: center;
    }

    h1 {
        font-family: "Bazzi";
        font-size: 40px;
        margin-top: 20px;
    }

    .login_form {
        font-family: "Bazzi";
        display: flex;
        flex-direction: column;
        align-items: center;
        // justify-content: center;
        margin: 20px;
    }

    .email_input {
        font-family: "Bazzi";
        font-size: 15px;
        width: 230px;
        height: 45px;
        border: none;
        border-radius: 5px;
        outline: none;
        margin: 0 auto;
        padding-left: 10px;
        align-items: center;
        vertical-align: middle;
    }

    .reset_form_input {
        margin-bottom: 10px;
    }

    .login_btn {
        width: 100px;
        height: 40px;
        align-items: center;
        vertical-align: middle;
        justify-content: center;
        margin-top: 15px;
        border: none;
        border-radius: 25px;
        background-color: #f073cd;
        color: white;
    }

    // .login_btn:hover {
    //     background-color: #f073cd;
    //     color: white;
    // }
`;
