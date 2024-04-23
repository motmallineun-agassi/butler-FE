import { Link } from "react-router-dom";

export const Header = ({ isConsult }) => {
  return (
    <div id="header">
      <Link to="/">
        <img src="/back.svg" alt="뒤로가기" />
      </Link>
      <div id="header-title">
        <h4>{isConsult ? "집사와의 연애상담" : "못말리는 연애 시뮬레이션"}</h4>
      </div>
    </div>
  );
};
