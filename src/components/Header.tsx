import { useState } from "react";

const Header = ({ setExerciseType, setSelectedPart, selectedPart }) => {
  const [exerciseOptions, setExerciseOptions] = useState([]);

  const parts = ["胸", "背", "腿"];
  const exercises = {
    胸: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    背: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
    腿: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"],
  };

  const handlePartChange = (e) => {
    const part = e.target.value;
    setSelectedPart(part); // 更新選擇的運動部位
    setExerciseOptions(exercises[part] || []);
    setExerciseType("");
  };

  const handleExerciseChange = (e) => {
    setExerciseType(e.target.value);
  };

  return (
    <div className="p-4 bg-gray-200 flex flex-col">
      <select
        onChange={handlePartChange}
        value={selectedPart}
        className="p-4 border rounded"
      >
        <option value="">選擇運動部位</option>
        {parts.map((part) => (
          <option key={part} value={part}>
            {part}
          </option>
        ))}
      </select>
      <br />
      <select onChange={handleExerciseChange} className="p-4 border rounded">
        <option value="">選擇運動類型</option>
        {exerciseOptions.map((exercise) => (
          <option key={exercise} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
