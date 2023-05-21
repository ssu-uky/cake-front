import React, { useState } from "react";
import { ChromePicker } from "react-color";
import Image from "next/image";
import cakeimg from "public/images/Caketable.png";
import { createGlobalStyle } from "styled-components";
import css from "styled-jsx/css";

export default function Color_button({ tablecolor, handleChange }) {
    const [color, setColor] = useState(tablecolor);

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
        document.getElementById("image-container").style.backgroundColor =
            newColor.hex;

        const cakeTable = {
            color: newColor.hex,
        };
        // fetch("http://127.0.0.1:8000/api/caketables/new/", {
        fetch(`https://manage.naekkukae.store/api/caketables/new/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cakeTable),
        })
            .then((response) => response.json())
            // .then((data) => console.log(data))
            .catch((error) => console.error(error));

        handleChange(newColor);
    };

    return (
        <div>
            <Global />
            <ChromePicker
                color={color}
                onChange={handleColorChange}
                width={450}
            />
            <div
                id="image-container"
                style={{ backgroundColor: color }}
                className="color_button_container"
            >
                <Image src={cakeimg} width={450} />
            </div>
            <style jsx>{colorbutton}</style>
        </div>
    );
}

const Global = createGlobalStyle`
.flexbox-fix:last-child {
  visibility: hidden;
}
.flexbox-fix:nth-child(1) {
  visibility: hidden;
}
.chrome-picker > div > div:nth-child(1){
  height:100px;
  /* margin-top: 50px; */
}
.chrome-picker:nth-child(1){
  height:100px;
  
}
.hue-horizontal {
  visibility: visible;
  position: fixed;
  top: -175px;
  left: -15px;
}
`;

const colorbutton = css``;
