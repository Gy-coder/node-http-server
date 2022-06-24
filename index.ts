import * as http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("有人请求了");
  res.end("hi");
});

server.listen(8888);
