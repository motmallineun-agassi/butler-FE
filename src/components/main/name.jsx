import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SelectModal } from "../miyeonshi";
import axios from "axios";

export function Name({ selected, setNameSaved }) {
  const [lname, setLName] = useState("");
  const [fname, setFName] = useState("");
  sessionStorage.setItem("lname", lname);
  sessionStorage.setItem("fname", fname);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const getId = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/generateSessionId");
      console.log(response.data);
      sessionStorage.setItem("id", response.data.sessionId);
      sessionStorage.setItem("nameSaved", true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleButlerPage = () => {
    return () => {
      getId();
      navigate("/butler");
    };
  };

  const handleModalOpen = () => {
    return () => {
      setModalOpen(true);
      getId();
    };
  };
  return (
    <div id="modal">
      <div id="john-ham">
        <h4>시작하기 전, 아가씨의 존함을</h4>
        <h4>집사에게 알려 주세요.</h4>
      </div>
      <div id="name">
        <input
          id="lname"
          value={lname}
          placeholder="성"
          onChange={(e) => setLName(e.target.value)}
        />
        <input
          id="fname"
          value={fname}
          placeholder="이름"
          onChange={(e) => setFName(e.target.value)}
        />
      </div>
      {selected == "1" ? (
        <button onClick={getId}>
          <Link to="/butler">확인</Link>
        </button>
      ) : (
        <button onClick={handleModalOpen()}>확인</button>
      )}

      {modalOpen && (
        <div id="modal-wrap">
          <SelectModal />
        </div>
      )}
    </div>
  );
}
