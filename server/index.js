const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const compression = require('compression');

// app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(compression());

app.use(express.static(path.join(__dirname, '../', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
  console.error(err.stack);
});

const server = app.listen(9000, () => {
	const port = server.address().port;
  console.log(`App listening at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});