import * as http from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";
const server = http.createServer();

const publicPath = p.resolve(__dirname, "public");

server.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { method, url: path, headers } = req;
  const { search, pathname } = url.parse(path as string);
  if (method === "POST") {
    res.statusCode = 405;
    res.end();
    return;
  }
  let filename = pathname!.slice(1);
  if (filename === "") filename = "index.html";
  fs.readFile(p.resolve(publicPath, filename), (err, data) => {
    if (err) {
      if (err.errno === -2) {
        res.statusCode = 404;
        fs.readFile(p.resolve(publicPath, "notFound.html"), (err, data) => {
          res.end(data);
        });
      } else {
        res.statusCode = 500;
        res.end("server error");
      }
    } else {
      res.setHeader("Cache-Control", "public,max-age=20000000");
      res.end(data);
    }
  });
});

server.listen(8888, () => {
  console.log("success");
});
