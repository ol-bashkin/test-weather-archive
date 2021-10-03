import { fetchChartData } from "./api";

/**
 * Выбрасывание ошибки при обновлении версии базы данных в другой вкладке браузера
 * @param {Event} event - событие изменения версии в другой вкладке браузера
 */
const handleVersionChange = ({ target }) => {
  target.result.close();
  throw new Error("Данные графиков устарели, необходимо обновить страницу.");
};

/**
 * Создание или очистка хранилища
 * @param {IDBDatabase} db - база данных
 * @param {string} storeName - имя нужного хранилища
 * @returns
 */
const initStore = (db, storeName) => {
  const store = db.objectStoreNames.contains(storeName)
    ? db.objectStore(storeName)
    : db.createObjectStore(storeName, { keyPath: "t" });

  store.clear();

  if (!store.indexNames.contains("time")) {
    store.createIndex("time", "t", {
      unique: true,
    });
  }
  return store;
};

/**
 * Обновление базы данных
 * @param {Event} event - Событие необходимости обновления базы данных
 */
const upgradeDb = ({ target }, storeName) => {
  return new Promise(async (resolve, reject) => {
    const db = target.result;
    try {
      const store = initStore(db, storeName);

      //   const data = await fetchChartData(storeName);

      //   data.forEach((record) => {
      //     store.add(record);
      //   });

      resolve({ status: "ok" });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Интерфейс запроса к базе данных
 * @param {string} storeName - имя необходимого хранилища
 * @returns
 */
export const chartRequest = (storeName) =>
  new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open("chartData", 1);

    openRequest.onupgradeneeded = async (event) => {
      await upgradeDb(event, storeName);
      chartRequest(storeName);
    };

    openRequest.onerror = function ({ target }) {
      reject(target.error);
    };

    openRequest.onsuccess = function ({ target }) {
      const db = target.result;

      resolve(db);

      db.onversionchange = (event) => {
        handleVersionChange(event);
      };
    };
  });
