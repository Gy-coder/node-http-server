import * as http from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";
const server = http.createServer();

const publicPath = p.resolve(__dirname, "public");

server.on("request", (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { method, url: path, headers } = req;
  const { search, pathname } = url.parse(path as string);
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
      res.end(data);
    }
  });
});

server.listen(8888, () => {
  console.log("success");
});

// case "/index.html":
//       fs.readFile(p.resolve(publicPath, "index.html"), (err, data) => {
//         if (err) throw err;
//         res.end(data.toString());
//       });
//       break;
