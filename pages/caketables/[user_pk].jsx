import css from "styled-jsx/css";
import Image from "next/image";
import Caketable from "public/images/Caketable.png";
import jwt_decode from "jwt-decode";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faAngleLeft,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
// import Sidebar from "../Sidebar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Main() {
    const router = useRouter();
    const { user_pk } = router.query;
    const [cakeData, setCakeData] = useState({});
    const [loggedInUserPk, setLoggedInUserPk] = useState(null);
    const [checkData, setCheckData] = useState(false);

    // access_token이 유효한지 확인하는 함수 추가
    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000;

            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Error:", error);
            return true;
        }
    };

    // 새로운 access_token을 발급받는 함수
    const getNewAccessToken = async (refreshToken) => {
        try {
            // const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            const response = await fetch(
                `https://manage.naekkukae.store/api/token/refresh/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                }
            );

            const data = await response.json();
            return data.access;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    // 로그인한 사용자의 user_pk를 가져오는 함수 추가
    const fetchLoggedInUserPk = async () => {
        const accessToken = sessionStorage.getItem("access");
        const refreshToken = sessionStorage.getItem("refresh");

        if (!accessToken || !refreshToken) return;

        let validAccessToken = accessToken;

        // access_token이 만료되었는지 확인하고, 만료된 경우 새로운 access_token을 발급받음
        if (isTokenExpired(accessToken)) {
            validAccessToken = await getNewAccessToken(refreshToken);
            if (!validAccessToken) return;

            // 새로 발급받은 access_token을 세션 스토리지에 저장
            sessionStorage.setItem("access", validAccessToken);
        }
        try {
            // const response = await fetch("http://127.0.0.1:8000/api/users/info/", {
            const response = await fetch(
                `https://manage.naekkukae.store/api/users/info/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${validAccessToken}`,
                    },
                }
            );

            const data = await response.json();
            setLoggedInUserPk(data.user_pk);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 컴포넌트가 마운트되면 로그인한 사용자의 user_pk를 가져옵니다.
    useEffect(() => {
        fetchLoggedInUserPk();
    }, []);

    // 페이지네이션 구현 시작
    const [currentPage, setCurrentPage] = useState(0);

    const paginateCakes = (array, pageSize) => {
        const pages = [];
        for (let i = 0; i < array.length; i += pageSize) {
            pages.push(array.slice(i, i + pageSize));
        }
        return pages;
    };

    const cakesPerPage = 8;
    const paginatedCakes = cakeData.visitors
        ? paginateCakes(cakeData.visitors, cakesPerPage)
        : [];
    const totalPages = paginatedCakes.length;

    // 이전 페이지 버튼
    const handleBeforePage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 다음 페이지 버튼
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginationText = `${currentPage + 1} / ${
        totalPages !== 0 ? totalPages : 1
    }`;

    // 페이지 네이션 구현 끝 (하단에서 버튼으로 다시 이어짐)

    // 생일 축하해주기 버튼 시작
    const handleClick = (event) => {
        event.preventDefault();
        router.push(`/caketables/${cakeData.user_pk}/cake/`);
    };
    // 생일 축하해주기 버튼 끝

    // 내 케이크 만들기 시작
    const handleMyCake = async () => {
        const accessToken = sessionStorage.getItem("access");

        if (accessToken) {
            try {
                const response = await axios.get(
                    `https://manage.naekkukae.store/api/users/info/`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = response.data;
                router.push(`/caketables/${data.user_pk}/`);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("로그인이 필요합니다.");
            router.push("/Login");
        }
    };
    // 내 케이크 만들기 끝

    // 링크 복사 시작
    const copyURL = async () => {
        try {
            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);
            alert("링크가 복사되었습니다.");
        } catch (error) {
            console.error(error);
        }
    };
    // 링크 복사 끝

    //user 정보
    useEffect(() => {
        if (!user_pk || checkData) return;

        // fetch(`http://127.0.0.1:8000/api/caketables/${user_pk}/`, {
        fetch(`https://manage.naekkukae.store/api/caketables/${user_pk}/`, {
            // 로컬용 (마지막에 / 빼먹지 말기...)
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCakeData(data[0]);
                setCheckData(true);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [user_pk, checkData]);

    const tableColor = cakeData.tablecolor;

    const tablestyle = {
        backgroundColor: tableColor,
    };

    if (checkData) {
        console.log(cakeData);
    }

    // 모달 시작 //
    const [showModal, setShowModal] = useState(false);
    const [selectedCake, setSelectedCake] = useState(null);
    const [selectedVisitor, setSelectedVisitor] = useState(null);

    const handleShowModal = (event, visitor) => {
        event.preventDefault();

        // 로그인 한 본인만 모달창 내용 확인 가능
        if (loggedInUserPk === parseInt(user_pk)) {
            event.preventDefault();
            setSelectedCake(visitor.pickcake);
            setSelectedVisitor(visitor.pk);
            setShowModal(true);
        } else {
            alert("본인만 확인할 수 있습니다.");
        }
    };

    const handleHideModal = () => {
        setSelectedCake(null);
        setSelectedVisitor(null);
        setShowModal(false);
    };

    // 케이크 삭제
    const handleDelete = async () => {
        const accessToken = sessionStorage.getItem("access");
        const confirm = window.confirm("편지를 정말 삭제하시겠습니까?");

        if (confirm) {
            try {
                const response = await fetch(
                    // `http://127.0.0.1:8000/api/caketables/${user_pk}/${selectedVisitor}/`,
                    `https://manage.naekkukae.store/api/caketables/${user_pk}/${selectedVisitor}/`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                console.log(selectedVisitor);

                if (response.ok) {
                    handleHideModal();
                    router.push(`/caketables/${user_pk}/`);
                    fetchLoggedInUserPk();
                } else {
                    console.log("삭제 실패");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    // 모달 끝 //

    return (
        <div className="bg_container">
            <div className="main_container bgimg">
                {/* <Sidebar /> */}
                <p className="main_text_title">
                    {cakeData.nickname}님의 케이크
                </p>
                <p className="main_text_message">
                    {cakeData.total_visitor}명이 축하메세지를 보냈습니다
                </p>
                {/* caketable 내에 cake가 위치하도록 감싸줌  */}
                <div className="caketable-container">
                    <div style={tablestyle}>
                        <Image
                            src={Caketable}
                            alt="caketableimg"
                            width={500}
                            height={450}
                            className="caketable"
                        />

                        {/* pickcake 를 main_cakeImg로 감싸줌  */}
                        <div className="main_cakeImg">
                            {/* 페이지네이션 버튼 구현 (1줄에 4개, 총 2줄) */}
                            {paginatedCakes[currentPage] &&
                                paginatedCakes[currentPage].map(
                                    (visitor, index) => (
                                        <div
                                            className={`pickcake ${
                                                index < 4
                                                    ? "first-row"
                                                    : "second-row"
                                            }`}
                                            key={index}
                                            onClick={(event) =>
                                                handleShowModal(event, visitor)
                                            }
                                        >
                                            {visitor.pickcake ===
                                            selectedCake ? (
                                                <Image
                                                    src={`/images/cakes/${selectedCake}.png`}
                                                    height={100}
                                                    width={100}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    alt="클릭 시 편지와 보이는 케이크"
                                                    priority
                                                />
                                            ) : (
                                                <Image
                                                    src={`/images/cakes/${visitor.pickcake}.png`}
                                                    height={100}
                                                    width={100}
                                                    style={{
                                                        cursor: "pointer",
                                                        margin: 0,
                                                    }}
                                                    alt="테이블에서 보이는 visitor가 선택한 케이크"
                                                    priority
                                                />
                                            )}
                                            <p className="visitor_name">
                                                {visitor.visitor_name}
                                            </p>

                                            {/* 모달 창 코드 시작 */}
                                            {selectedVisitor === visitor.pk && (
                                                <div
                                                    className="modal_container"
                                                    onClick={handleHideModal}
                                                >
                                                    <div className="modal_inner">
                                                        <span
                                                            className="modal_close"
                                                            onClick={(
                                                                event
                                                            ) => {
                                                                event.stopPropagation();
                                                                handleHideModal();
                                                            }}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            닫기&nbsp; &times;
                                                        </span>
                                                        <p
                                                            className="modal_title"
                                                            id={selectedCake}
                                                        >
                                                            {" "}
                                                            🎉&nbsp;{" "}
                                                            {
                                                                visitor.visitor_name
                                                            }{" "}
                                                            🎉{" "}
                                                        </p>
                                                        <br></br>
                                                        <p
                                                            className="modal_body"
                                                            id={selectedCake}
                                                        >
                                                            {" "}
                                                            {
                                                                visitor.letter
                                                            }{" "}
                                                        </p>
                                                        <FontAwesomeIcon
                                                            icon={faTrashCan}
                                                            onClick={
                                                                handleDelete
                                                            }
                                                            style={{
                                                                fontSize:
                                                                    "1.2em",
                                                                color: "#ffffff",
                                                                marginLeft:
                                                                    "70%",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {/* 모달 창 코드 끝 */}
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>

                {/* 페이지네이션 구현 버튼  */}
                <div className="pagebtn">
                    {/* 이전 버튼 */}
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className={`leftbtn ${
                            currentPage === 0 ? "inactive" : ""
                        }`}
                        style={{
                            cursor: currentPage === 0 ? "default" : "pointer",
                            opacity: currentPage === 0 ? 0.5 : 1,
                            color: "white",
                        }}
                        onClick={handleBeforePage}
                    />

                    <span className="pagetext">{paginationText}</span>

                    {/* 다음 버튼 */}
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className={`rightbtn ${
                            currentPage === totalPages - 1 || totalPages === 0
                                ? "inactive"
                                : ""
                        }`}
                        style={{
                            cursor:
                                currentPage === totalPages - 1 ||
                                totalPages === 0
                                    ? "default"
                                    : "pointer",
                            opacity:
                                currentPage === totalPages - 1 ||
                                totalPages === 0
                                    ? 0.5
                                    : 1,
                            color: "white",
                        }}
                        onClick={handleNextPage}

                        // hidden={currentPage === paginatedCakes.length - 1} // 마지막 페이지에서는 오른쪽 버튼 안보이게
                    />
                </div>
                <div className="main_btn_container">
                    <button className="main_btn" onClick={handleClick}>
                        생일 축하해주기
                    </button>
                    <button className="main_btn" onClick={handleMyCake}>
                        내 테이블 만들기
                    </button>
                    <button className="main_btn" onClick={copyURL}>
                        내 테이블 공유하기
                    </button>
                </div>
                <style jsx>{main}</style>
            </div>
        </div>
    );
}

const main = css`
    @font-face {
        font-family: "Bazzi";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
            format("woff");
        font-weight: normal;
        font-style: normal;
    }

    .main_container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-color: #f7bedf;
        color: white;
        text-align: center;
        position: relative;
        font-family: "Bazzi";
        vertical-align: middle;
        align-items: center;
        justify-content: center;
        position: absolute;

        //중앙정렬
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .main_text_title {
        font-size: 2em;
        margin-top: 7vh;
        margin-bottom: 10px;
    }

    .main_text_message {
        font-size: 2em;
        margin-top: -15px;
        margin-bottom: 35px;
    }

    // 케이크 css
    .caketable-container {
        position: relative;
        width: 500px;
        // height: 450px;
        margin: auto;
    }

    .caketable {
        display: inline-block;
        position: relative;
        // width: 500px;
    }

    // 전체 케이크 이동
    .main_cakeImg {
        position: absolute;
        // top: 70%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        width: 100%;
        z-index: 10;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }

    .pickcake {
        width: calc(25% - 10px);
        // margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .visitor_name {
        width: 100%;
        // height: 100%;
        font-size: 1em;
        font-family: "Bazzi";
        text-align: center;
        align-items: center;
        vertical-align: middle;
        margin-top: -5px;
        margin-bottom: 5px;
    }

    .first-row {
        margin-top: -260px;
    }

    .second-row {
        margin-top: -135px;
    }

    // 페이지네이션
    .pagebtn {
        display: flex;
        flex-direction: row;
        justify-content: center;
        vertical-align: middle;
        align-items: center;
        font-family: "Bazzi";
        font-size: 1.5em;
        margin: 0 auto;
        margin-top: 30px;
    }

    .pagetext {
        font-size: 0.8em;
        font-family: "Bazzi";
        align-items: center;
        vertical-align: middle;
        text-align: center;
        margin: 0 20px;
    }

    // 모달 창
    .modal_container {
        width: 100%;
        height: 350px;
        border-radius: 20px;
        font-family: "Bazzi";
        background-color: rgba(247, 191, 224, 0.8);
        // backdrop-filter: blur(1px);
        // color: black;
        color: f073cd;
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 25px;
        z-index: 100;
        display: flex;
        justify-content: center;
        // align-items: flex-end;
    }

    .modal_inner {
        width: 90%;
        height: 80%;
        display: relative;
        margin: 0 auto;
        vertical-align: middle;
        align-items: center;
        background-color: #f073cd;
        border-radius: 20px;
        margin-top: 50px;
    }

    .modal_close {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        font-size: 17px;
    }

    .modal_title {
        // color: #f073cd;
        font-size: 20px;
        margin: 0 auto;
        padding-top: 30px;
        text-align: center;
    }

    .modal_body {
        font-size: 17px;
        padding: 10px;
        text-align: center;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    // 하단 버튼 정렬
    .main_btn_container {
        display: flex;
        justify-content: space-evenly;
        margin-top: 30px;
    }

    // 하단 버튼 디자인
    .main_btn {
        width: 150px;
        height: 45px;
        border-radius: 15px;
        border: none;
        font-family: "Bazzi";
        background-color: #f073cd;
        color: white;
        font-size: 15px;
        cursor: pointer;
    }
`;

// const main = css`
//   @font-face {
//     font-family: "Bazzi";
//     src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
//       format("woff");
//     font-weight: normal;
//     font-style: normal;
//   }
//   .main_container {
//     width: 500px;
//     height: 100vh;
//     background-color: #f7bedf;
//     color: white;
//     text-align: center;
//     font-family: "Bazzi";
//     //중앙정렬
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
//   .main_text {
//     font-size: 30px;
//     line-height: 15px;
//   }
//   .main_btn_container {
//     display: flex;
//     justify-content: space-evenly;
//   }
//   .main_btn {
//     width: 150px;
//     height: 45px;
//     border-radius: 15px;
//     border: none;
//     font-family: "Bazzi";
//     background-color: #f073cd;
//     color: white;
//     margin-top: 10px;
//     font-size: 15px;
//   }
//   .main_cakeImg {
//     position: absolute;
//     display: flex;
//     flex-flow: row wrap;
//     width: 100%;
//     top: 330px;
//   }
//   .pickcake {
//     margin-right: 30px;
//   }
//   .modal {
//     height: 100px;
//     width: 100px;
//     background-color: #ffffff;
//     color: black;
//       }
// `;
