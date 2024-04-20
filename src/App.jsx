import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main, Chat } from "./components";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/butler" element={<Chat />} />
    </Routes>
  );
}

export default App;
