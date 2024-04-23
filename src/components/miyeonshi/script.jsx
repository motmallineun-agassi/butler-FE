import { useState, useEffect, useRef } from "react";
import { dummyData } from "./dummyData";
import axios from "axios";
import { Header } from "../main";

export const Script = ({ who }) => {
  const [script, setScript] = useState([]);
  const [chat, setChat] = useState([]);
  const [likeability, setLikeability] = useState(
    who === 1 ? 40 : who === 2 ? 20 : who === 3 ? 50 : null
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

  const handleEnding = () => {
    setEnding(true);
    addMessage(<p>엔딩</p>);
  };

  const handleNextId = (nextId, line, score) => {
    handleShown();

    setLikeability(score === undefined ? likeability : likeability + score);

    console.log(score);

    addMessage(
      <div id="user">
        <div id="flex-row">
          <p id="margin">{line}</p>
        </div>
      </div>
    );
    addMessage(
      <div id="like">
        <div>
          <img src="/Heart.svg" alt="호감도" id="heart" />
          <p id="score">{"[" + (score > 0 ? "+" : "") + String(score) + "]"}</p>
        </div>
        <p>{"호감도가 " + (score > 0 ? "올라갔습니다." : "내려갔습니다.")}</p>
        <div> </div>
      </div>
    );
    setCurrentId(nextId - 1);
    setSelected(true);
  };

  const setChoice = (line, nextId, score, line2, nextId2, score2) => {
    return (
      <div id="answers">
        <div
          onClick={() => handleNextId(nextId, line, score)}
          id="answer"
          key={nextId}
        >
          {line}
        </div>
        <div
          onClick={() => handleNextId(nextId2, line2, score2)}
          id="answer"
          key={nextId2}
        >
          {line2}
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log(likeability);
  }, [likeability, selected]);

  const showScript = () => {
    if (script[currentId]?.isChoice && !shown) {
      handleSelected();
      console.log(selected);

      addMessage(
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
                  script[currentId].speakerName ===
                    script[currentId - 1].speakerName,
                  script[currentId].dialogueType ===
                    script[currentId - 1].dialogueType
                );

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
                  script[currentId].speakerName ===
                    script[currentId - 1].speakerName,
                  script[currentId].dialogueType ===
                    script[currentId - 1].dialogueType
                );
                setCurrentId(script[currentId].nextDialogueId - 1);
              } else {
                addMessage("무언가 잘못됐다...");
              }
            }
          }
        }
        if (script[currentId].nextDialogueId === 0 && !ending)
          return handleEnding();
      }
    }
  };

  /* const compare = () => {
    return (
      <div id={isUser ? "user" : "butler"}>
        <div id="flex-row">
          {isUser ? null : (
            <div id="prof">
              <img src="char4-prof.png" alt="집사" />
            </div>
          )}

          <p id="margin">{question}</p>
        </div>
      </div>
    );
  };*/

  const renderChat = (question, type, who, samechar, sametype) => {
    if (script[currentId].isChoice) {
      return <div id="choice">{question}</div>;
    }
    return type === "character" ? (
      <div id="butler">
        <div id="flex-row">
          <div id="prof">
            {samechar ? null : who === "황태자" ? (
              <img src="/char1-prof.png" />
            ) : who === "집사" ? (
              <img src="/char4-prof.png" />
            ) : who === "북부대공" ? (
              <img src="/char2-prof.png" />
            ) : who === "서부상단주" ? (
              <img src="/char3-prof.png" />
            ) : (
              <img src="/default.png" />
            )}
          </div>
          <p id={samechar ? null : "margin"}>{question}</p>
        </div>
      </div>
    ) : (
      <div id={type === "narration" ? "narration" : "user"}>
        <div id="flex-row">
          <div id={!sametype ? "margin" : null}>{question}</div>
        </div>
      </div>
    );
  };

  const addMessage = (question, type, who, samechar, sametype) => {
    setChat((prevMessages) => [
      ...prevMessages,

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
  }, [chat]);

  sessionStorage.setItem(`${who}`, likeability);

  return (
    <div id="wrap" onClick={showScript}>
      <div id="screen">
        <Header isConsult={false} />
        <div id="chat" ref={chatRef}>
          {chat}
        </div>
      </div>
    </div>
  );
};
