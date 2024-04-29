import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  Main,
  Chat,
  Script,
  ButlerExplain,
  Tutorial,
  ButlerTutorial,
  Tutorial2,
  SimulTutorial,
  TutorialScript,
} from "./components";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [firsttime, setFirsttime] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setFirsttime(localStorage.getItem("firsttime"));
  }, [firsttime]);
  console.log(firsttime?.type);
  return (
    <Routes>
      {firsttime === "false" ? (
        <Route path="/" element={<Main />} />
      ) : (
        <Route path="/" element={navigate("/tutorial")} />
      )}
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/butler-tutorial" element={<ButlerTutorial />} />
      <Route path="/love-simulation-tutorial" element={<SimulTutorial />} />
      <Route path="/love-simulation/0" element={<TutorialScript />} />
      <Route path="/tutorial-main" element={<Tutorial2 />} />
      <Route path="/butler" element={<Chat />} />
      <Route path="/love-simulation" element={<ButlerExplain />} />
      <Route path="/love-simulation/1" element={<Script who={1} />} />
      <Route path="/love-simulation/2" element={<Script who={2} />} />
      <Route path="/love-simulation/3" element={<Script who={3} />} />
      <Route path="/love-simulation/4" element={<Script who={4} />} />
    </Routes>
  );
}

export default App;
