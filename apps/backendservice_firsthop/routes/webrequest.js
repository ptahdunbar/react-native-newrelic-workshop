const { parsed: { DOWNSTREAM_URL } } = require('dotenv').config()
const http = require('http');
const newrelic = require('newrelic');
const logger = require('../logger')

const webrequest = (app, fs) => {
  // READ
  app.get('/webrequest', (req, res) => {
    console.log("hit first hop service");
    logger.info('First hop is executed');
    console.log(req.headers);
    logger.info(`URL: ${DOWNSTREAM_URL}/users`)

    http.get(`${DOWNSTREAM_URL}/users`, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log('end', data)
        logger.info(data);
        res.send(data);
        newrelic.addCustomAttributes('userID','gqx293795');
      });

    }).on("error", (err) => {
      console.error(err);
      logger.error(err);
    });
  });
};

module.exports = webrequest;
