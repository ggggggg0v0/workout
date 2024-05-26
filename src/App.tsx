import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [exerciseType, setExerciseType] = useState("");
  const [selectedPart, setSelectedPart] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        setExerciseType={setExerciseType}
        setSelectedPart={setSelectedPart}
        selectedPart={selectedPart}
      />

      <Home exerciseType={exerciseType} selectedPart={selectedPart} />
    </div>
  );
}

export default App;
