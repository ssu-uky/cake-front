import css from "styled-jsx/css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer_container">
      <nav>
        <Link href="https://frost-iron-ae9.notion.site/0ed831edf66c45358b242b9f4062a4f3">
          <span className="footer_text">Notion</span>
        </Link>
        &nbsp; | &nbsp;
        <Link href="https://github.com/cakeismine">
          <span className="footer_text">Github</span>
        </Link>
      </nav>

      <span>autor : 냐옹이네 너꾸케</span>
      <br />
      <span>email : leeeunbin219@gmail.com</span>
      <br />
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
    position: fixed;
    bottom: 4vh;
    color: black;
    text-align: left;
    margin-left: -34px;
    font-family: "Bazzi";
  }
  
  .footer_text, span, nav {
    color: black;
    text-decoration: none;
    font-size: 14px;
    line-height: 1.7;
  }
`;
