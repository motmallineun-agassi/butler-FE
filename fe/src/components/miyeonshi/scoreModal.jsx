import { CHAR_LIST } from "./miyeonshi.const";
import { ScoreItem } from "./scoreItem";
import { useRef, useEffect } from "react";

export const ScoreModal = ({ setModalOpen }) => {
  const score = sessionStorage.getItem(4);
  const modalRef = useRef();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setModalOpen]);
  return (
    <div id="score-modal-wrap">
      <div id="modal" className="char" ref={modalRef}>
        <h4 id="modal-tt">공략 현황</h4>
        {CHAR_LIST.map(({ id, name }) => (
          <ScoreItem who={id} name={name} key={id} />
        ))}
        <div id="score-wrap">
          <img src={`/blurred.png`} alt="캐릭터" id="score-prof" />
          <div id="name-progress">
            <div id="score-name">
              <h5>???</h5>
              {score === "100" ? (
                <div id="score">
                  <p>공략 완료</p>
                  <img src="/Heart.svg" alt="하트" />
                </div>
              ) : score !== null ? (
                <p id="notDone">시나리오 진행 중</p>
              ) : (
                <p id="notDone">시나리오 진행 전</p>
              )}
            </div>
            <div id="description">
              {score !== "?" ? (
                <p id="progress-bar">조건을 충족하면 루트가 해금됩니다.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
