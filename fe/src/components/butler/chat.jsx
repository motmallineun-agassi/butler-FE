import MediaQuery from "react-responsive";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Header } from "../main";
import "./butler.css";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");

  const fname = sessionStorage.getItem("fname");

  const renderChat = (question, isUser) => {
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
    setQuestion("");
    console.log(question.type);
  };

  async function sendMessage() {
    addMessage(
      "안녕하십니까, 아가씨. 송구하지만, 현재 집사님이 부재중인 관계로 답변을 드리기 어렵습니다. 집사님이 돌아오시면 말씀 전달드리도록 하겠습니다.",
      false
    );
  }

  const chatRef = useRef();

  function scrollToBottomOfModal() {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottomOfModal();
  }, [messages]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div id="wrap">
      <div id="screen">
        <Header isConsult={true} />
        <div id="chat" className="butler-chat" ref={chatRef}>
          <div id="butler">
            <div id="flex-row">
              <div id="prof">
                <img src="char4-prof.png" />
              </div>
              <p id="margin">어서오세요, 아가씨.</p>
            </div>
          </div>
          <div id="butler">
            <div id="flex-row">
              <div id="prof"></div>
              <p>제가 도와드릴 일이 있나요?</p>
            </div>
          </div>
          {messages}
        </div>
        <div id="input-wrap">
          <input
            value={question}
            onChange={handleQuestionChange}
            id="input"
            placeholder="send message..."
            onKeyPress={handleKeyPress}
          />
          <img
            src="/send.svg"
            alt="전송"
            onClick={question === "" ? null : handleSend}
            id={question === "" ? "disabled" : "send"}
          />
        </div>
      </div>
    </div>
  );
}
