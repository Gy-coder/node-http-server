import * as http from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";
const server = http.createServer();

const publicPath = p.resolve(__dirname, "public");

server.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { method, url: path, headers } = req;
  const { search, pathname } = url.parse(path);
  switch (pathname) {
    case "/index.html":
      fs.readFile(p.resolve(publicPath, "index.html"), (err, data) => {
        if (err) throw err;
        res.end(data.toString());
      });
      break;
    case "/style.css":
      res.setHeader("Content-Type", "text/css;charset=utf-8");
      fs.readFile(p.resolve(publicPath, "style.css"), (err, data) => {
        if (err) throw err;
        res.end(data.toString());
      });
      break;
    case "/main.js":
      res.setHeader("Content-Type", "text/javascript;charset=utf-8");
      fs.readFile(p.resolve(publicPath, "main.js"), (err, data) => {
        if (err) throw err;
        res.end(data.toString());
      });
      break;
    default:
      res.statusCode = 404;
      res.end();
  }
});

server.listen(8888, () => {
  console.log("success");
});
