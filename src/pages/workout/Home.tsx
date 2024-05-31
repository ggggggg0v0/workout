import { useState, useEffect } from "react";
import { getToday } from "@/utils/time";

// 從 excel 匯入紀錄
// import t from "./test.json";

// for (const [key, value] of Object.entries(t)) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

function Modal({ onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg mb-4">是否覆蓋今日資料</h2>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={onClose}
          >
            取消
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onConfirm}
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
}

const Home = ({ exerciseType, selectedPart }) => {
  const storageType = `${selectedPart}_${exerciseType}`;
  const [inputs, setInputs] = useState([{ weight: "", reps: "" }]);
  const [exerciseData, setExerciseData] = useState([]);
  const [taskTime, setTaskTime] = useState([]);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promiseHandlers, setPromiseHandlers] = useState({
    resolve: null,
    reject: null,
  });

  useEffect(() => {
    if (exerciseType && selectedPart) {
      // 從 localStorage 加載運動數據
      const data = JSON.parse(localStorage.getItem(storageType)) || [];
      setExerciseData(data);
      if (data.length > 0) {
        setInputs(data[0].sets);
      }
    } else {
      setExerciseData([]);
      setInputs([{ weight: "", reps: "" }]);
      setTaskTime([]);
    }
  }, [exerciseType, selectedPart]);

  useEffect(() => {
    if (timer && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (timer && time === 0) {
      console.log("123");
    }
  }, [time, timer]);

  const handleInputChange = (index, field, value) => {
    const newInputs = inputs.map((input, i) =>
      i === index ? { ...input, [field]: value } : input
    );
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { weight: "", reps: "" }]);
  };

  const handleRemoveInput = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newDate = getToday();
    // 若本日已新增紀錄則彈窗警告
    if (exerciseData[0]?.date === newDate) {
      setIsModalOpen(true);
      return new Promise((resolve, reject) => {
        setPromiseHandlers({ resolve, reject });
      })
        .then(() => {
          exerciseData[0] = {
            date: newDate,
            part: selectedPart,
            type: exerciseType,
            sets: inputs,
          };
          localStorage.setItem(storageType, JSON.stringify(newData));
          setExerciseData(newData);
        })
        .catch(() => {
          // console.log("Action cancelled");
        });
    }

    const newData = [
      {
        date: newDate,
        part: selectedPart,
        type: exerciseType,
        sets: inputs,
      },
      ...exerciseData,
    ];

    localStorage.setItem(storageType, JSON.stringify(newData));
    setExerciseData(newData);
  };

  const handleConfirm = () => {
    if (promiseHandlers.resolve) {
      promiseHandlers.resolve();
      setPromiseHandlers({ resolve: null, reject: null });
    }
    setIsModalOpen(false);
  };

  const handleClose = () => {
    if (promiseHandlers.reject) {
      promiseHandlers.reject();
      setPromiseHandlers({ resolve: null, reject: null });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-3xl mb-4">
        進行上次課表{" "}
        {`${
          Math.floor(time / 60) < 10
            ? `0${Math.floor(time / 60)}`
            : `${Math.floor(time / 60)}`
        }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
      </h1>

      <div>
        {inputs.map((input, index) => {
          return (
            <div key={index} className="mb-2 flex items-center">
              <div className="flex items-center">
                <p className="mr-2">重量</p>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="重量"
                  value={input.weight}
                  onChange={(e) =>
                    handleInputChange(index, "weight", e.target.value)
                  }
                  className="p-2 border rounded mr-2 max-w-24"
                />
              </div>
              <div className="flex items-center">
                <p className="mr-2">次數</p>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="次數"
                  value={input.reps}
                  onChange={(e) =>
                    handleInputChange(index, "reps", e.target.value)
                  }
                  className="p-2 border rounded mr-4 max-w-16"
                />
              </div>
              <button
                onClick={() => handleRemoveInput(index)}
                className={`bg-red-500 text-white p-2 mr-2 rounded ${
                  inputs.length > 1 ? "block" : "hidden"
                }`}
              >
                刪除
              </button>
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  checked={!!taskTime[index]}
                  onClick={() => {
                    if (taskTime[index]) {
                      return;
                    }
                    const newTaskTime = [...taskTime];
                    newTaskTime[index] = true;
                    setTaskTime(newTaskTime);
                    setTimer(true);
                    setTime(5);
                  }}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          );
        })}

        <div className="float-right">
          <button
            onClick={handleAddInput}
            className="bg-blue-500 text-white p-2 rounded mb-4 mr-2"
          >
            新增
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2 rounded"
          >
            送出
          </button>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-3xl mb-2">歷史紀錄</p>
        <ul>
          {exerciseData.map(({ date, sets }) => {
            const weight = [];
            const reps = [];

            sets.forEach((set) => {
              weight.push(
                <td className="border border-gray-300 px-4 py-2">
                  {set.weight}
                </td>
              );
              reps.push(
                <td className="border border-gray-300 px-4 py-2">{set.reps}</td>
              );
            });

            return (
              <li key={date}>
                <p className="text-xl mb-2">{date}</p>

                <div>
                  <table className="table-auto border-collapse border border-gray-300">
                    <tbody>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">
                          重量
                        </th>
                        {weight}
                      </tr>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">
                          次數
                        </th>
                        {reps}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {isModalOpen && <Modal onConfirm={handleConfirm} onClose={handleClose} />}
    </div>
  );
};

export default Home;
