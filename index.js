const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile").development;

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (err) {
    res.status(500).json(err);
  }
});
server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/api/cohorts/:id/students", async (req, res) => {
  try {
    const students = await db("students")
      .where({ cohort_id: req.params.id })
      .first();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post("/api/cohorts", async (req, res) => {
  try {
    const [id] = await db("cohorts").insert(req.body);

    const cohort = await db("cohorts")
      .where({ id })
      .first();

    res.status(200).json(cohort);
  } catch (err) {
    res.status(500).json(err);
  }
});
server.put("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "record not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(200).end();
    } else {
      res.status(404).json({ message: "record not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
