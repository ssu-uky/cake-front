import css from "styled-jsx/css";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Footer() {
  // 피드백 //
  const [feedbackName, setFeedbackName] = useState("");
  // const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");
  const [feedbackPassword, setFeedbackPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFeedbackSubmit = async () => {
    const passwordPattern = /^\d{4}$/;
    if (!passwordPattern.test(feedbackPassword)) {
      alert("비밀번호는 숫자 4글자로 작성해주세요.");
      return;
    }
    
    if (!feedbackName || !feedbackContent || !feedbackPassword) {
      alert("모든 항목을 채워주세요 !");
      return;
    }
    const access = sessionStorage.getItem("access");
    
    try {
      const response = await axios.post(
        `https://manage.naekkukae.store/api/users/feedback/`,
        {
          feedback_name: feedbackName,
          // feedback_email: feedbackEmail,
          feedback_content: feedbackContent,
          feedback_password: feedbackPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
      }
      );

      window.alert("피드백을 제출해주셔서 감사합니다! 빠른 시일내로 반영하겠습니다 :)");
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      window.alert("피드백 제출에 실패하였습니다.");
      console.log(error); // 에러 내용
    }
  };

  return (
    <div className="footer_container">
      <nav>
        <span onClick={handleModalOpen} style={{ cursor: "pointer" }}>
          피드백 보내기
        </span>
        <br />
        <Link
          href="https://frost-iron-ae9.notion.site/0ed831edf66c45358b242b9f4062a4f3"
          style={{ textDecorationLine: "none", color: "black" }}
        >
          <span className="footer_text">Notion</span>
        </Link>
        &nbsp; | &nbsp;
        <Link
          href="https://github.com/cakeismine"
          style={{ textDecorationLine: "none", color: "black" }}
        >
          <span className="footer_text">Github</span>
        </Link>
      </nav>

      <span>author : 냐옹이네 너꾸케</span>
      <br />
      <span>ⓒ 2023. 너꾸케 all rights reserved.</span>

      {isModalOpen && (
        <div className="modal">
          <div className="modal_content">
            <h2>문의하기</h2>
            <input
              type="text"
              placeholder="이름"
              value={feedbackName}
              onChange={(e) => setFeedbackName(e.target.value)}
            />
            {/* <input
              type="email"
              placeholder="이메일"
              value={feedbackEmail}
              onChange={(e) => setFeedbackEmail(e.target.value)}
            /> */}
            <textarea
              placeholder="문의 사항을 입력해주세요 :)"
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
            ></textarea>
            <input
              type="password"
              placeholder="비밀번호는 숫자 4글자로 작성해주세요."
              value={feedbackPassword}
              onChange={(e) => setFeedbackPassword(e.target.value)}
            />
            <div className="modal_buttons">
              <button onClick={handleModalClose}>닫기</button>
              <button type="submit" onClick={handleFeedbackSubmit}>
                제출
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{footer}</style>
    </div>
  );
}

const footer = css`
  .footer_container {
    font-family: "Bazzi";
    width: 100%;
    padding: 1.5em;
    left:0;
    overflow: hidden;
    position: absolute;
    bottom: 50px;
    display: fixed;
    color: black;
    font-family: "Bazzi";
    font-size: 18px;
    text-decoration: none;
    line-height: 2rem;
  }


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal_content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  height: auto;
}


h2{
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
  vertical-align: middle;
  color: #f073cd;
}

.modal_content input,textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline-color: #f073cd;
}

.modal_content textarea {
  height: 150px;
}

.modal_buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.modal_buttons button {
  width: 100px;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #f073cd;
  color: white;
  cursor: pointer;
}

  @media (max-width: 768px) {
    .footer_container {
      overflow: hidden;
      padding-bottom: 65px;
      position:0;
      display: block;
      color: black;
      font-family: "Bazzi";
      font-size: 14px;
      text-decoration: none;
      line-height: 30px;
      bottom: 0;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  }

  @media (max-width: 640px){
    .footer_container {
      overflow: hidden;
      position: absolute;
      display: block;
      color: black;
      font-family: "Bazzi";
      font-size: 13px;
      text-decoration: none;
      bottom: 0;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  }

  @media (max-width: 376px){
    .footer_container {
      overflow: hidden;
      position: absolute;
      padding-bottom: 160px;
      // margin: 0 auto;
      display: block;
      color: black;
      font-family: "Bazzi";
      font-size: 12px;
      text-decoration: none;
      line-height: 2em;
      left: 0;
      bottom: 0;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  }

  @media (max-width: 300px){
    .footer_container {
      width: 100%;
      padding: 1em;
      overflow: hidden;
      position: absolute;
      bottom: 45px;
      display: block;
      color: black;
      font-family: "Bazzi";
      font-size: 11px;
      text-decoration: none;
      line-height: 25px;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  }
}
`;
