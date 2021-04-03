import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routers from './app/routers';
import './database';

class App {
  constructor() {
    this.server = express();
    this.config();
    this.routers();
  }

  config() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cors());

    dotenv.config({
      path: process.env.NODE_ENV === 'test' ? './../.env.test' : './../.env',
    });
  }

  routers() {
    this.server.use(routers);
  }
}

export default new App().server;
