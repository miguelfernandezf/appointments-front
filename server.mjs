import  fs from 'fs';
import https from 'https';
import express from 'express';
import next from 'next';

const app = next({ dev: true });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./certs/localhost-key.pem'),
  cert: fs.readFileSync('./certs/localhost.pem'),
};

app.prepare().then(() => {
  const server = express();

  server.all(/.*/, (req, res) => {
    return handle(req, res)
  })

  https.createServer(httpsOptions, server).listen(3000, () => {
    console.log('> Server started on https://localhost:3000');
  });
});
