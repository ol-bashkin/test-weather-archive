import { chartRequest } from "./localData";

export const fetchTemperatureData = async () => {
  const db = await chartRequest("temperature");
  return db;
};
