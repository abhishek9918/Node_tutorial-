const http = require("http");
const colors = require("colors");

function dataControl(req, resp) {
  resp.write("<h1>hello !, this is abhishek ojha </h1>");
  resp.end();
}

console.log("package.json".red);
http.createServer(dataControl).listen(1100);
