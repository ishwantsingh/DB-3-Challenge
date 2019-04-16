const express = require("express");
const helmet = rrequire("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile").development;

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());
