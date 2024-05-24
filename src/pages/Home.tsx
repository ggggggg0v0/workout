import { useState } from "react";

const Home = ({ exerciseType }) => {
  const [inputs, setInputs] = useState([{ weight: "", reps: "" }]);

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
    console.log("Submitted data:", inputs);
    // 這裡可以將 inputs 資料發送到伺服器或進行其他處理
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">
        {exerciseType ? `選擇的運動類型: ${exerciseType}` : "請選擇運動類型"}
      </h1>
      {inputs.map((input, index) => (
        <div key={index} className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="重量"
            value={input.weight}
            onChange={(e) => handleInputChange(index, "weight", e.target.value)}
            className="p-2 border rounded mr-2 flex-1"
          />
          <input
            type="text"
            placeholder="次數"
            value={input.reps}
            onChange={(e) => handleInputChange(index, "reps", e.target.value)}
            className="p-2 border rounded mr-2 flex-1"
          />
          {inputs.length > 1 && (
            <button
              onClick={() => handleRemoveInput(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              刪除
            </button>
          )}
        </div>
      ))}
      <button
        onClick={handleAddInput}
        className="bg-blue-500 text-white p-2 rounded mb-4"
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
  );
};

export default Home;
