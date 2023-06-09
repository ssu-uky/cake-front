import css from "styled-jsx/css";
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

  // 닉네임 설정
  const handleNicknameChange = (event) => {
    setVisitor_name(event.target.value);
  };

  // 케이크 고르기
  const handleImageSelection = (pickcake) => {
    setPickcake(pickcake);
  };

  useEffect(() => {
    if (!user_pk) return;
    // fetch(`http://127.0.0.1:8000/api/caketables/${user_pk}/`, {
    fetch(`https://manage.naekkukae.store/api/caketables/${user_pk}/`, {
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

  // 금지어 설정
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bannedWords = ["시발", "씨발", "ㅅㅂ", "ㅂㅅ", "병신"];
    for (const word of bannedWords) {
      if (letter.includes(word)) {
        alert("금지어가 포함되어 있습니다.");
        return;
      }
    }
    if (pickcake === null) {
      alert("케이크를 선택해주세요.");
      return;
    }
    if (letter.trim() === "") {
      alert("편지를 작성해주세요.");
      return;
    }
    try {
      const response = await fetch(
        `https://manage.naekkukae.store/api/caketables/${user_pk}/cake/`,
        {
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
        }
      );
      // const data = await response.json();
      router.push(`/caketables/${cakeData.user_pk}`);
      console.log(data); // 케이크 데이터 확인용
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="visitoruse_container">
      <p className="visitoruse_text">
        {cakeData.nickname}님의
        <br /> 생일을 축하해주세요🎉
      </p>
      <form onSubmit={handleSubmit}>
        <div className="visitoruse_nickname_password_container">
          <div className="visitoruse_nickname_container">
            <label htmlFor="nickname" className="visitoruse_name">
              닉네임 &nbsp;
            </label>
            <input
              type="text"
              maxLength="3"
              className="visitoruse_nickname font"
              id="nickname"
              value={visitor_name}
              placeholder="3글자 이내로 입력해주세요"
              onChange={handleNicknameChange}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder = "3글자 이내로 입력해주세요")
              }
              required
            />
          </div>
          <div className="visitoruse_nickname_container">
            <label htmlFor="password" className="visitoruse_name">
              &nbsp; 비밀번호 &nbsp;
            </label>
            <input
              type="password"
              maxLength="4"
              className="visitoruse_nickname"
              id="password"
              pattern="[0-9]{4}"
              value={visitor_password}
              placeholder="4자리 숫자로 입력해주세요"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder = "4자리 숫자로 입력해주세요")
              }
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
          <label
            htmlFor="tab1"
            className="visitoruse_label"
            style={{ cursor: "pointer" }}
          >
            케이크 선택
          </label>
          <input
            id="tab2"
            type="radio"
            name="tabs"
            className="visitoruse_input"
          />
          <label
            htmlFor="tab2"
            className="visitoruse_label"
            style={{ cursor: "pointer" }}
          >
            편지 쓰기
          </label>
          <section id="content1" className="visitoruse_section">
            <div className="visitoruse_pinktable">
              <Image src={Pinktable} width={500} alt="caketable" />

              <div
                className={pickcake === 1 ? "selected" : ""}
                onClick={() => handleImageSelection(1)}
                id="cake1"
              >
                <Image
                  src="/images/cakes/1.png"
                  width={100}
                  height={100}
                  alt="cake1"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 2 ? "selected" : ""}
                onClick={() => handleImageSelection(2)}
                id="cake2"
              >
                <Image
                  src="/images/cakes/2.png"
                  width={100}
                  height={100}
                  alt="cake2"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 3 ? "selected" : ""}
                onClick={() => handleImageSelection(3)}
                id="cake3"
              >
                <Image
                  src="/images/cakes/3.png"
                  width={100}
                  height={100}
                  alt="cake3"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 4 ? "selected" : ""}
                onClick={() => handleImageSelection(4)}
                id="cake4"
              >
                <Image
                  src="/images/cakes/4.png"
                  width={100}
                  height={100}
                  alt="cake4"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 5 ? "selected" : ""}
                onClick={() => handleImageSelection(5)}
                id="cake5"
              >
                <Image
                  src="/images/cakes/5.png"
                  width={100}
                  height={100}
                  alt="cake5"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 6 ? "selected" : ""}
                onClick={() => handleImageSelection(6)}
                id="cake6"
              >
                <Image
                  src="/images/cakes/6.png"
                  width={100}
                  height={100}
                  alt="cake6"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 7 ? "selected" : ""}
                onClick={() => handleImageSelection(7)}
                id="cake7"
              >
                <Image
                  src="/images/cakes/7.png"
                  width={100}
                  height={100}
                  alt="cake7"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 8 ? "selected" : ""}
                onClick={() => handleImageSelection(8)}
                id="cake8"
              >
                <Image
                  src="/images/cakes/8.png"
                  width={100}
                  height={100}
                  alt="cake8"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 9 ? "selected" : ""}
                onClick={() => handleImageSelection(9)}
                id="cake9"
              >
                <Image
                  src="/images/cakes/9.png"
                  width={100}
                  height={100}
                  alt="cake9"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 10 ? "selected" : ""}
                onClick={() => handleImageSelection(10)}
                id="cake10"
              >
                <Image
                  src="/images/cakes/10.png"
                  width={100}
                  height={100}
                  alt="cake10"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 11 ? "selected" : ""}
                onClick={() => handleImageSelection(11)}
                id="cake11"
              >
                <Image
                  src="/images/cakes/11.png"
                  width={100}
                  height={100}
                  alt="cake11"
                  // layout="responsive"
                />
              </div>
              <div
                className={pickcake === 12 ? "selected" : ""}
                onClick={() => handleImageSelection(12)}
                id="cake12"
              >
                <Image
                  src="/images/cakes/12.png"
                  width={100}
                  height={100}
                  alt="cake12"
                  // layout="responsive"
                />
              </div>
            </div>
          </section>
          <section id="content2" className="visitoruse_section">
            <div className="visitoruse_letter">
              <textarea
                className="letter_textarea"
                maxLength={50}
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="useruse_submit_button"
              style={{ cursor: "pointer" }}
            >
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
  .visitoruse_nickname_password_container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 35px;
  }

  .visitoruse_container {
    font-family: "Bazzi";
    width: 100vw;
    height: 100vh;
    overflow: hidden;
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
    font-size: 35px;
    margin-top: 20vw;
  }

  .visitoruse_name {
    font-size: 25px;
    vertical-align: middle;
  }

  .visitoruse_nickname {
    border: none;
    height: 45px;
    width: 170px;
    border-radius: 15px;
    text-align: center;
    vertical-align: middle;
    font-size: 17px;
    padding: 10px;
    margin: 15px 0;
  }

  .visitoruse_nickname {
    font-size: 17px;
    padding: 10px;
  }

  .visitoruse_tab_container {
    margin-top: 30px;
  }
  .visitoruse_nickname:focus {
    border: 2px solid #f073cd;
    outline: none;
  }

  .visitoruse_section {
    display: none;
    border-top: 1px solid #f073cd;
    vertical-align: middle;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .visitoruse_input {
    display: none;
  }

  .visitoruse_label {
    display: inline-block;
    padding: 15px 70px;
    border-radius: 15px 15px 0 0;
    color: #f073cd;
    font-size: 22px;
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
    margin: calc(80px / -20);
    display: inline-block;
    // margin-top: 90px;
    margin-top: 15vw;
  }

  .useruse_submit_button {
    border: none;
    background-color: #f073cd;
    color: white;
    width: 100px;
    height: 40px;
    font-size: 20px;
    border-radius: 10px;
    margin: 0 auto;
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .letter_textarea {
    width: 400px;
    height: 250px;
    font-size: 25px;
    line-height: 45px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding: 30px;
    margin: 30px;
  }

  .letter_textarea:focus {
    border: 2px solid #f073cd;
    outline: none;
  }

  .selected {
    border: 2px dashed #f073cd;
    width: 100%;
    height: 100px;
    // margin: 0 auto;
    display: fixed;
  }

  #cake1 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: -70px;
    right: 50%;
  }
  #cake2 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: -70px;
    right: 75%;
  }
  #cake3 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: -70px;
    right: 100%;
  }
  #cake4 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: -70px;
    right: 125%;
  }

  #cake5 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: 55px;
    right: 50%;
  }
  #cake6 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: 55px;
    right: 75%;
  }
  #cake7 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: 55px;
    right: 100%;
  }
  #cake8 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: 55px;
    right: 125%;
  }

  #cake9 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: 175px;
    right: 50%;
  }
  #cake10 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: 175px;
    right: 75%;
  }
  #cake11 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: 175px;
    right: 100%;
  }
  #cake12 {
    position: absolute;
    width: 25%;
    display: inline-block;
    margin-right: calc(100% / -2);
    top: 175px;
    right: 125%;
  }

  // @media (max-width: 640px) {
  @media (max-width: 520px) {
    .visitoruse_container {
      font-family: "Bazzi";
      width: 100vw;
      height: 100vh;
      overflow: hidden;
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
      font-size: 1.7em;
      // line-height: 45px;
      margin-top: 20vw;
      margin-bottom: -5vw;
    }

    .visitoruse_name {
      font-size: 20px;
      width: 160px;
      vertical-align: middle;
      text-align: center;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      margin-bottom: 5px;
    }

    .visitoruse_nickname {
      border: none;
      height: 45px;
      width: 160px;
      border-radius: 15px;
      text-align: center;
      vertical-align: middle;
      font-size: 17px;
      vertical-align: middle;
      text-align: center;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      // margin-bottom: 1vw;
    }

    .visitoruse_tab_container {
      // margin-top: 7vw;
    }

    .visitoruse_nickname:focus {
      border: 2px solid #f073cd;
      outline: none;
    }

    .visitoruse_section {
      display: none;
      border-top: 1px solid #f073cd;
      vertical-align: middle;
      text-align: center;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    .visitoruse_input {
      display: none;
    }

    .visitoruse_label {
      width: 45vw;
      display: inline-block;
      padding: 13px 40px;
      border-radius: 15px 15px 0 0;
      color: #f073cd;
      font-size: 20px;
    }

    .visitoruse_pinktable {
      // display: inline-block;
      margin-top: 20.5vw;
      width: 100%;
    }

    .letter_textarea {
      width: 80vw;
      height: 50vw;
      font-size: 25px;
      line-height: 45px;
      border: 0;
      border-radius: 15px;
      outline: none;
      padding: 30px;
    }
  }

  @media (max-width: 376px) {
    .visitoruse_container {
      font-family: "Bazzi";
      width: 100vw;
      height: 100vh;
      overflow: hidden;
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
      font-size: 1.5em;
      margin-top: 17vw;
      margin-bottom: -6vw;
    }

    .visitoruse_nickname_container {
      width: 90%;
      margin: 0 auto;
      margin-bottom: 3vw;
    }

    .visitoruse_name {
      font-size: 15px;
      width: 130px;
      vertical-align: middle;
      text-align: center;
      align-items: center;
      justify-content: center;
      margin-bottom: 1vw;
    }

    .visitoruse_nickname {
      border: none;
      height: 35px;
      width: 135px;
      border-radius: 10px;
      text-align: center;
      vertical-align: middle;
      font-size: 13px;
    }

    .visitoruse_tab_container {
      margin-top: 3.5vw;
    }

    .visitoruse_nickname:focus {
      border: 2px solid #f073cd;
      outline: none;
    }

    .visitoruse_section {
      display: none;
      border-top: 1px solid #f073cd;
      vertical-align: middle;
      text-align: center;
      align-items: center;
      justify-content: center;
    }

    .visitoruse_input {
      display: none;
    }

    .visitoruse_label {
      width: 150px;
      display: inline-block;
      padding: 10px 10px;
      border-radius: 10px 10px 0 0;
      color: #f073cd;
      font-size: 15px;
    }

    .visitoruse_pinktable {
      display: inline-block;
      margin-top: 20vw;
      width: 100%;
      height: 100%;
      white-space: nowrap;
      // margin-right: 1vw;
      right: 1vw;
    }

    .letter_textarea {
      width: 80vw;
      height: 50vw;
      font-size: 17px;
      line-height: 25px;
      border: 0;
      border-radius: 15px;
      outline: none;
      padding: 20px;
    }

    .useruse_submit_button {
      border: none;
      background-color: #f073cd;
      color: white;
      width: 22vw;
      height: 9vw;
      font-size: 15px;
      border-radius: 10px;
      margin: 0 auto;
      vertical-align: middle;
      text-align: center;
      justify-content: center;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: -3vw;
    }
    
  }
`;
