// 存储信息类

class Storage {
  constructor() {
    if (!Storage.instance) {
      Storage.instance = this;
    }
    return Storage.instance;
  }

  LoadInformation(key) {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      const data = localStorage.getItem(key);
      return data;
    } else {
      console.log("Load failed");
      return "";
    }
  }

  SaveInformation(key, data) {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      localStorage.setItem(key, data);
      console.log("save success! ", "key: ", key, " data:", data);
    } else {
      console.log("Save failed!");
    }
  }

  RemoveInformation(key) {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      localStorage.removeItem(key);
    }
  }
}

const storageInstance = new Storage();
export default storageInstance;
