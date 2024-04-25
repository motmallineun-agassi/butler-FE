import { CHAR_LIST } from "./miyeonshi.const";
import { Link } from "react-router-dom";

export const Ending = ({ who, selectedLine }) => {
  const score = sessionStorage.getItem(who);

  return (
    <div id="select-wrap">
      <div id="modal-wrap">
        <div id="modal" className="char">
          <h4 style={{ fontSize: "48px" }}>THE END</h4>
          <div id="char-list">
            <div id="character">
              <div id="profile">
                <img
                  src={`/character${who}.png`}
                  alt="캐릭터"
                  style={{ width: "317px" }}
                />
                <div id="name-prof">
                  <div id="score">
                    <img src="/Heart.svg" alt="호감도" />
                    <p style={{ fontSize: "24px" }}>최종 호감도: {score}</p>
                  </div>
                  <p>
                    {who === 4 && selectedLine === "붙잡는다" ? (
                      <p>집사를 공략하는 데 성공했습니다!</p>
                    ) : who === 1 ? (
                      "황태자"
                    ) : who === 2 ? (
                      "북부대공"
                    ) : who === 3 ? (
                      "서부상단주"
                    ) : (
                      "집사"
                    )}
                    {who === 4 && selectedLine === "붙잡는다"
                      ? null
                      : "을(를) 공략하는 데"}
                    {who !== 4 && selectedLine !== "붙잡는다"
                      ? score === "100"
                        ? "성공했습니다!"
                        : "실패했습니다."
                      : null}
                  </p>
                </div>
              </div>
              <div id="ending-button">
                <button>
                  <Link onClick={() => window.location.reload()}>다시하기</Link>
                </button>
                <button>
                  <Link to="/">메인으로 돌아가기</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
