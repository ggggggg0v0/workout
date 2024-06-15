function CSVReader() {
  // 处理上传的CSV文件
  const handleFileUpload = (event) => {
    localStorage.clear();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const contentJSON = Object.entries(JSON.parse(content.toString()));
      const ns = window.location.pathname;
      const key = `${ns}_record`;
      const byPart = JSON.parse(localStorage.getItem(key));

      for (const [key, value] of contentJSON) {
        const [part, type] = key.split("_");
        // const newV = { ...value, part, type };
        value.forEach((v) => {
          byPart.push({ ...v, part, type });
        });
        // console.log(value);
        // localStorage.setItem(key, JSON.stringify(value));
      }
      console.log(
        "byPart",
        byPart.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date);
        })
      );

      localStorage.setItem(
        key,
        byPart.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date) - new Date(a.date);
        })
      );
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex items-center justify-center mb-2">
      <label className="w-16 h-8 border-2 border-blue-300 rounded-lg cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
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
