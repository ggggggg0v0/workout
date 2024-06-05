import { useState, useEffect } from "react";
import { getTime, getToday } from "@/utils/time";
import History from "./history";

const tasks = [
  { name: "出門運動", time: "05:50~06:00" },
  { name: "重訓開始", time: "06:00~06:40" },
  { name: "有氧開始", time: "06:40~07:20" },
  { name: "回家", time: "07:20~07:30" },
  { name: "準備早餐", time: "07:30~07:00" },
  { name: "吃早餐", time: "08:10~08:20" },
  { name: "洗澡、洗衣服", time: "08:20~08:30" },
  { name: "每日單字", time: "" },
  { name: "鄭念冥想", time: "" },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState([]);

  //控制modal開關
  function switchModal() {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    const storedRecord = localStorage.getItem("taskRecord");
    setRecords(JSON.parse(storedRecord));
  }, []);

  const handleRecord = (taskName) => {
    const today = getToday();
    const hm = getTime();
    const record = JSON.parse(localStorage.getItem("taskRecord")) || {};
    if (!record[today]) {
      record[today] = {};
    }
    record[today][taskName] = hm;
    localStorage.setItem("taskRecord", JSON.stringify(record));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900">
            Time Recorder
          </h5>
          <p
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            onClick={switchModal}
          >
            View all
          </p>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {tasks.map(({ name, time }) => {
              return (
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium truncate">{name}</p>
                      <p className="text-sm truncate">{time}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold">
                      <button
                        onClick={() => handleRecord(name)}
                        className="bg-green-500 text-white p-2 rounded"
                      >
                        紀錄
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {isModalOpen ? (
        <History onClose={switchModal} records={records} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
