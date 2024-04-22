import { useState, useEffect } from "react";
import { Name } from "./name";
import { SelectModal } from "../miyeonshi";
import { useNavigate } from "react-router-dom";
import "./main.css";

export function Main() {
  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [nameSaved, setNameSaved] = useState(
    sessionStorage.getItem("nameSaved")
  );
  function handleOnClick(select) {
    return () => {
      setModalOpen(true);
      setSelected(select);
    };
  }

  return (
    <div id="main-wrap">
      <div id="logo">
        <h3>못말리는</h3>
        <h3>아가씨</h3>
      </div>
      <div id="buttons">
        <button id="button" onClick={handleOnClick("1")}>
          집사와의 연애상담
        </button>
        <button id="button" onClick={handleOnClick("2")}>
          못말리는 연애 시뮬레이션
        </button>
      </div>
      {!nameSaved && modalOpen && (
        <div id="modal-wrap">
          <Name selected={selected} setNameSaved={setNameSaved} />
        </div>
      )}
      {nameSaved && selected === "2" && (
        <div id="modal-wrap">
          <SelectModal />
        </div>
      )}
      {nameSaved && selected === "1" && navigate("/butler")}
    </div>
  );
}
