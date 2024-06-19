import { getToday } from "@/pages/flow/utils/time";

interface Record {
  start: number;
  end: number;
  content: string;
}

interface RecordList extends Array<Record> {}

const defaultWorkTime = [300, 600, 900];
const defaultRelaxTime = [300, 600, 900];

const defaultSetting = {
  workTime: defaultWorkTime,
  relaxTime: defaultRelaxTime,
};

class local {
  setRecordList(record) {
    const today = getToday();
    const ns = window.location.pathname;
    const key = `${ns}_${today}_record`;
    localStorage.setItem(key, JSON.stringify(record));
  }

  getRecordList(date): RecordList {
    const today = date || getToday();
    const ns = window.location.pathname;
    const key = `${ns}_${today}_record`;
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  }

  getSetting() {
    const ns = window.location.pathname;
    const key = `${ns}_setting`;
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultSetting;
  }

  setSetting(newSetting) {
    const ns = window.location.pathname;
    const key = `${ns}_setting`;
    localStorage.setItem(key, JSON.stringify(newSetting));
  }

  resetSetting() {
    const ns = window.location.pathname;
    const key = `${ns}_setting`;
    localStorage.setItem(key, JSON.stringify(defaultSetting));
    return this.getSetting();
  }
}

export default new local();
