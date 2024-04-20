import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main, Chat, Script } from "./components";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/butler" element={<Chat />} />
      <Route path="/love-simulation" element={<Script />} />
    </Routes>
  );
}

export default App;
