const Modal = ({ visitor_name, owner, letter, onClose }) => {
  const [showContent, setShowContent] = useState(false);

  const checkOwner = () => {
    if (owner) {
      setShowContent(true);
    } else {
      alert("편지는 주인만 확인 할 수 있습니다.");
    }
  };

  const deleteLetter = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      console.log("삭제되었습니다.");
      onClose();
    }
  };

  return (
    <div className="modal">
      {showContent && (
        <div>
          <p>방문자: {visitor_name}</p>
          <p>편지: {letter}</p>
          <button onClick={deleteLetter}>삭제</button>
        </div>
      )}
      {!showContent && (
        <div>
          <p>로그인이 필요합니다.</p>
          <button onClick={checkOwner}>로그인</button>
        </div>
      )}
      <button onClick={onClose}>닫기</button>
    </div>
  );
};


`
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    border: 3px solid #f073cd;
    width: 80%;
    max-width: 500px;
}
`;


