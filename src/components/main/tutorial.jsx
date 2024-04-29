import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { SelectItem } from "../miyeonshi";

export const Tutorial = () => {
  const [lname, setLName] = useState("");
  const [fname, setFName] = useState("");
  sessionStorage.setItem("lname", lname);
  sessionStorage.setItem("fname", fname);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  function handleOnClick() {
    return () => {
      setModalOpen(true);
    };
  }

  const handleButlerPage = async (e) => {
    e.preventDefault();
    localStorage.setItem("firsttime", "false");
    navigate("/butler-tutorial");
  };

  return (
    <div id="main-wrap">
      <div id="logo">
        <h3>못말리는</h3>
        <h3>아가씨</h3>
      </div>

      <div id="buttons">
        {!modalOpen && (
          <div id="select-wrap">
            <h4 id="instruction">
              어서오세요, 아가씨.
              <br />
              아가씨를 위해 '못말리는 아가씨'의 사용법을 준비해왔습니다. <br />
              '집사와의 연애상담' 버튼을 클릭해 주세요.
            </h4>
            <div id="buttons">
              <button id="button" onClick={handleOnClick()}>
                집사와의 연애상담
              </button>
              <button id="blank">못말리는 연애 시뮬레이션</button>
            </div>
          </div>
        )}
        <div id="buttons">
          <button id="button">집사와의 연애상담</button>
          <button id="button" disabled={true}>
            못말리는 연애 시뮬레이션
          </button>
        </div>
      </div>
      {modalOpen && (
        <div id="modal-wrap">
          <h4 id="instruction">
            먼저 아가씨의 존함을 입력하고 확인 버튼을 눌러 주세요.
          </h4>
          <div id="modal">
            <div id="john-ham">
              <div id="john-ham2">
                <h4>시작하기 전, </h4> <h4>아가씨의 존함을</h4>{" "}
              </div>
              <h4>집사에게 알려 주세요.</h4>
            </div>
            <div id="name">
              <input
                id="lname"
                value={lname}
                placeholder="성"
                onChange={(e) => setLName(e.target.value)}
              />
              <input
                id="fname"
                value={fname}
                placeholder="이름"
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <button onClick={(e) => handleButlerPage(e)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export const ButlerTutorial = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");

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
    setQuestion("");
    addMessage(
      "잘하셨습니다, 아가씨. 다음은 연애 시뮬레이션을 시도해보시죠. 좌측 상단 화살표를 누르면 메인화면으로 돌아갑니다."
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div id="wrap">
      <div id="screen">
        <Header isConsult={true} isTutorial={true} />
        <div id="chat" className="butler-chat">
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
              <p>
                하단 입력창에 제게 하고 싶으신 말을 입력하신 후, 엔터키를
                누르거나 전송 버튼을 클릭해보세요.
              </p>
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
};

export const Tutorial2 = () => {
  const navigate = useNavigate();

  function handleOnClick() {
    return () => {
      handleSimulPage(true);
    };
  }

  const handleSimulPage = () => {
    navigate("/love-simulation-tutorial");
  };

  return (
    <div id="main-wrap">
      <div id="logo">
        <h3>못말리는</h3>
        <h3>아가씨</h3>
      </div>
      <div id="buttons">
        <div id="select-wrap">
          <h4 id="instruction">
            '못말리는 연애 시뮬레이션' 버튼을 클릭해 주세요.
          </h4>
          <div id="buttons">
            <button id="blank">집사와의 연애상담</button>
            <button id="button" onClick={handleOnClick()}>
              못말리는 연애 시뮬레이션
            </button>
          </div>
        </div>
        <div id="buttons">
          <button id="button" disabled={true}>
            집사와의 연애상담
          </button>

          <button id="button">못말리는 연애 시뮬레이션</button>
        </div>
      </div>
    </div>
  );
};

export const SimulTutorial = () => {
  const [chat, setChat] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [end, setEnd] = useState(false);
  useEffect(() => {
    const script = [
      "이 집사가 가상 대화로 연애 수업을 준비해 보았습니다.",
      "스토리를 진행하시려면 화면의 아무 곳이나 클릭하시면 됩니다.",
      "매 상황마다 아가씨를 위한 선택지가 뜰 겁니다.",
      "부디, 신중하게 선택하여 이번 수업에서도 좋은 성적 거두시길.",
      "이 집사는 언제나 아가씨의 편임을 잊지 말아 주세요.",
    ];
    const interval = setInterval(() => {
      if (currentId < 5) {
        addMessage(script[currentId]);
        setCurrentId(currentId + 1);
      } else if (!end) {
        setModalOpen(true);
        setEnd(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const addMessage = (question) => {
    setChat((prevMessages) => [
      ...prevMessages,
      <div id="butler">
        <div id="flex-row">
          <div id="prof"></div>
          <p>{question}</p>
        </div>
      </div>,
    ]);
  };

  return (
    <div id="wrap">
      <div id="screen">
        <Header isConsult={false} />
        <div id="chat">
          <div id="butler">
            <div id="flex-row">
              <div id="prof">
                <img src="char4-prof.png" alt="집사" />
              </div>
              <p id="margin">
                최근 아가씨께서 남자 문제로 고민이 많으신 것 같아...
              </p>
            </div>
          </div>
          {chat}
        </div>
      </div>
      {modalOpen && (
        <div id="select-wrap">
          <div id="modal-wrap">
            <h4 id="instruction">공략하기 버튼을 눌러주세요.</h4>
            <SelectModalTutorial />
          </div>
        </div>
      )}
    </div>
  );
};

export const SelectModalTutorial = () => {
  return (
    <div id="modal" className="char">
      <h4>어떤 남자와 만나볼까?</h4>
      <div id="char-list">
        <SelectItem
          id={0}
          name={"집사"}
          score={"?"}
          description={"연애 시뮬레이션 플레이 방식에 대해 설명해드리겠습니다."}
          key={0}
        />
      </div>
    </div>
  );
};

export const TutorialScript = ({ who }) => {
  const [chat, setChat] = useState([
    <div id="narration">
      <div id="flex-row">
        <div id="margin"> {"화면을 클릭해보세요."}</div>
      </div>
    </div>,
  ]);
  const [likeability, setLikeability] = useState(0);

  const fname = sessionStorage.getItem("fname");
  const lname = sessionStorage.getItem("lname");

  const [currentId, setCurrentId] = useState(0);

  const script = [
    {
      dialogueId: 1,
      dialogueType: "narration",
      isChoice: false,
      dialogueText: "화면을 클릭 할 때마다 대사가 한 줄 씩 등장합니다.",
      nextDialogueId: 2,
    },
    {
      dialogueId: 2,
      dialogueType: "narration",
      isChoice: false,
      dialogueText: "회색으로 뜨는 대사는 내레이션입니다.",
      nextDialogueId: 3,
    },
    {
      dialogueId: 3,
      dialogueType: "character",
      isChoice: false,
      dialogueText: "캐릭터의 대사는 프로필 사진과 함께 흰색 말풍선에 뜨고요,",
      speakerName: "집사",
      nextDialogueId: 4,
    },
    {
      dialogueId: 4,
      dialogueType: "user",
      isChoice: false,
      dialogueText:
        "아가씨가 말씀하신 내용은 이렇게 분홍색 말풍선으로 보여집니다.",
      nextDialogueId: 5,
    },
    {
      dialogueId: 5,
      dialogueType: "user",
      isChoice: true,
      dialogueText: "선택의 순간이 오면 두 가지의 선지가 제공됩니다.",
      nextDialogueId: 7,
      scoreChange: 10,
    },
    {
      dialogueId: 6,
      dialogueType: "user",
      isChoice: true,
      dialogueText: "둘 중 하나를 선택해보세요.",
      nextDialogueId: 7,
      scoreChange: 10,
    },
    {
      dialogueId: 7,
      dialogueType: "narration",
      isChoice: false,
      dialogueText:
        "잘하셨습니다! 아가씨의 선택에 따라 캐릭터의 호감도가 오르거나 깎이게 됩니다.",
      nextDialogueId: 8,
    },
    {
      dialogueId: 8,
      dialogueType: "narration",
      isChoice: false,
      dialogueText:
        "모든 내용을 완벽하게 숙지하셨군요. 이제 모든 튜토리얼이 끝났습니다. ",
      nextDialogueId: 9,
    },
    {
      dialogueId: 9,
      dialogueType: "character",
      speakerName: "집사",
      isChoice: false,
      dialogueText:
        "다시 좌측 상단의 화살표를 눌러 메인화면으로 돌아가면 튜토리얼이 종료됩니다.",
      nextDialogueId: 0,
    },
  ];

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
    addMessage(
      script[currentId].dialogueText
        .replace(/{first name}/g, fname)
        .replace(/{last name}/g, lname),
      script[currentId].dialogueType,
      script[currentId].speakerName,

      beforeId !== 0 &&
        script[currentId].speakerName !== script[beforeId].speakerName
        ? false
        : beforeId === 0 &&
          script[currentId].speakerName === script[currentId - 1].speakerName
        ? true
        : script[currentId].speakerName === script[beforeId].speakerName &&
          script[currentId].speakerName === script[currentId - 1].speakerName
        ? true
        : false,
      script[currentId].dialogueType === script[currentId - 1].dialogueType
    );
    setEnding(true);
  };

  const handleNextId = (nextId, line, line2, score, selected) => {
    handleShown();
    if (who !== 4) {
      setLikeability(score === undefined ? likeability : likeability + score);
    }
    console.log(score);

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

    return type === "character" ? (
      <div id="butler">
        <div id="flex-row">
          <div id="prof">
            {samechar ? null : <img src="/char4-prof.png" alt="집사" />}
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
    scrollToBottomOfModal();
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
