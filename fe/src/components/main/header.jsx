import { Link } from "react-router-dom";
import { ScoreModal } from "../miyeonshi";
import { useState } from "react";

export const Header = ({ isConsult, isTutorial = false }) => {
  const [open, setOpen] = useState(false);
  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }
  return (
    <div id="header">
      <div id="header-title">
        <Link to={isTutorial ? "/tutorial-main" : "/"}>
          <img src="/back.svg" alt="뒤로가기" />
        </Link>
        <div>
          <h4>
            {isConsult ? "집사와의 연애상담" : "못말리는 연애 시뮬레이션"}
          </h4>
        </div>
      </div>
      <img src="/progress.svg" alt="공략 현황" onClick={openModal} />
      {open && <ScoreModal setModalOpen={closeModal} />}
    </div>
  );
};
