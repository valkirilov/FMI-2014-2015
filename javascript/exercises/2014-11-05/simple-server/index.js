var http = require ('http'),
    https = require('https'),
    printf = require('printf');
    fs = require('fs');

function getEmojis(handleEmojiResponse) {
  var options = {
    host: 'api.github.com',
    path: '/emojis',
    method: 'GET',
    headers: {
      'User-Agent': 'OMGEMOJIS!',
    }
  };

  console.log('Requesting emojis');

  var req = https.request(options, function (res) {
    var buffer = '';
    res.on('data', function (data) {
      buffer += data.toString();
    });

    res.on('end', function () {
      handleEmojiResponse(JSON.parse(buffer));
    });
  });

  req.on('error', function (error) {
    console.error('Error requesting emojis:', error);
  });

  req.end();
}

function getFile(handleFileResponse) {
  console.log('Reading file.');
  var fileContent = fs.readFileSync('content.txt');
  handleFileResponse(fileContent);
}

function getNRequests(reqCallback) {
  console.log('Making requests');

  var urls = ['https://www.google.bg', 'https://www.facebook.com', 'https://www.twitter.com'],
      isResponseHere = false;

  urls.forEach(function(item) {
    console.log('Requesting ' + item);

    var req = https.get(item, function (res) {
      var buffer = '';
      res.on('data', function (data) {
        buffer += data.toString();
      });

      res.on('end', function () {

        console.log('Response from: ' + console.log(res['req']['_headers']['host'].toString()));
        if (isResponseHere)
          return;

        //console.log(res['req']['_headers']['host']);
        
        isResponseHere = true;
        reqCallback(buffer);
      });
    });

    req.on('error', function (error) {
      console.error('Error requesting n pages:', error);
    });

    req.end();
  });

};

var server = http.createServer(function (req, res) {
  if (req.url.match(/\/emojis$/)) {
    res.writeHead(404);
    res.write('Try /emojis');
    res.end();
  }

  if (req.url.match(/file/)) {
    getFile(function(fileContent) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(fileContent);
      res.end();
    });
  }

  if (req.url.match(/nreq/)) {
    getNRequests(function(response) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      console.log('Response here');;
      res.write(response);
      res.end();
    });
  }

  // getEmojis(function (emojisObject) {
  //   var emojiNames = Object.keys(emojisObject),
  //       chosen = parseInt(Math.random() * emojiNames.length),
  //       url = emojisObject[emojiNames[chosen]],
  //       tag = printf(
  //         '<img src="%s" alt="%s"/>',
  //         url,
  //         emojiNames[chosen]
  //       );

  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(tag);
  //   res.end();
  // });
});

server.listen(3000);
console.log('Server listening on port 3000');