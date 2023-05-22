import css from "styled-jsx/css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer_container">
      <nav>
      {/* <span> www.naekkukae.store </span> */}
      {/* <br /> */}
      <span> 문의하기 </span>
      {/* http://127.0.0.1:8000/api/users/feedback/ - 문의하기 post*/} 
      <br />
        <Link href="https://frost-iron-ae9.notion.site/0ed831edf66c45358b242b9f4062a4f3"  style={{ textDecorationLine: "none", color: "black" }}>
          <span className="footer_text" >Notion</span>
        </Link>
        &nbsp; | &nbsp;
        <Link href="https://github.com/cakeismine"  style={{ textDecorationLine: "none", color: "black" }}>
          <span className="footer_text">Github</span>
        </Link>
      </nav>

      
      
      <span>author : 냐옹이네 너꾸케</span>
      <br />
      {/* <span> 이은빈 : leeeunbin219@gmail.com</span>
      <br />
      <span> 이수현 : id_suhyun@naver.com</span>
      <br /> */}
      <span>Copyright 2023. 너꾸케. All rights reserved.</span>
      <style jsx>{footer}</style>
    </div>
  );
}

const footer = css`
  @font-face {
    font-family: "Bazzi";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/Bazzi.woff")
    format("woff");
    font-weight: normal;
    font-style: normal;
  }

  .footer_container {
    width: 100%;
    overflow: hidden;
    position: fixed;
    bottom: 5vh;
    display: inline-block;
    color: black;
    font-family: "Bazzi";
    font-size: 20px;
    text-decoration: none;
    line-height: 2em;
    left: 1.5em;
  }
`;
