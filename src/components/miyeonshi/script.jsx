import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../main";
import { Ending } from "./ending";
import { EndingScript } from "./miyeonshi.const";

export const Script = ({ who }) => {
  const [script, setScript] = useState([]);
  const [chat, setChat] = useState([]);
  const [likeability, setLikeability] = useState(
    who === 1 ? 40 : who === 2 ? 20 : who === 3 ? 50 : "?"
  );

  const fname = sessionStorage.getItem("fname");
  const lname = sessionStorage.getItem("lname");

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    async function getScript() {
      try {
        const response = await axios.post("/script", { character: who });
        console.log(response.data);
        setScript(response.data);
      } catch (error) {
        console.log(error.response.data);
        setScript(["스크립트를 불러오지 못했습니다."]);
      }
    }
    getScript();
  }, []);

  const [shown, setShown] = useState();
  const [selected, setSelected] = useState(true);
  const [ending, setEnding] = useState(false);

  const handleSelected = () => {
    setSelected(false);
  };

  const handleShown = () => {
    setShown(false);
  };

  const [endingId, setEndingId] = useState(0);
  const [lastLine, setLastLine] = useState(false);
  const handleEnding = () => {
    if (!lastLine) {
      addMessage(
        <div id="narration">
          <div id="flex-row">
            <div>{script[currentId].dialogueText}</div>
          </div>
        </div>,
        script[currentId].dialogueType,
        script[currentId].speakerName,
        script[currentId].speakerName === script[currentId - 1].speakerName,
        script[currentId].dialogueType === script[currentId - 1].dialogueType
      );
      setLastLine(true);
    }
    const lines = findType();
    if (endingId < lines?.length) {
      addMessage(
        <div id="narration">
          <div id="flex-row">
            <div>{lines[endingId]}</div>
          </div>
        </div>
      );
      setEndingId(endingId + 1);
    } else {
      setEnding(true);
      addMessage(<Ending who={who} selectedLine={selectedLine} />);
    }
  };

  function findType() {
    const item = EndingScript.find(
      (item) =>
        item.id === parseInt(who) &&
        currentId === item.from &&
        likeability >= item.smallest &&
        likeability <= item.biggest
    );
    console.log(currentId);
    console.log(who);
    return item ? item.lines : null;
  }

  const [selectedLine, setSelectedLine] = useState("");

  const handleNextId = (nextId, line, line2, score, selected) => {
    handleShown();
    if (who !== 4) {
      setLikeability(score === undefined ? likeability : likeability + score);
    }
    console.log(score);

    if (who === 4) {
      setSelectedLine(selected);
    }

    addMessage(
      <div id="answers">
        <div id={selected === line ? "selected" : "unselected"}>{line}</div>
        <div id={selected === line2 ? "selected" : "unselected"}>{line2}</div>
      </div>
    );

    addMessage(
      <div id="user">
        <div id="flex-row">
          <p id="margin">{selected}</p>
        </div>
      </div>
    );
    if (who !== 4) {
      addMessage(
        <div id="like">
          <div>
            <img src="/Heart.svg" alt="호감도" id="heart" />
            <p id="score">
              {"[" + (score > 0 ? "+" : "") + String(score) + "]"}
            </p>
          </div>
          <p>{"호감도가 " + (score > 0 ? "올라갔습니다." : "내려갔습니다.")}</p>
          <div> </div>
        </div>
      );
    }
    setCurrentId(nextId - 1);
    setSelected(true);

    setSetChoice(null);
  };

  const [choice, setSetChoice] = useState();

  const setChoice = (line, nextId, score, line2, nextId2, score2) => {
    return (
      <div id="answers">
        <div
          onClick={() => handleNextId(nextId, line, line2, score, line)}
          id="answer"
        >
          {line}
        </div>
        <div
          onClick={() => handleNextId(nextId2, line, line2, score2, line2)}
          id="answer"
        >
          {line2}
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log(likeability);
  }, [likeability, selected]);

  const [beforeId, setBeforeId] = useState(0);

  const showScript = () => {
    if (script[currentId]?.isChoice && !shown) {
      handleSelected();
      console.log(selected);
      setBeforeId(currentId);

      setSetChoice(
        setChoice(
          script[currentId].dialogueText
            .replace(/{first name}/g, fname)
            .replace(/{last name}/g, lname),
          script[currentId].nextDialogueId,
          script[currentId].scoreChange,
          script[currentId + 1].dialogueText
            .replace(/{first name}/g, fname)
            .replace(/{last name}/g, lname),
          script[currentId + 1].nextDialogueId,
          script[currentId + 1].scoreChange
        )
      );

      setShown(true);
    } else if (selected) {
      if (script[currentId]?.nextDialogueId !== null) {
        if (script[currentId]?.nextDialogueId !== undefined) {
          if (script[currentId].nextDialogueId !== 0) {
            if (currentId < 1) {
              addMessage(
                script[currentId].dialogueText
                  .replace(/{first name}/g, fname)
                  .replace(/{last name}/g, lname),
                script[currentId].dialogueType,
                script[currentId].speakerName
              );
              setCurrentId(currentId + 1);
            } else {
              if (
                script[currentId].dialogueId + 1 ===
                script[currentId].nextDialogueId
              ) {
                addMessage(
                  script[currentId].dialogueText
                    .replace(/{first name}/g, fname)
                    .replace(/{last name}/g, lname),
                  script[currentId].dialogueType,
                  script[currentId].speakerName,

                  beforeId !== 0 &&
                    script[currentId].speakerName !==
                      script[beforeId].speakerName
                    ? false
                    : beforeId === 0 &&
                      script[currentId].speakerName ===
                        script[currentId - 1].speakerName
                    ? true
                    : script[currentId].speakerName ===
                        script[beforeId].speakerName &&
                      script[currentId].speakerName ===
                        script[currentId - 1].speakerName
                    ? true
                    : false,
                  script[currentId].dialogueType ===
                    script[currentId - 1].dialogueType
                );
                setBeforeId(0);
                console.log(beforeId);
                setCurrentId(currentId + 1);
              } else if (
                script[currentId].dialogueId + 1 <
                script[currentId].nextDialogueId
              ) {
                addMessage(
                  script[currentId].dialogueText
                    .replace(/{first name}/g, fname)
                    .replace(/{last name}/g, lname),
                  script[currentId].dialogueType,
                  script[currentId].speakerName,
                  beforeId === 0 &&
                    script[currentId].speakerName !==
                      script[currentId - 1].speakerName
                    ? false
                    : beforeId !== 0 &&
                      script[currentId].speakerName !==
                        script[beforeId].speakerName
                    ? false
                    : script[currentId].speakerName ===
                        script[beforeId].speakerName &&
                      script[currentId].speakerName ===
                        script[currentId - 1].speakerName
                    ? true
                    : false,
                  script[currentId].dialogueType ===
                    script[currentId - 1].dialogueType
                );
                setBeforeId(0);
                setCurrentId(script[currentId].nextDialogueId - 1);
              } else {
                addMessage("무언가 잘못됐다...");
              }
            }
          }
        }
        if (script[currentId].nextDialogueId === 0 && !ending) {
          return handleEnding();
        }
      }
    }
  };

  const renderChat = (question, type, who, samechar, sametype) => {
    if (script[currentId].isChoice) {
      return <div id="choice">{question}</div>;
    }

    if (script[currentId].nextDialogueId === 0 && !ending) {
      return <div>{question}</div>;
    }

    return type === "character" ? (
      <div id="butler">
        <div id="flex-row">
          <div id="prof">
            {samechar ? null : who === "황태자" ? (
              <img src="/char1-prof.png" alt="황태자" />
            ) : who === "집사" ? (
              <img src="/char4-prof.png" alt="집사" />
            ) : who === "북부대공" || who === "대공" ? (
              <img src="/char2-prof.png" alt="북부대공" />
            ) : who === "서부상단주" ? (
              <img src="/char3-prof.png" alt="서부상단주" />
            ) : who === "시녀" ? (
              <img src="/maid-prof.png" alt="시녀" />
            ) : (
              <img src="/default.png" alt="엑스트라" />
            )}
          </div>
          <p id={!sametype || !samechar ? "margin" : null}>{question}</p>
        </div>
      </div>
    ) : (
      <div id={type === "narration" ? "narration" : "user"}>
        <div id="flex-row">
          <div id={!sametype || !samechar ? "margin" : null}>{question}</div>
        </div>
      </div>
    );
  };

  const addMessage = (question, type, who, samechar, sametype) => {
    setChat((prevMessages) => [
      ...prevMessages,
      script[currentId].sceneType ===
      script[currentId - 1]?.sceneType ? null : (
        <div id="narration">
          <div id="flex-row">
            <div id="margin"> {script[currentId].sceneType}</div>
          </div>
        </div>
      ),
      renderChat(question, type, who, samechar, sametype),
    ]);
  };

  const chatRef = useRef();

  function scrollToBottomOfModal() {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottomOfModal(); // 모달이 열릴 때마다 맨 아래로 스크롤
  }, [chat, choice]);

  sessionStorage.setItem(`${who}`, likeability);

  return (
    <div id="wrap" onClick={showScript}>
      <div id="screen">
        <Header isConsult={false} />
        <div id="chat" ref={chatRef}>
          {chat}
          <div id="margin">{choice}</div>
        </div>
      </div>
    </div>
  );
};
