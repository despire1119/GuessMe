var http = require("http");
http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h1 style='text-align: center'>Node.js</h1>");
    res.end('<p style="text-align: center">?In Chinese?</p>');
}).listen(8899);
