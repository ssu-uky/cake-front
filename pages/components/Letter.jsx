import { useState } from "react";
import css from "styled-jsx/css";

export default function Letter() {
  const [letterContent, setLetterContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:8000/api/caketables/pick/", {
      method: "POST",
      body: JSON.stringify({ content: letterContent }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("편지 전송에 실패하였습니다.");
        }
        // Handle successful response here
      })
      .catch((error) => {
        console.error(error);
        // Handle error heregetRangeAt
      });
  };

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="letter_textarea font"
          value={letterContent}
          onChange={(e) => setLetterContent(e.target.value)}
        />
      </form>
      <style jsx>{letter}</style>
    </div>
  );
}
const letter = css`
@font-face {
  font-family: "Bazzi";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
  .letter_textarea {
    width: 350px;
    height: 150px;
    font-size: 25px;
    line-height: 40px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding: 20px;
  }
  .font {
    font-family: Bazzi;
  }
`;

