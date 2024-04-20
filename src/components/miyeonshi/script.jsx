import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../main";

export const Script = ({ who }) => {
  const [script, setScript] = useState([]);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    async function getScript() {
      try {
        const response = await axios.post("/script", who);
        console.log(response.data);
        setScript(response.data);
      } catch (error) {
        console.log(error.response.data);
        setScript(["대사1", "대사2", "대사3"]);
      }
    }
    getScript();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (chat.length < script.length) {
        addMessage(script[chat.length]);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [chat, script]);

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
