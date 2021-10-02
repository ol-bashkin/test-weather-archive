const HOST = import.meta.env.DEV ? "http://localhost:3004/api/v1/" : "/api/v1/";

/**
 * Получение данных графика
 * @param {string} dataType - тип данных
 * @returns {Array} - Возвращает данные для графика
 */
export async function fetchChartData(dataType) {
  const response = await fetch(`${HOST}${dataType}`);

  if (response.ok) {
    return await response.json();
  } else {
    console.error("Ошибка HTTP: " + response.status);
  }
}
