import "./style.css";

import { fetchTemperatureData } from "./src/services/localDataMethods";

document.querySelector("#app").innerHTML = `
  <h1>Test Weather Archive</h1>
  <a href="https://github.com/ol-bashkin/test-weather-archive#readme" target="_blank">Documentation</a>
`;

(async () => {
  const store = await fetchTemperatureData();
  console.log(store);
})();
