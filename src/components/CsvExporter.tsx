function downloadCsv(csv, name) {
  // Create a blob with the CSV data
  const blob = new Blob([csv], { type: "text/csv" });

  // Create a link element
  const link = document.createElement("a");

  // Set the download attribute with a filename
  link.download = `${name}.csv`;

  // Create a URL for the blob and set it as the href attribute
  link.href = window.URL.createObjectURL(blob);

  // Append the link to the body
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}

function CSVExporter() {
  const handleClick = () => {
    localStorage.removeItem("record");

    const allKeys = Object.keys(localStorage);
    const newRecord = [];

    const header = [
      "date",
      "part",
      "type",
      "sets1",
      "weight1",
      "sets2",
      "weight2",
      "sets3",
      "weight3",
      "sets4",
      "weight4",
      "sets5",
      "weight5",
      "note",
    ];
    const data = [header.join(",")];

    allKeys.forEach((key) => {
      const byPart = JSON.parse(localStorage.getItem(key));
      const [p, t] = key.split("_");

      byPart.forEach(({ date, sets, note }) => {
        const r = [];
        sets.forEach(({ weight, reps }) => {
          r.push(reps, weight);
        });

        newRecord.push({
          date,
          part: p,
          type: t,
          sets,
        });

        data.push([date, p, t, ...r, note].join(",") + "\n");
      });
    });

    localStorage.setItem("record", JSON.stringify(newRecord));

    downloadCsv(data.join("\n"), "s");
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
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        </div>
        <input className="hidden" onClick={handleClick} />
      </label>
    </div>
  );
}

export default CSVExporter;
