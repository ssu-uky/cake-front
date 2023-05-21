import css from "styled-jsx/css";
import Image from "next/image";
import Loginimg from "public/images/Loginimg.png";
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
            <Image
                src={Loginimg}
                alt="로그인 이미지"
                width={180}
                height={130}
                className="loginimg"
            />
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
        width: 100vw;
        height: 100vh;
        // overflow: hidden;
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

    .email_label {
        font-family: "Bazzi";
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 10px;
        // width: 100%;
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

    .login_btn {
        width: 100px;
        height: 40px;
        align-items: center;
        vertical-align: middle;
        justify-content: center;
        margin-top: 15px;
        border: none;
        border-radius: 25px;
        background-color: white;
    }

    .login_btn:hover {
        background-color: #f073cd;
        color: white;
    }

    .find_button {
        font-family: "Bazzi";
        display: flex;
        flex-direction: row;
        font-size: 15px;
        margin-top: 20px;
        margin-bottom: 10px;
        color: white;
        text-decoration: none;
        list-style: none;
    }
`;
