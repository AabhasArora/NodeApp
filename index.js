var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var url = require('url');
var path = require("path"); 
var fs = require("fs"); 

app.set('port', (process.env.PORT || 5000))

app.get('/', function(req, res) {
  var request = url.parse(req.url, true);
  var action = request.pathname;
  var localPath = __dirname;
	
  getFile(localPath+'\\logo.gif', res, "image/gif");
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}