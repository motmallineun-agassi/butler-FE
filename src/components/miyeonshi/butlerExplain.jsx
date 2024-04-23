import { Header } from "../main";
import { useState, useEffect } from "react";
import { SelectModal } from "./selectModal";

export const ButlerExplain = () => {
  const [chat, setChat] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const script = [
      "이 집사가 가상 대화로 연애 수업을 준비해 보았습니다.",
      "스토리를 진행하시려면 화면의 아무 곳이나 클릭하시면 됩니다.",
      "매 상황마다 아가씨를 위한 선택지가 뜰 겁니다.",
      "부디, 신중하게 선택하여 이번 수업에서도 좋은 성적 거두시길.",
      "이 집사는 언제나 아가씨의 편임을 잊지 말아 주세요.",
    ];
    const interval = setInterval(() => {
      if (currentId < 5) {
        addMessage(script[currentId]);
        setCurrentId(currentId + 1);
      } else {
        setModalOpen(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const addMessage = (question) => {
    setChat((prevMessages) => [
      ...prevMessages,
      <div id="flex-row">
        <div id="prof"></div>
        <p>{question}</p>
      </div>,
    ]);
  };

  return (
    <div id="wrap">
      <div id="screen">
        <Header isConsult={false} />
        <div id="chat">
          <div id="butler">
            <div id="flex-row">
              <div id="prof">
                <img src="char4-prof.png" alt="집사" />
              </div>
              <p id="margin">
                최근 아가씨께서 남자 문제로 고민이 많으신 것 같아...
              </p>
            </div>
            {chat}
          </div>
        </div>
      </div>
      {modalOpen && (
        <div id="select-wrap">
          <div id="modal-wrap">
            <SelectModal />
          </div>
        </div>
      )}
    </div>
  );
};
