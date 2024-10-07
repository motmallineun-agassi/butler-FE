import { useState } from "react";
import { Link } from "react-router-dom";

export const SelectItem = ({ id, name, score, description }) => {
  const likeability = sessionStorage.getItem(id);
  const allDone =
    sessionStorage.getItem("1") === "100" &&
    sessionStorage.getItem("2") === "100" &&
    sessionStorage.getItem("3") === "100";
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(true);
  };
  const unHandleHover = () => {
    setHover(false);
  };
  return (
    <div id={allDone ? "longer-modal" : "character"}>
      <div id="profile">
        <img src={`/character${id}.png`} alt="캐릭터" />

        <div id="name-prof">
          <h4>{name}</h4>
          <div id="score">
            <img src="/Heart.svg" alt="호감도" />
            <p>기본 호감도 {score}</p>
          </div>
        </div>
      </div>
      <div id="description">{description}</div>
      {likeability === "100" ? (
        <button
          onMouseEnter={handleHover}
          onMouseLeave={unHandleHover}
          id="done"
        >
          <Link to={`/love-simulation/${id}`}>
            {hover ? "다시하기" : "공략 완료"}
          </Link>
        </button>
      ) : (
        <button>
          <Link to={`/love-simulation/${id}`}>공략하기</Link>
        </button>
      )}
      {allDone && id === 2 && (
        <button>
          <Link to={`/love-simulation/4`}>???</Link>
        </button>
      )}
    </div>
  );
};
