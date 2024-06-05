import { useState, useEffect } from "react";

export const getToday = (day) => {
  var currentDate = day ? new Date(day) : new Date();

  var year = currentDate.getFullYear();
  var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  var day = currentDate.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
};

export const getTime = (day) => {
  var currentDate = day ? new Date(day) : new Date();

  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  return `${hour}:${minute}`;
};

export const getCurrentMinute = () => {
  // 創建一個新的 Date 物件，表示當前時間
  const currentDate = new Date();

  // 使用 Date 物件的 getMinutes() 方法來取得當前的分鐘數
  const currentMinute = currentDate.getMinutes();
  const currentHour = currentDate.getHours();

  return currentMinute + currentHour * 60;
};

export const getCurrentHour = () => {
  // 創建一個新的 Date 物件，表示當前時間
  const currentDate = new Date();

  return currentDate.getHours();
};

export const useCurrentMinute = () => {
  const [time, setTime] = useState(getCurrentMinute());

  useEffect(() => {
    // 在這裡設置定時器
    const intervalId = setInterval(() => {
      // 在定時器的回呼函式中更新狀態
      setTime(getCurrentMinute());
    }, 1000); // 每隔 1000 毫秒 (1 秒) 觸發一次定時器

    // 在組件解除掛載時清除定時器
    return () => {
      clearInterval(intervalId);
    };
  }, []); // 空的依賴陣

  return time;
};

export const timeFormat = (time) => {
  let hour = Math.floor(time / 60);
  let minute = Math.floor(time % 60);

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  return `${hour}:${minute}`;
};

export function getWeekDates(date) {
  const inputDate = new Date(date);
  const day = inputDate.getDay(); // 取得星期幾（0:星期日，1:星期一，依此類推）

  const weekStart = new Date(inputDate);
  weekStart.setDate(inputDate.getDate() - day + (day === 0 ? -6 : 1)); // 設置為當週的星期一

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const weekDay = new Date(weekStart);
    weekDay.setDate(weekStart.getDate() + i);
    weekDates.push(getToday(weekDay));
  }

  return weekDates;
}
