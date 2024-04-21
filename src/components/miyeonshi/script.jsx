import { useState, useEffect } from "react";
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
        setScript(["대사1", "대사2", "대사3"]);
      }
    }
    getScript();
  }, []);
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      if (chat.length < script.length) {
        addMessage(script[chat.length]);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [chat, script]);*/

  const [currentResponse, setCurrentResponse] = useState("");
  const [selected, setSelected] = useState(true);

  const handleSelected = () => {
    setSelected(false);
  };

  const handleNextId = (nextId, line, score) => {
    addMessage(line);
    addMessage(
      <div>
        호감도가 {score} {score > 0 ? "올라갔습니다." : "내려갔습니다."}
      </div>
    );
    setLikeability(
      script[currentId].scoreChange === undefined
        ? likeability
        : likeability + score
    );
    setCurrentId(nextId - 1);

    console.log(score);

    setSelected(true);
  };

  const setChoice = (line, nextId, score) => {
    return (
      <div
        onClick={() => handleNextId(nextId, line, score)}
        id="answer"
        key={nextId}
      >
        {line}
      </div>
    );
  };

  useEffect(() => {
    console.log(likeability);
  }, [likeability, selected]);

  useEffect(() => {
    if (script[currentId]?.isChoice) {
      handleSelected();
      console.log(selected);

      addMessage(
        setChoice(
          script[currentId].dialogueText
            .replace(/{first name}/g, fname)
            .replace(/{last name}/g, lname),
          script[currentId].nextDialogueId,
          script[currentId].scoreChange
        )
      );
      addMessage(
        setChoice(
          script[currentId + 1].dialogueText
            .replace(/{first name}/g, fname)
            .replace(/{last name}/g, lname),
          script[currentId + 1].nextDialogueId,
          script[currentId + 1].scoreChange
        )
      );
    } else if (selected) {
      const interval = setInterval(() => {
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
                      script[currentId - 1].speakerName
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
                      script[currentId - 1].speakerName
                  );
                  setCurrentId(script[currentId].nextDialogueId - 1);
                } else if (script[currentId].nextDialogueId === 0)
                  return () => clearInterval(interval);
                else {
                  addMessage("무언가 잘못됐다...");
                }
              }
            }
          }
        } else {
          return () => clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentId, script, likeability]);

  const renderChat = (question, type, who, samechar) => {
    return type === "character" ? (
      <>
        <div>
          {samechar ? null : who === "황태자" ? (
            <img src="/char1-prof.png" />
          ) : who === "집사" ? (
            <img src="/char4-prof.png" />
          ) : who === "북부대공" ? (
            <img src="/character2.png" />
          ) : who === "서부상단주" ? (
            <img src="/character3.png" />
          ) : (
            <img src="/default.png" />
          )}
        </div>
        <div>{question}</div>
      </>
    ) : (
      <div id={type === "narration" ? "narration" : "user"}>{question}</div>
    );
  };

  const addMessage = (question, type, who, samechar) => {
    setChat((prevMessages) => [
      ...prevMessages,
      renderChat(question, type, who, samechar),
    ]);
  };

  sessionStorage.setItem(`${who}`, likeability);

  return (
    <>
      <Header isConsult={false} />
      <div>{chat}</div>
    </>
  );
};
