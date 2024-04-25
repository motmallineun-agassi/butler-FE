import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main, Chat, Script, ButlerExplain } from "./components";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
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
