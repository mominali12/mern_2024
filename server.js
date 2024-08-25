import express, { Route } from "express";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

import mongoose from "mongoose";

// Resolving __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// middleware to recieve JSON
app.use(express.json());

// Adding API end-points and route handlers
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// Use client app
app.use(express.static(path.join(__dirname, "/client/dist")));

// Render client for any path
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

mongoose
  .connect("mongodb://localhost:27017/", { dbName: "demo_db" })
  .then(() => {
    console.log("connected to mongo db successfully");
    app.listen(4000, "localhost", () => console.log("Listening to port 4000"));
  })
  .catch((err) => console.log(err));
