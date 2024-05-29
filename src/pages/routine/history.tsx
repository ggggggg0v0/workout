function Modal({ onClose, records }) {
  const r = [];

  for (const [key, value] of Object.entries(records)) {
    const r2 = [];
    for (const [key2, value2] of Object.entries(value)) {
      r2.push(
        <p>
          {key2}:{value2}
        </p>
      );
    }

    r.push(
      <div>
        <p>{key}</p>
        {r2}
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center">
      <div className="w-full bg-slate-50 p-5 shadow-md shadow-stone-400 flex flex-col ">
        <h1 className="text-3xl">Records</h1>
        {r}
        <button className=" border-4 bg-slate-400" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
