const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const appRootDir = require('app-root-dir');
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack/webpack.config');
const compiler = webpack(config);

const isDev = process.env.NODE_ENV === 'development';
const ngrok = process.env.ENABLE_TUNNEL === 'true' ? require('ngrok') : false;
const port = process.env.PORT || 3000;

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const projectsController = require('./controllers/projects');
const faqController = require('./controllers/faq');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', port);
app.set('views', path.resolve(appRootDir.get(), 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', express.static('build'))
app.use('/', express.static('public'))

/**
 * Webpack Development Server configuration.
 */
if (isDev) {
  app.use(webpackDevMiddleware(compiler, {
    quiet: true,
    noInfo: true,
    publicPath: config.output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
  }));
  app.use(webpackHotMiddleware(compiler));
}

/**
 * Handle webpack generated assets.
 */
const assetsFilePath = path.resolve(
  appRootDir.get(),
  './build/',
  './assets.json',
);

const assetsMap = JSON.parse(fs.readFileSync(assetsFilePath, 'utf8'));

/**
 * Primary app routes.
 */
app.get('/', (req, res) => {
  homeController.index(req, res, assetsMap);
});

app.get('/about', (req, res) => {
  aboutController.index(req, res, assetsMap);
});

app.get('/projects', (req, res) => {
  projectsController.index(req, res, assetsMap);
});

app.get('/faq', (req, res) => {
  faqController.index(req, res, assetsMap);
});

/**
 * Start Express server.
 */
 app.listen(app.get('port'), () => {

   if (ngrok) {
     ngrok.connect(port, (innerErr, url) => {
       if (innerErr) {
         return console.error(err);
       }
       console.log(`Server tunnel enabled at ${url}`)
     })
   } else {
     console.log('==> %s App is running at http://localhost:%d', chalk.green('✓'), app.get('port')); 
     console.log(chalk.yellow('  Press CTRL-C to stop\n'));
   }

 });

 module.exports = app;
