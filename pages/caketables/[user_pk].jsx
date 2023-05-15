import css from "styled-jsx/css";
import Image from "next/image";
import Caketable from "public/images/Caketable.png";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";


export default function Main() {
  const router = useRouter();
  const { user_pk } = router.query;
  const [cakeData, setCakeData] = useState({});
  const [loggedInUserPk, setLoggedInUserPk] = useState(null);

  
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
    // const response = await fetch("http://127.0.0.1:8000/api/users/login/token/refresh/", {
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const data = await response.json();
    return data.access;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};


  // 로그인한 사용자의 user_pk를 가져오는 함수 추가
const fetchLoggedInUserPk = async () => {
  const accessToken = sessionStorage.getItem("access_token");
  const refreshToken = sessionStorage.getItem("refresh_token");
  if (!accessToken || !refreshToken) return;

  let validAccessToken = accessToken;

  // access_token이 만료되었는지 확인하고, 만료된 경우 새로운 access_token을 발급받음
  if (isTokenExpired(accessToken)) {
    validAccessToken = await getNewAccessToken(refreshToken);
    if (!validAccessToken) return;

    // 새로 발급받은 access_token을 세션 스토리지에 저장
    sessionStorage.setItem("access_token", validAccessToken);
  }
  try {
    // const response = await fetch("http://127.0.0.1:8000/api/users/login/token/refresh/", {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
    // const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${validAccessToken}`,
      },
    });

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
  const paginatedCakes = cakeData.visitors ? paginateCakes(cakeData.visitors, cakesPerPage) : [];

  const handleBeforePage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < paginatedCakes.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  // 페이지 네이션 구현 끝 (하단에서 버튼으로 다시 이어짐)


  // 링크 복사
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


  // 하단 버튼 시작
  const handleClick = (event) => {
    event.preventDefault();
    router.push(`/caketables/${cakeData.user_pk}/cake/`);
  };
  // 하단 버튼 끝


  //user 정보
  useEffect(() => {
    if (!user_pk) return;

    // fetch(`https://manage.neokkukae.store/api/caketables/${user_pk}/`, {  // 배포용
    fetch(`http://127.0.0.1:8000/api/caketables/${user_pk}/`, {  // 로컬용 (마지막에 / 빼먹지 말기...)
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [user_pk]);

  const tableColor = cakeData.tablecolor;
  const style = {
    backgroundColor: tableColor, marginTop:"20px" 
  };


  // 모달 시작 2 // 
  const [showModal, setShowModal] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  // 모달 컨테이너 클릭 이벤트 핸들러

  const handleShowModal = (event, visitor) => {
    event.preventDefault();
    setSelectedCake(visitor.pickcake);
    setSelectedVisitor(visitor);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setSelectedCake(null);
    setSelectedVisitor(null);
    setShowModal(false);
  };

  // 모달 끝 2 //
  
  return (
    <div className="main_container bgimg">
      <Sidebar />
      <p className="main_text">{cakeData.nickname}님의 케이크</p>
      <p className="main_text">
        {cakeData.total_visitor}명이 축하메세지를 보냈습니다
      </p>

      <div className="main_cakeImg">
        {/* 페이지네이션 버튼 구현 (1줄에 4개, 총 2줄) */}
        {paginatedCakes[currentPage] &&
          paginatedCakes[currentPage].map((visitor, index) => (
            <div className={`pickcake ${index < 4 ? "first-row" : "second-row"}`}
              key={index}
              onClick={(event) => handleShowModal(event, visitor)}
            >
            {visitor.pickcake === selectedCake ? (
              <Image
                src={`/images/cakes/${selectedCake}.png`}
                height={100}
                width={100}
                style={{ cursor: "pointer" }}
                alt="클릭 시 편지와 보이는 케이크"
                priority
              />
            ) : (
                <Image
                  src={`/images/cakes/${visitor.pickcake}.png`}
                  height={100}
                  width={100}
                  style={{ cursor: "pointer" }}
                  alt="테이블에서 보이는 visitor가 선택한 케이크"
                  priority
              />
            )}

            {/* 모달 창 코드 시작 */}
            {/* {showModal && visitor.pickcake === selectedCake && ( */}
            {selectedVisitor === visitor && (
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
                    style={{ cursor: "pointer" }}
                  >
                    닫기&nbsp; &times;
                  </span>
                  <p className="modal_title"  id={selectedCake}> {visitor.visitor_name} </p>
                <br></br>
                  <p className="modal_body"  id={selectedCake}> {visitor.letter} </p>
              </div>
              </div>
            )}

            {/* 모달 창 코드 끝 */}

          </div>
        ))}
      </div>
      
      
      <div style={style}>
        <Image src={Caketable} alt="caketableimg" width={500} height={450} className="caketable" />
      </div>
      
      {/* 왼쪽 버튼 */}
      <FontAwesomeIcon
        icon={faAngleLeft}
        className={`leftbtn ${currentPage === 0 ? 'inactive' : ''}`}
        style={{
          fontSize: '1.5em',
          marginRight: '30px',
          marginTop: '30px',
          cursor: currentPage === 0 ? 'default' : 'pointer',
          opacity: currentPage === 0 ? 0.5 : 1,
          color: currentPage === 0 ? '' : 'white',
        }}
        onClick={handleBeforePage}
      />

      {/* 오른쪽 버튼 */}
      <FontAwesomeIcon
        icon={faAngleRight}
        className={`rightbtn ${currentPage === 0 ? 'inactive' : ''}`}
        style={{
          fontSize: '1.5em',
          marginLeft: '30px',
          marginTop: '30px',
          cursor: currentPage === paginatedCakes.length - 1 ? 'default' : 'pointer',
          opacity: currentPage === paginatedCakes.length - 1 ? 0.5 : 1,
          color: currentPage === paginatedCakes.length - 1 ? '' : 'white',
        }}
        onClick={handleNextPage}
        inactive={currentPage === paginatedCakes.length - 1 ? 'true' : 'false'}

      // hidden={currentPage === paginatedCakes.length - 1} // 마지막 페이지에서는 오른쪽 버튼 안보이게
      />

      <div className="main_btn_container">
        <button className="main_btn" onClick={handleClick}>
          생일 축하해주기
        </button>
        <Link href="/Login">
          <button className="main_btn">내 케이크 만들기</button>
        </Link>
        <button className="main_btn" onClick={copyURL}>
          내 케이크 공유하기
        </button>
      </div>
      <style jsx>{main}</style>
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
    width: 500px;
    height: 100vh;
    overflow: hidden;
    background-color: #f7bedf;
    color: white;
    text-align: center;
    position: relative;
    font-family: "Bazzi";
    vertical-align: middle;

    //중앙정렬
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .main_text {
    font-size: 30px;
    margin-bottom: 35px;
    line-height: 5px;
    margin-top: 40px;
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
  }

  // 케이크 테이블 이미지
  .caketableimg {
    position: relative;
    width: 100%;
    display: flex;
    top: 100px;
    // left: 50%;
    transform: translate(-50%, -50%);
  }

  // 전체 케이크 이동
  .main_cakeImg {
    position: absolute;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    top: 340px;
    justify-content: space-between;
    z-index: 10;
  }

  .pickcake {
    width: calc(25% - 10px);
    height: 100px;
    display: flex;
    justify-content: center;
  }

  // 두번째 줄
  .second-row {
    margin-top: 25px;
  }

  // 모달 창
  .modal_container{
    width: 100%;
    height: 350px;
    border-radius: 20px;
    font-family: "Bazzi";
    background-color: rgba(247,191,224, 0.8);
    // backdrop-filter: blur(1px);
    // color: black;
    color: f073cd;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 20px;
    z-index: 100;
    display: flex;
    justify-content: center;
    // align-items: flex-end;
}

  .modal_inner{
    width : 90%;
    height : 70%;
    display: absolute;
    margin : 0 auto;
    vertical-align: middle;
    align-items: center;
    background-color: #f073cd;
    // background-color: white;
    border-radius: 20px;
    margin-top: 50px;
    // margin-bottom: 35px;
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
    padding-top: 40px;
    text-align: center;
  }

  .modal_body {
    // color: #f073cd;
    font-size: 17px;
    padding: 10px;
    text-align: center;
  }
`;

