function CSVReader() {
  // 处理上传的CSV文件
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      for (const [key, value] of Object.entries(JSON.parse(content))) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex items-center justify-center mb-2">
      <label className="w-16 h-8 border-2 border-blue-300 rounded-lg cursor-pointer bg-blue-50 ">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-8 h-8 text-blue-500 dark:text-blue-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept=".json"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}

export default CSVReader;
