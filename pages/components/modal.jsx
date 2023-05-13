import React from "react";
import css  from "styled-jsx/css";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../redux/actions";
import { getSelectedCake } from "../../redux/selectors";
import {showModal, selectedCake, onHideModal} from "../../redux/actions";
import {showModal, selectedCake, onHideModal} from "../caketables/caketables/"


const Modal = ({ showModal, selectedCake, onHideModal }) => {
  const modalContainerStyle = {
    display: showModal ? 'flex' : 'none',
  };

  const handleModalContainerClick = (event) => {
    if (event.target.classList.contains("modal_container")) {
      onHideModal();
    }
  };

  return (
    <div
      className="modal_container"
      style={modalContainerStyle}
      onClick={handleModalContainerClick}
    >
      <span
        className="modal_close"
        onClick={onHideModal}
        style={{ cursor: "pointer" }}
      >
        닫기&nbsp; &times;
      </span>
      {selectedCake && (
        <>
          <p className="modal_title" id={selectedCake.id}>
            {selectedCake.visitor_name}
          </p>
          <br />
          <p className="modal_body" id={selectedCake.id}>
            {selectedCake.letter}
          </p>
        </>
      )}
      <style jsx>{modal}</style>
    </div>
  );
};


export default Modal;

const modal = css`
  .modal_container{
    position: absolute;
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
    z-index: 3000;
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

`