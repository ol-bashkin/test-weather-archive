const precipitation = require("./data/precipitation.json");
const temperature = require("./data/temperature.json");

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router({
  precipitation,
  temperature,
});
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/api/v1/*": "/$1",
  })
);

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
