const http = require("http");

function dataControl(req, resp) {
  resp.write("<h1>hello !, this is abhishek ojha </h1>");
  resp.end();
}

http.createServer(dataControl).listen(1100);
