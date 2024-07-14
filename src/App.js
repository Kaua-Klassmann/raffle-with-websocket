import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import routes from "./routes/routes.js";
import socket from "./socket/socket.js";

class App {
  constructor() {
    this.express = express();
    this.server = http.createServer(this.express);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
      },
    });

    this.middlewares();
    this.routes();
    this.socket();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }

  socket() {
    socket(this.io);
  }
}

export default new App().server;
