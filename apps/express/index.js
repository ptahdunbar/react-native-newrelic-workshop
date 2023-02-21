// Import the New Relic agent configuration module.
const express = require("express");
const bodyParser = require('body-parser');
const newrelic = require("newrelic");
const { parsed: { PORT } } = require('dotenv').config()
const { log } = require("./log");
const app = express();
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const port = PORT ? PORT : 3000;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

app.get("/", async function main(req, res) {
  log.info('loading main route');

  await new Promise((resolve) => {
    setTimeout(resolve, random(300, 1000))
  })

  res.status(200).json({
    message: "Hello World"
  });
});

app.post("/predictions", async function (req, res) {
  log.info('loading stable diffusion route');

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/stability-ai/stable-diffussion/versions
      version: "6359a0cab3ca6e4d3320c33d79096161208e9024d174b2311e5a21b6c7e1131c",
      // This is the text prompt that will be submitted by a form on the frontend
      input: { prompt: req.body.prompt },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    log.error(error.detail);
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  log.info('prediction')
  log.info(JSON.stringify(prediction))
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
});

app.get("/predictions/:id", async function (req, res) {
  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + req.params.id,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  
  if (response.status !== 200) {
    let error = await response.json();
    log.error(error.detail)
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  log.info('prediction')
  log.info(JSON.stringify(prediction))
  res.end(JSON.stringify(prediction));
});

app.post("/openai", async function hello(req, res) {
  let message = '';
  if (!configuration.apiKey) {
    message = "OpenAI API key not configured, please follow instructions in README.md"
    log.error(message);
    res.status(500).json({
      error: {
        message,
      }
    });
    return;
  }
  
  const input = req.body.prompt || '';
  if (input.trim().length === 0) {
    message = "Please enter a prompt to generate text from."
    log.error(message);
    res.status(400).json({
      error: {
        message,
      }
    });
    return;
  }

  try {
    log.info('attempting to use text-davinci-003');
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(input),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      log.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      log.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
});

function generatePrompt(input) {
  return `${input}`;
}

// Global error handler - route handlers/middlewares which throw end up here
app.use((err, req, res, next) => {
  newrelic.noticeError(err);
  res.status(err.status || 500);
  res.end();
});

app.listen(port, function server() {
  log.info(`Now listening on port ${port}...`);
});