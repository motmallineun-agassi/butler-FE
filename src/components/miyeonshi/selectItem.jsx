import { Link } from "react-router-dom";

export const SelectItem = ({ id, name, score, description }) => {
  return (
    <div id="character">
      <div id="profile">
        <img src={`/character${id}.png`} alt="캐릭터" />

        <div id="name">
          <h4>{name}</h4>
          <div id="score">
            <img src="/Heart.svg" alt="호감도" />
            <p>기본 호감도 {score}</p>
          </div>
        </div>
      </div>
      <div id="description">{description}</div>
      <Link to={`/love-simulation/${id}`}>공략하기</Link>
    </div>
  );
};
