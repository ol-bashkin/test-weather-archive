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

server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

server.use(
  jsonServer.rewriter({
    "/api/v1/*": "/$1",
  })
);

server.use(router);
server.listen(3004, () => {
  console.log("JSON Server is running");
});
