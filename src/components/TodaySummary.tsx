import { useState, useEffect } from "react";
import { getToday, getWeekDates } from "@/utils/time";

const TodaySummary = ({ setExerciseType, setSelectedPart }) => {
  const [exerciseData, setExerciseData] = useState({});

  useEffect(() => {
    // 從 localStorage 加載運動數據
    let data = JSON.parse(localStorage.getItem("record")) || [];

    data = data.filter((v) => {
      return v.date === getToday();
    });

    const weekDates = getWeekDates(getToday());
    const history = [];
    data.forEach((v) => {
      const isIn = weekDates.find((date) => date === v.date);
      if (isIn) {
        if (!history[v.date]) {
          history[v.date] = [];
        }
        history[v.date].push(v);
      }
    });

    setExerciseData(history);
  }, []);

  function handleClick(v) {
    setSelectedPart(v.part);
    setExerciseType(v.type);
  }

  const keys = Object.keys(exerciseData);

  return (
    <div className="mb-6">
      {keys.map((v) => {
        return (
          <div>
            <p>{v}</p>
            <div>
              {exerciseData[v].map((v2) => {
                return (
                  <p
                    onClick={() => handleClick(v2)}
                  >{`${v2.part}_${v2.type}`}</p>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodaySummary;
