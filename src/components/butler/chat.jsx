import MediaQuery from "react-responsive";
import { useState } from "react";
import axios from "axios";
import { Header } from "../main";
import "./butler.css";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");

  const renderChat = (question, isUser) => {
    return (
      <div id={isUser ? "user" : "butler"}>
        <p>{question}</p>
      </div>
    );
  };

  const addMessage = (question, isUser) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      renderChat(question, isUser),
    ]);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSend = () => {
    addMessage(question, true);
    sendMessage();
  };

  async function sendMessage() {
    try {
      const response = await axios.post("/chat", question);
      console.log(response.data);
      addMessage(response.data, false);
    } catch (error) {
      console.log(error.response.data);
      addMessage("답변 생성에 실패했습니다.", false);
    }
  }

  return (
    <>
      <Header isConsult={true} />
      <div>
        <MediaQuery minWidth={1024}>웹페이지</MediaQuery>
        <MediaQuery maxWidth={1023} minWidth={768}>
          태블릿
        </MediaQuery>
        <MediaQuery maxWidth={767}>모바일</MediaQuery>
      </div>
      <div id="butler">
        <p>어서오세요, 아가씨.</p>
      </div>
      <div id="butler">
        <p>제가 도와드릴 일이 있나요?</p>
      </div>
      {messages}

      <div id="input-wrap">
        <input value={question} onChange={handleQuestionChange} id="input" />
        <button onClick={handleSend}>전송</button>
      </div>
    </>
  );
}
