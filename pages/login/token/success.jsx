import css from "styled-jsx/css";
import Image from "next/image";
import Loginimg from "public/images/Loginimg.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import router from "next/router";
import axios from "axios";

export default function Success() {
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
        <div className="success_container">
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

            <p> 이메일 인증이 완료되어 회원가입이 성공적으로 되었습니다!</p>
            <br></br>
            <p> 3초 뒤에 로그인 페이지로 이동합니다.</p>

            <style jsx>{success_token}</style>
        </div>
    );
}

const success_token = css`
    @font-face {
        font-family: "Bazzi";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
            format("woff");
        font-weight: normal;
        font-style: normal;
    }

    .success_container {
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
        margin-bottom: 40px;
    }

    p {
        font-family: "Bazzi";
        font-size: 17px;
        margin-bottom: 5px;
    }
`;
