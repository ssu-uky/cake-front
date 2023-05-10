import css from "styled-jsx/css";
import Sidebar from "pages/components/Sidebar.jsx";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Pinktable from "public/images/Pinktable.png";


export default function CakeTable(props) {
  const router = useRouter();

  const [cakeData, setCakeData] = useState({});
  const [visitor_name, setVisitor_name] = useState("");
  const [visitor_password, setPassword] = useState("");
  const [letter, setLetter] = useState("");
  const [pickcake, setPickcake] = useState(null);
  const { user_pk } = router.query;

  const handleNicknameChange = (event) => {
    setVisitor_name(event.target.value);
  };

  const handleImageSelection = (pickcake) => {
    setPickcake(pickcake);
  };

  useEffect(() => {
    if (!user_pk) return;
    fetch(`http://127.0.0.1:8000/api/caketables/${user_pk}/`, {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const bannedWords = ["시발", "씨발", "ㅅㅂ", "ㅂㅅ", "병신"];
  for (const word of bannedWords) {
    if (letter.includes(word)) {
      alert("금지어가 포함되어 있습니다.");
      return;
    }
  }
    fetch(`http://127.0.0.1:8000/api/caketables/${user_pk}/cake/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitor_name: visitor_name,
        visitor_password: visitor_password,
        pickcake: pickcake,
        letter: letter,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        router.push(`/caketables/${cakeData.user_pk}/`);
        console.log(data); // 케이크 데이터 확인용
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="visitoruse_container">
      <Sidebar />
      <p className="visitoruse_text font">
        {cakeData.nickname}님의
        <br /> 생일을 축하해주세요🎉
      </p>
      <form onSubmit={handleSubmit}>
        <div className="visitoruse_nickname_password_container">
          <div className="visitoruse_nickname_container">
            <label htmlFor="nickname" className="visitoruse_name font">
              &nbsp;&nbsp;&nbsp;닉네임 &nbsp;
            </label>
            <input
              type="text"
              maxLength="3"
              className="visitoruse_nickname font"
              id="nickname"
              value={visitor_name}
              onChange={handleNicknameChange}
            />
          </div>
          <div className="visitoruse_password_container">
            <label htmlFor="password" className="visitoruse_name font">
              비밀번호 &nbsp;
            </label>
            <input
              type="password"
              maxLength="4"
              className="visitoruse_nickname font"
              id="password"
              pattern="[0-9]{4}"
              value={visitor_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="visitoruse_tab_container">
          <input
            id="tab1"
            type="radio"
            name="tabs"
            className="visitoruse_input"
            // checked
          />
          <label htmlFor="tab1" className="visitoruse_label font">
            케이크 선택
          </label>
          <input
            id="tab2"
            type="radio"
            name="tabs"
            className="visitoruse_input"
          />
          <label htmlFor="tab2" className="visitoruse_label font">
            편지 쓰기
          </label>
          <section id="content1" className="visitoruse_secion">
            <div className="visitoruse_pinktable">
              <Image src={Pinktable} width={500} alt="caketable" />

              <div
                className={pickcake === 1 ? "selected" : ""}
                onClick={() => handleImageSelection(1)}
                id="cake1"
              >
                <Image src="/images/cakes/1.png" width={100} height={100} alt="cake1" />
              </div>
              <div
                className={pickcake === 2 ? "selected" : ""}
                onClick={() => handleImageSelection(2)}
                id="cake2"
              >
                <Image src="/images/cakes/2.png" width={100} height={100} alt="cake2" />
              </div>
              <div
                className={pickcake === 3 ? "selected" : ""}
                onClick={() => handleImageSelection(3)}
                id="cake3"
              >
                <Image src="/images/cakes/3.png" width={100} height={100} alt="cake3" />
              </div>
              <div
                className={pickcake === 4 ? "selected" : ""}
                onClick={() => handleImageSelection(4)}
                id="cake4"
              >
                <Image src="/images/cakes/4.png" width={100} height={100} alt="cake4" />
              </div>
              <div
                className={pickcake === 5 ? "selected" : ""}
                onClick={() => handleImageSelection(5)}
                id="cake5"
              >
                <Image src="/images/cakes/5.png" width={100} height={100} alt="cake5" />
              </div>
              <div
                className={pickcake === 6 ? "selected" : ""}
                onClick={() => handleImageSelection(6)}
                id="cake6"
              >
                <Image src="/images/cakes/6.png" width={100} height={100} alt="cake6" />
              </div>
              <div
                className={pickcake === 7 ? "selected" : ""}
                onClick={() => handleImageSelection(7)}
                id="cake7"
              >
                <Image src="/images/cakes/7.png" width={100} height={100} alt="cake7" />
              </div>
              <div
                className={pickcake === 8 ? "selected" : ""}
                onClick={() => handleImageSelection(8)}
                id="cake8"
              >
                <Image src="/images/cakes/8.png" width={100} height={100} alt="cake8" />
              </div>
              <div
                className={pickcake === 9 ? "selected" : ""}
                onClick={() => handleImageSelection(9)}
                id="cake9"
              >
                <Image src="/images/cakes/9.png" width={100} height={100} alt="cake9" />
              </div>
              <div
                className={pickcake === 10 ? "selected" : ""}
                onClick={() => handleImageSelection(10)}
                id="cake10"
              >
                <Image src="/images/cakes/10.png" width={100} height={100} alt="cake10" />
              </div>
              <div
                className={pickcake === 11 ? "selected" : ""}
                onClick={() => handleImageSelection(11)}
                id="cake11"
              >
                <Image src="/images/cakes/11.png" width={100} height={100} alt="cake11" />
              </div>
              <div
                className={pickcake === 12 ? "selected" : ""}
                onClick={() => handleImageSelection(12)}
                id="cake12"
              >
                <Image src="/images/cakes/12.png" width={100} height={100} alt="cake12" />
              </div>
            </div>
          </section>
          <section id="content2" className="visitoruse_secion">
            <div className="visitoruse_text">
              <textarea
                className="letter_textarea font"
                maxLength={50}
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
              />
            </div>
            <button type="submit" className="useruse_submit_button font">
              보내기
            </button>
          </section>
        </div>
      </form>

      <style jsx>{visitoruse}</style>
    </div>
  );
}




const visitoruse = css`
  @font-face {
    font-family: "Bazzi";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  .font {
    font-family: "Bazzi";
  }
  .visitoruse_nickname_password_container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 35px;
  }
  .visitoruse_container {
    width: 500px;
    height: 100vh;
    background-color: #f7bedf;
    color: white;
    text-align: center;
    //중앙정렬
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .visitoruse_text {
    font-size: 40px;
    line-height: 45px;
    margin-top: 5vh;
  }
  .visitoruse_name {
    font-size: 25px;
  }
  .visitoruse_nickname {
    border: none; 
    height: 30px;
    width: 150px;
    border-radius: 10px;
    text-align: center;
    font-size: 25px;
  }
  .visitoruse_tab_container {
    margin-top: 30px;
  }
  .visitoruse_nickname:focus {
    border: 2px solid #f073cd;
    outline: none;
  }
  .visitoruse_secion {
    display: none;
    /* padding: 20px 0 0; */
    border-top: 1px solid #f073cd;
  }
  .visitoruse_input {
    display: none;
  }
  .visitoruse_label {
    display: inline-block;
    margin: 0 0 -1px;
    padding: 15px 89px;
    border-radius: 15px 15px 0 0;
    font-weight: 600;
    color: #f073cd;
    font-size: 20px;
  }
  
  //input 클릭시, label 스타일
  .visitoruse_input:checked + .visitoruse_label {
    color: #ffffff;
    border: 1px solid #f073cd;
    background-color: #f073cd;
  }
  #tab1:checked ~ #content1,
  #tab2:checked ~ #content2 {
    display: block;
  }
  .visitoruse_pinktable {
    position: relative;
    margin-top: 65px;
  }
  .useruse_submit_button {
    border: none;
    background-color: #f073cd;
    color: white;
    width: 100px;
    height: 35px;
    font-size: 20px;
    border-radius: 10px;
    margin-top: 50px;
  }
  .letter_textarea {
    width: 350px;
    height: 130px;
    font-size: 30px;
    line-height: 45px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding: 40px;
  }
  .selected {
    border: 2px dashed #f073cd;
  }
  #cake1 {
    position: absolute;
    right: 30px;
    top: -65px;
  }
  #cake2 {
    position: absolute;
    right: 140px;
    top: -65px;
  }
  #cake3 {
    position: absolute;
    right: 250px;
    top: -65px;
  }
  #cake4 {
    position: absolute;
    right: 370px;
    top: -65px;
  }
  #cake5 {
    position: absolute;
    right: 30px;
    top: 60px;
  }
  #cake6 {
    position: absolute;
    right: 140px;
    top: 60px;
  }
  #cake7 {
    position: absolute;
    right: 250px;
    top: 60px;
  }
  #cake8 {
    position: absolute;
    right: 370px;
    top: 60px;
  }
  #cake9 {
    position: absolute;
    right: 30px;
    top: 190px;
  }
  #cake10 {
    position: absolute;
    right: 140px;
    top: 190px;
  }
  #cake11 {
    position: absolute;
    right: 250px;
    top: 190px;
  }
  #cake12 {
    position: absolute;
    right: 370px;
    top: 190px;
  }
`;
