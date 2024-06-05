import { useState } from "react";
import TodaySummary from "./TodaySummary";
import CSVReader from "./CsvReader";
import CSVExpoter from "./CsvExporter";

const Header = ({
  setExerciseType,
  setSelectedPart,
  selectedPart,
  exerciseType,
}) => {
  const [exerciseOptions, setExerciseOptions] = useState([]);

  const exercises = {
    胸: [
      "啞鈴臥推",
      "槓鈴臥推 Barbell BP(BB BP)",
      "A3 下胸",
      "C3 平胸",
      "C3 上胸",
      "C5 分離平胸",
      "C6 夾胸蝴蝶機 Chset Fly",
      "H1 上胸 Hammer upper chest",
      "H3 下胸",
      "H4 上胸",
      "test",
    ],
    背: [
      "滑輪下拉",
      "Pull Up Machine",
      "B3 寬握正手划船",
      "B5 寬握反手划船",
      "B6 分離划船",
      "B14 分離滑輪下拉",
      "H37 Hammer Row",
      "TRX 划船",
      "H10 反手划船",
      "H8 正手划船",
    ],
    上肢: [
      "彈力帶旋轉肌群熱身",
      "S4 側飛鳥",
      "S2 肩推",
      "A5 Bicep Curl 二頭肌彎舉",
    ],
    下肢: [
      "Squat",
      "臀推機",
      "分腿蹲 DB Lounge",
      "啞鈴箱上深蹲 KB DL",
      "羅馬椅",
      "L4 股四頭",
      "L14髖外展",
      "H18 Hammer Leg",
      "H19",
      "L10",
    ],
  };

  const parts = Object.keys(exercises);

  const handlePartChange = (part) => {
    setSelectedPart(part); // 更新選擇的運動部位
    setExerciseOptions(exercises[part] || []);
    setExerciseType("");
  };

  const handleExerciseChange = (tp) => {
    setExerciseType(tp);
  };

  return (
    <div className="p-4 bg-gray-200 flex flex-col">
      <div className="flex justify-between">
        <CSVReader />
        <CSVExpoter />
      </div>
      <TodaySummary
        setExerciseType={handleExerciseChange}
        setSelectedPart={handlePartChange}
      />

      <select
        onChange={(e) => handlePartChange(e.target.value)}
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
      <select
        onChange={(e) => handleExerciseChange(e.target.value)}
        value={exerciseType}
        className="p-4 border rounded"
      >
        <option>選擇運動類型</option>
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
