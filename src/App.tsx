import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [exerciseType, setExerciseType] = useState("");

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header setExerciseType={setExerciseType} />
        <Routes>
          <Route path="/" element={<Home exerciseType={exerciseType} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
