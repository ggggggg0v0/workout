import { useState } from "react";
import Header from "@/components/Header";
import Home from "./Home";

function App() {
  const [exerciseType, setExerciseType] = useState("");
  const [selectedPart, setSelectedPart] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="border-b border-gray-200 dark:border-gray-700"></div>
      <Header
        setExerciseType={setExerciseType}
        setSelectedPart={setSelectedPart}
        selectedPart={selectedPart}
        exerciseType={exerciseType}
      />
      <Home exerciseType={exerciseType} selectedPart={selectedPart} />
    </div>
  );
}

export default App;
