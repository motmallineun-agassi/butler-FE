import { useState, useEffect } from "react";
import { Name } from "./name";

export function Main() {
  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  function handleOnClick(select) {
    return () => {
      setModalOpen(true);
      setSelected(select);
    };
  }

  return (
    <div>
      <div id="logo">
        <h3>못말리는</h3>
        <h3>아가씨</h3>
      </div>
      <div>
        <button id="button" onClick={handleOnClick("1")}>
          집사와의 연애상담
        </button>
        <button id="button" onClick={handleOnClick("2")}>
          못말리는 연애 시뮬레이션
        </button>
        {modalOpen && <Name selected={selected} />}
      </div>
    </div>
  );
}
