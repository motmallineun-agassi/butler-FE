import { useState } from "react";
import { Link } from "react-router-dom";

export function Name({ selected }) {
  const [lname, setLName] = useState("");
  const [fname, setFName] = useState("");
  sessionStorage.setItem("lname", lname);
  sessionStorage.setItem("fname", fname);
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
        <Link to="/love-simulation">확인</Link>
      )}
    </div>
  );
}
