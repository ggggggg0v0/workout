import classNames from "classnames";

import { work } from "./consts";

// custom hook
import { useCurrentMinute } from "@/pages/flow/utils/time";

// utils
import { getCurrentHour } from "@/pages/flow/utils/time";

// styles
import "./timebox.scss"; // 可能需要自行設置 CSS 樣式
import { useMemo } from "react";

function checkHasActive(currentMinute, data) {
  let activeRecord;
  let hasActive = false;
  data.forEach((record, i) => {
    const { start, end } = record;
    if (currentMinute >= start && currentMinute <= end) {
      activeRecord = record;
      hasActive = true;
    }
  });

  return [hasActive, activeRecord];
}

function C({ recordList, handleClickBox, newRecord, action }) {
  const currentTimeMinute = useCurrentMinute();

  const generateTable = () => {
    const numColumns = 24;
    const numRows = 60;
    // 生成包含方形 div 的數組
    const grid = [];
    const timerow = [
      <div key="hourText" className={classNames("square", "hourText")} />,
    ];

    // 第 0 row 已經預先放到 timerow 裡了
    for (let i = 1; i < 61; i++) {
      timerow.push(
        <div
          key={`timeRow_${i}`}
          className="square"
          style={{ fontSize: "11px", color: "#3c4042" }}
        >
          {(i !== 0 && i % 10) === 0 && i}
        </div>
      );
    }

    grid.push(
      <div key="hourTextWrap" style={{ display: "flex" }}>
        {timerow}
      </div>
    );

    for (let column = 0; column < numColumns; column++) {
      const columns = [];

      columns.push(
        <div
          key={`hour_${column}`}
          className={classNames("square", "hourText")}
        >
          {column + 1}
        </div>
      );

      for (let row = 0; row < numRows; row++) {
        const currentMinute = row + column * 60 + 1;

        let [hasActive, activeRecord] = checkHasActive(
          currentMinute,
          recordList
        );

        const isProcessing =
          action === work &&
          newRecord.start > 0 &&
          newRecord.start < currentMinute &&
          currentTimeMinute > currentMinute;

        columns.push(
          <div
            onClick={() => {
              if (hasActive) {
                handleClickBox(activeRecord);
              }
            }}
            key={`row_${currentMinute}`}
            className={classNames(
              { now: currentTimeMinute === currentMinute },
              { squareActive: hasActive || isProcessing },
              { squareDefaultStyle: !hasActive },
              "square"
            )}
          />
        );
      }

      grid.push(
        <div
          key={`column_${column}`}
          className={classNames(
            { currentRow: getCurrentHour() === column },
            "row"
          )}
        >
          {columns}
        </div>
      );
    }
    return grid;
  };

  const grid = useMemo(generateTable, [
    action,
    newRecord,
    recordList,
    currentTimeMinute,
  ]);

  return <div className="grid-container">{grid}</div>;
}

export default C;
