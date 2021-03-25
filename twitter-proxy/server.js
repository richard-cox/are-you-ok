// This basis for this file came from https://developer.twitter.com/en/docs/tutorials/building-an-app-to-stream-tweets

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server);

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

let timeout = 0;

const streamURL = new URL(
  "https://api.twitter.com/2/tweets/sample/stream"
);

const errorMessage = {
  title: "Please Wait",
  detail: "Waiting for new Tweets to be posted...",
};

const authMessage = {
  title: "Could not authenticate",
  details: [
    `Please make sure your bearer token is correct.
      If using Glitch, remix this app and add it to the .env file`,
  ],
  type: "https://developer.twitter.com/en/docs/authentication",
};

const sleep = async (delay) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), delay));
};

const streamTweets = (socket, token) => {
  const config = {
    url: streamURL,
    auth: {
      bearer: token,
    },
    timeout: 31000,
  };

  try {
    const stream = request.get(config);

    stream
      .on("data", (data) => {
        try {
          const json = JSON.parse(data);
          if (json.connection_issue) {
            socket.emit("error", json);
            reconnect(stream, socket, token);
          } else {
            if (json.data) {
              socket.emit("tweet", json);
            } else {
              socket.emit("authError", json);
            }
          }
        } catch (e) {
          console.error('Stream Data Error: ', e);
          console.error('Data: ', data ? data.toString('utf8') : 'no data');
          socket.emit("heartbeat");
        }
      })
      .on("error", (error) => {
        // Connection timed out
        socket.emit("error", errorMessage);
        reconnect(stream, socket, token);
      });
  } catch (e) {
    socket.emit("authError", authMessage);
  }
};

const reconnect = async (stream, socket, token) => {
  timeout++;
  stream.abort();
  await sleep(2 ** timeout * 1000);
  streamTweets(socket, token);
};

io
  .on("connection", async (socket) => {
    console.info('SERVER: connection');// TODO: RC remove
    try {
      const token = BEARER_TOKEN;
      // 'connect' errors (Error: "connect" is a reserved event name)!!!
      io.emit("connected", "Client connected");
      const stream = streamTweets(io, token);
    } catch (e) {
      // Not all exceptions are authErrors... this masks them!!
      console.error('SERVER: authError: ', e);
      io.emit("authError", authMessage);
    }
  });

console.log("NODE_ENV is", process.env.NODE_ENV);

server.listen(port, () => console.log(`Listening on port ${port}`));
