import * as http from "http";

const server = http.createServer();

server.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log("req method", req.method);
  console.log("req url", req.url);
  console.log("req headers", req.headers);
  const arr: any[] = [];
  req.on("data", (chuck) => {
    arr.push(chuck as any);
  });
  req.on("end", () => {
    const body = Buffer.concat(arr).toString();
    console.log("body", body);
  });
  res.statusCode = 404;
  res.setHeader("X-f", "I am f");
  res.end();
});

server.listen(8888);
