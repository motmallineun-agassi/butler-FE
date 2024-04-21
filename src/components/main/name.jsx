import { useState } from "react";
import { Link } from "react-router-dom";
import { SelectModal } from "../miyeonshi";

export function Name({ selected, setNameSaved }) {
  const [lname, setLName] = useState("");
  const [fname, setFName] = useState("");
  sessionStorage.setItem("lname", lname);
  sessionStorage.setItem("fname", fname);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    return () => {
      setModalOpen(true);
      sessionStorage.setItem("nameSaved", true);
    };
  };
  return (
    <div>
      <div>
        <p>시작하기 전, 아가씨의 존함을</p>
        <p>집사에게 알려 주세요.</p>
      </div>
      <div>
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
        <Link to="/butler">확인</Link>
      ) : (
        <button onClick={handleModalOpen()}>확인</button>
      )}

      {modalOpen && <SelectModal />}
    </div>
  );
}
