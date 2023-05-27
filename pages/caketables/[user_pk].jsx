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

  // 컴포넌트가 마운트되면 로그인한 사용자의 user_pk를 가져옴
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

  // 한 페이지에 케이크는 8개
  const cakesPerPage = 8;
  const paginatedCakes = cakeData.visitors
    ? paginateCakes(cakeData.visitors, cakesPerPage)
    : [];
  const totalPages = paginatedCakes.length;

  // 이전 페이지 버튼
  // const handleBeforePage = () => {
  //   if (currentPage > 0) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const handleBeforePage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // 다음 페이지 버튼
  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
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
        // 이미 본인의 테이블에 위치한 경우
        if (data.user_pk === cakeData.user_pk) {
          alert("이미 본인의 테이블에 위치하고 있습니다!");
        } else {
          router.push(`/caketables/${data.user_pk}/`);
        }
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

  // 편지 삭제 (휴지통 이미지)
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
        <p className="main_text_title">{cakeData.nickname}님의 케이크</p>
        <p className="main_text_message">
          {cakeData.total_visitor}명이 축하메세지를 보냈습니다
        </p>
        {/* caketable 내에 cake가 위치하도록 감싸줌  */}
        <div className="caketable-container">
          <div style={tablestyle}>
            <Image
              src={Caketable}
              id="caketableimg"
              layout="responsive"
              alt="caketableimg"
              width={500}
              height={450}
              className="caketable"
            />

            {/* pickcake 를 main_cakeImg로 감싸줌  */}
            <div className="main_cakeImg">
              {/* 페이지네이션 버튼 구현 (1줄에 4개, 총 2줄) */}
              {paginatedCakes[currentPage] &&
                paginatedCakes[currentPage].map((visitor, index) => (
                  <div
                    className={`pickcake ${
                      index < 4 ? "first-row" : "second-row"
                    }`}
                    key={index}
                    onClick={(event) => handleShowModal(event, visitor)}
                  >
                    {visitor.pickcake === selectedCake ? (
                      <Image
                        src={`/images/cakes/${selectedCake}.png`}
                        height={100}
                        width={100}
                        className="pickcakeview"
                        layout="responsive"
                        style={{
                          cursor: "pointer",
                        }}
                        alt="클릭 시 편지와 보이는 케이크"
                        priority
                      />
                    ) : (
                      <Image
                        src={`/images/cakes/${visitor.pickcake}.png`}
                        className="pickcakeview"
                        layout="responsive"
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
                    <p className="visitor_name">{visitor.visitor_name}</p>

                    {/* 모달 창 코드 시작 */}
                    {selectedVisitor === visitor.pk && (
                      <div
                        className="modal_container"
                        onClick={handleHideModal}
                      >
                        <div className="modal_inner">
                          <span
                            className="modal_close"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleHideModal();
                            }}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            닫기&nbsp; &times;
                          </span>
                          <p className="modal_title" id={selectedCake}>
                            🎉&nbsp; {visitor.visitor_name} 🎉
                          </p>
                          <br></br>
                          <p className="modal_body" id={selectedCake}>
                            {visitor.letter}
                          </p>
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={handleDelete}
                            style={{
                              fontSize: "25px",
                              color: "#ffffff",
                              marginTop: "10px",
                              marginBottom: "10px",
                              marginLeft: "75%",
                              cursor: "pointer",
                              position: "relative",
                              display: "inline-block",
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {/* 모달 창 코드 끝 */}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 페이지네이션 구현 버튼  */}
        <div className="pagebtn">
          {/* 이전 버튼 */}
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={`leftbtn ${currentPage === 0 ? "inactive" : ""}`}
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
                currentPage === totalPages - 1 || totalPages === 0
                  ? "default"
                  : "pointer",
              opacity:
                currentPage === totalPages - 1 || totalPages === 0 ? 0.5 : 1,
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
            이 테이블 공유하기
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
    font-size: 2.5em;
    margin-top: 7vh;
  }

  .main_text_message {
    font-size: 2.5em;
    margin-top: -15px;
    margin-bottom: 20px;
  }

  // 케이크 css
  .caketable-container {
    position: relative;
    width: 700px;
    height: 650px;
    margin: 0 auto;
  }

  .caketable {
    display: inline-block;
    position: relative;
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
    height: calc(25% - 10px);
    padding: 0 5px;
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
    font-size: 1.5em;
    font-family: "Bazzi";
    text-align: center;
    align-items: center;
    vertical-align: middle;
  }

  .first-row {
    margin-top: -420px;
  }

  .second-row {
    margin-top: -203px;
  }

  // 페이지네이션
  .pagebtn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    vertical-align: middle;
    align-items: center;
    font-family: "Bazzi";
    font-size: 2.3em;
    margin: 0 auto;
    margin-top: 80px;
  }

  .pagetext {
    font-size: 0.8em;
    font-family: "Bazzi";
    align-items: center;
    vertical-align: middle;
    text-align: center;
    margin: 0 30px;
  }

  // 하단 버튼 정렬
  .main_btn_container {
    display: flex;
    flex-direction: row;
    width: 700px;
    // height: 100%;
    justify-content: space-between;
    margin: 0 auto;
  }

  // 하단 버튼 디자인
  .main_btn {
    width: 200px;
    height: 60px;
    border-radius: 20px;
    border: none;
    font-family: "Bazzi";
    background-color: #f073cd;
    color: white;
    font-size: 20px;
    cursor: pointer;
    outline: none;
    margin-top: 35px;
  }

  // 모달 창
  .modal_container {
    width: 100vw;
    height: 350px;
    border-radius: 20px;
    font-family: "Bazzi";
    // backdrop-filter: blur(1px);
    // color: black;
    background-color: #f073cd;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 15px;
    z-index: 100;
    display: flex;
    justify-content: center;
    // align-items: flex-end;
  }

  // .modal_inner {
  //   width: 90%;
  //   height: 80%;
  //   display: relative;
  //   margin: 0 auto;
  //   vertical-align: middle;
  //   align-items: center;
  //   background-color: rgba(247, 190, 223, 0.7);
  //   // background-color: #f7bedf;
  //   border-radius: 20px;
  //   margin-top: 50px;
  // }

  .modal_inner {
    width: 85vw;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(247, 190, 223, 0.7);
    border-radius: 20px;
    margin-top: 50px;
    overflow: visible;
  }

  .modal_close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    font-size: 1.3em;
  }

  // .modal_title {
  //   // color: #f073cd;
  //   font-size: 20px;
  //   margin: 0 auto;
  //   padding-top: 30px;
  //   text-align: center;
  // }

  .modal_title {
    font-size: 1.7em;
    padding-top: 1.5vw;
    // margin: 0 auto;
    // padding-top: -7vw;
    margin-bottom: -2vw;
    text-align: center;
    overflow-wrap: break-word;
    word-wrap: break-word;
    display: inline-block;
  }

  // .modal_body {
  //   font-size: 17px;
  //   padding: 10px;
  //   text-align: center;
  //   height: 80px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   position: relative;
  // }

  .modal_body {
    font-size: 1.3em;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    // flex-grow: 1;
    overflow: visible;
    line-height: 1.6em;
    white-space: pre-wrap;
    max-width: 80%;
    word-break: break-all;
    hyphens: auto;
    display: inline-block;
  }

  .modal_body p {
    margin: 0;
  }

  @media (max-width: 768px) {
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
      margin-top: 10vw;
    }

    .main_text_message {
      font-size: 2em;
      margin-bottom: 2vw;
    }

    // 케이크 css //
    .caketable-container {
      width: 95vw;
      height: 95vw;
      display: fixed;
      position: relative;
      overflow: hidden;
    }

    .caketable {
      display: inline-block;
      position: relative;
    }

    // 전체 케이크 이동
    .main_cakeImg {
      position: absolute;
      width: 100%;
      z-index: 10;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }

    .pickcake {
      width: calc(25% - 10px);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .visitor_name {
      width: 100%;
      font-size: 1.2em;
      font-family: "Bazzi";
      text-align: center;
      align-items: center;
      vertical-align: middle;
    }

    .first-row {
      margin-top: -57.5vw;
    }

    .second-row {
      margin-top: -28vw;
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
      margin-top: 20px;
    }

    .pagetext {
      font-size: 1em;
      font-family: "Bazzi";
      align-items: center;
      vertical-align: middle;
      text-align: center;
      margin: 5px 20px;
    }

    // 하단 버튼 정렬
    .main_btn_container {
      width: 95vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 auto;
      // position: relative;
    }

    // 하단 버튼 디자인
    .main_btn {
      width: 25vw;
      height: 7.5vw;
      border-radius: 15px;
      border: none;
      background-color: #f073cd;
      color: white;
      font-size: 18px;
      cursor: pointer;
      outline: none;
    }
  }

  @media (max-width: 640px) {
    .main_container {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: #f7bedf;
      color: white;
      text-align: center;
      position: relative;
      vertical-align: middle;
      align-items: center;
      justify-content: center;
      position: absolute;
    }

    .main_text_title {
      font-size: 1.7em;
      margin-top: 100px;
      margin-bottom: 15px;
    }

    .main_text_message {
      font-size: 1.7em;
      margin-top: -15px;
      margin-bottom: 30px;
    }

    // 케이크 css //
    .caketable-container {
      width: 95vw;
      height: 95vw;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }

    .caketable {
      display: inline-block;
      position: relative;
    }

    // 전체 케이크 이동
    .main_cakeImg {
      position: absolute;
      width: 100%;
      z-index: 10;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }

    .pickcake {
      width: calc(25% - 10px);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .visitor_name {
      width: 100%;
      font-size: 1em;
      font-family: "Bazzi";
      text-align: center;
      align-items: center;
      vertical-align: middle;
    }

    .first-row {
      margin-top: -57vw;
    }

    .second-row {
      margin-top: -27.5vw;
    }

    // 페이지네이션
    .pagebtn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      vertical-align: middle;
      align-items: center;
      font-family: "Bazzi";
      font-size: 1em;
      margin: 0 auto;
      margin-top: 7vw;
    }

    .pagetext {
      font-size: 1em;
      font-family: "Bazzi";
      align-items: center;
      vertical-align: middle;
      text-align: center;
      margin: 0 20px;
    }

    // 하단 버튼 정렬
    .main_btn_container {
      width: 95vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 auto;
      // position: relative;
    }

    // 하단 버튼 디자인
    .main_btn {
      width: 25vw;
      height: 8vw;
      border-radius: 15px;
      border: none;
      font-family: "Bazzi";
      background-color: #f073cd;
      color: white;
      font-size: 15px;
      cursor: pointer;
      outline: none;
    }
  }

  @media (max-width: 450px) {
    .main_text_title {
      font-size: 6.5vw;
      margin-top: 30vw;
      // margin-bottom: 5vw;
    }

    .main_text_message {
      font-size: 6.5vw;
      margin-bottom: 5vw;
    }

    // 전체 케이크 이동
    .main_cakeImg {
      position: absolute;
      width: 100%;
      z-index: 10;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }

    .pickcake {
      width: calc(25% - 10px);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .first-row {
      margin-top: -54vw;
    }

    .second-row {
      margin-top: -25vw;
    }

    .visitor_name {
      width: 100%;
      font-size: 0.7em;
      font-family: "Bazzi";
      text-align: center;
      align-items: center;
      vertical-align: middle;
      margin-top: 2px;
    }

    // 페이지네이션
    .pagebtn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      vertical-align: middle;
      align-items: center;
      font-family: "Bazzi";
      font-size: 1em;
      margin: 0 auto;
      margin-top: 20px;
    }

    .pagetext {
      font-size: 1em;
      font-family: "Bazzi";
      align-items: center;
      vertical-align: middle;
      text-align: center;
      margin: 0 20px;
    }

    // 하단 버튼 정렬
    .main_btn_container {
      width: 95vw;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 auto;
    }

    // 하단 버튼 디자인
    .main_btn {
      width: 25.5vw;
      height: 8vw;
      border-radius: 12px;
      border: none;
      font-family: "Bazzi";
      background-color: #f073cd;
      color: white;
      font-size: 12px;
      cursor: pointer;
      outline: none;
      margin-top: 20px;
    }
  }

  @media (max-width: 350px) {
    .main_text_title {
      font-size: 1em;
      margin-top: 90px;
    }

    .main_text_message {
      font-size: 1em;
      margin-bottom: 10px;
    }

    // 페이지네이션
    .pagebtn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      vertical-align: middle;
      align-items: center;
      font-family: "Bazzi";
      font-size: 0.8em;
      margin: 0 auto;
      margin-top: 20px;
    }

    .pagetext {
      font-size: 1em;
      font-family: "Bazzi";
      align-items: center;
      vertical-align: middle;
      text-align: center;
      margin: 0 20px;
    }

    // 하단 버튼 정렬
    .main_btn_container {
      width: 100vw;
      height: 150px;
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      position: absolute;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 5px;
    }

    // 하단 버튼 디자인
    .main_btn {
      width: 120px;
      height: 30px;
      border-radius: 10px;
      border: none;
      font-family: "Bazzi";
      background-color: #f073cd;
      color: white;
      font-size: 12px;
      cursor: pointer;
      outline: none;
      margin: 0 auto;
    }
  }
`;
