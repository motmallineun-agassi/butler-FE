import { useState, useEffect } from "react";
import { dummyData } from "./dummyData";
import axios from "axios";
import { Header } from "../main";

export const Script = ({ who }) => {
  const [script, setScript] = useState(dummyData);
  const [chat, setChat] = useState([]);

  const [currentId, setCurrentId] = useState(1);
  const [nextId, setNextId] = useState(currentId + 1);
  const Who = 1;

  useEffect(() => {
    async function getScript() {
      try {
        const response = await axios.post("/script", { character: Who });
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (script[currentId - 1]?.nextDialogueId !== undefined) {
        if (script[currentId - 1].nextDialogueId !== 0) {
          if (
            script[currentId - 1].dialogueId + 1 ===
            script[currentId - 1].nextDialogueId
          ) {
            addMessage(script[currentId].dialogueText);
            setCurrentId(currentId + 1);
          } else if (
            script[currentId - 1].dialogueId + 1 <
            script[currentId - 1].nextDialogueId
          ) {
            setCurrentId(currentId + 1);
          } else if (script[currentId - 1].nextDialogueId === 0)
            return () => clearInterval(interval);
          else {
            addMessage("무언가 잘못됐다...");
          }
        }
      } else {
        return () => clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentId]);

  const addMessage = (question) => {
    setChat((prevMessages) => [...prevMessages, question]);
  };

  return (
    <>
      <Header isConsult={false} />
      <div>{chat}</div>
    </>
  );
};
