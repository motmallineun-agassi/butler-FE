export const ScoreItem = ({ who, name }) => {
  const score = sessionStorage.getItem(who);
  console.log(score);
  return (
    <div id="score-wrap">
      <img src={`/character${who}.png`} alt="캐릭터" id="score-prof" />
      <div id="name-progress">
        <div id="score-name">
          <h5>{name}</h5>
          {score === "100" ? (
            <div id="score">
              <p>공략 완료</p>
              <img src="/Heart.svg" alt="하트" />
            </div>
          ) : score !== null ? (
            <p id="notDone">시나리오 진행 중</p>
          ) : (
            <p id="notDone">시나리오 진행 전</p>
          )}
        </div>
        <div id="description">
          {score !== null ? <p>최종 호감도: {score}</p> : null}
          <div id="progress-bar">
            <div id="progress">
              {score !== null ? (
                <div id="rate" style={{ width: `${score}%` }}></div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
