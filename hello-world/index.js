const http= require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const args= minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  if (req.url==='/'){
    serveFile('home.html', res);

  }
  else if(req.url==='/project'){
    serveFile('project.html', res);
  }
  else if(req.url==='/registration'){
    serveFile('registration.html', res);
  }
  else if (req.url === '/registration.js') {
    serveStaticFile('registration.js', 'text/javascript', res);
  }
  else{
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Not Found');
  }

  });

function serveFile(fileName, res) {
  const filepath=path.join(__dirname,fileName);
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Error loading file');
      return;
    }
    else{

    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
    }
  });
} 
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}
);
