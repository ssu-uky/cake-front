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
    const response = await fetch("http://127.0.0.1:8000/api/users/login/token/refresh/", {
    // const response = await fetch("http://127.0.0.1:8000/api/auth/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
        Authorization: `Bearer ${validAccessToken}`,
      },
    });


    const data = await response.json();
    setLoggedInUserPk(data.user_pk);
  } catch (error) {
    console.error("Error:", error);
  }
};
  
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
    const response = await fetch("http://127.0.0.1:8000/api/users/login/token/refresh/", {
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
        console.log(data);
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

  // 모달 컨테이너 클릭 이벤트 핸들러
  const handleModalContainerClick = (event) => {
    if (event.target.classList.contains("modal_container")) {
      handleHideModal();
    }
  };

  const handleShowModal = (event, visitor) => {
    event.preventDefault();
    setSelectedCake(visitor.pickcake);
    setShowModal(true);
  };

const modalContainerStyle = {
  display: showModal ? 'flex' : 'none',
};

const handleHideModal = () => {
  setSelectedCake(null);
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

            {showModal && visitor.pickcake === selectedCake && (
              <div
                className="modal_container"
                onClick={handleHideModal}
                // style={modalContainerStyle}
                // onClick={handleModalContainerClick}
                >
                  <span
                    className="modal_close"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleHideModal();
                    }}
                    // onClick={() => handleHideModal()}
                    style={{ cursor: "pointer" }}
                  >
                    닫기&nbsp; &times;
                  </span>
                  {/* <p className="modal_title" id={visitor.id}> {visitor.visitor_name} </p> */}
                  <p className="modal_title"  id={selectedCake}> {visitor.visitor_name} </p>
                <br></br>
                  {/* <p className="modal_body" id={visitor.id}> {visitor.letter} </p> */}
                  <p className="modal_body"  id={selectedCake}> {visitor.letter} </p>
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
          marginTop: '25px',
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
          marginTop: '25px',
          cursor: currentPage === paginatedCakes.length - 1 ? 'default' : 'pointer',
          opacity: currentPage === paginatedCakes.length - 1 ? 0.5 : 1,
          color: currentPage === paginatedCakes.length - 1 ? '' : 'white',
        }}
        onClick={handleNextPage}
        inactive={currentPage === paginatedCakes.length - 1}

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

  .modal_container{
    display: flex;
    flex-direction: column;
    align-items: center;
    vertical-align: middle;
    width: 200px;
    height: 200px;
    border-radius: 20px;
    font-family: "Bazzi";
    background-color: white;
    color: black;
    position: absolute;
    padding: 20px;
  }

  .modal_close{
    align-self: flex-end;
    color: #aaa;
    font-size: 17px;
  }

  .modal_title{
    display: inline-block;
    font-size: 20px;
    margin: 0 auto;
    padding-top: 20px;
  }

  .modal_body{
    display: inline-block;
    font-size: 17px;
    margin-top: 20px;
  }


  .main_container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #f7bedf;
    color: white;
    text-align: center;
    font-family: "Bazzi";
    position: relative;
    
    //중앙정렬
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
  }


  .main_text {
    top: 50px;
    font-size: 30px;
    margin-bottom: 30px;
    line-height: 0px;
    margin-top: 40px;
  }

  // 하단 버튼 정렬
  .main_btn_container {
    width: 100vw;
    position: absolute;
    display: flex;
    margin-top: 10%;
    align-items: center;
    justify-content: space-evenly;
  }
  
  // 하단 버튼 디자인
  .main_btn {
    width: 150px;
    // width: 20%;
    height: 45px;
    border-radius: 15px;
    border: none;
    font-family: "Bazzi";
    background-color: #f073cd;
    color: white;
    font-size: 14px;
    cursor: pointer;
    justify-content: space-evenly;
  }
  

  // 케이크 테이블 이미지
  .caketableimg {
    position: relative;
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
    top: 330px;
  }

  .pickcake {
    display: inline-block;
    width: calc(25% - 10px);
    margin: 5px;
    // height: 100px;
    text-align: center;
    line-height: 10px;
    z-index: 50;
  }

  .second-row {
    margin-top: 20px;
  }
`;
