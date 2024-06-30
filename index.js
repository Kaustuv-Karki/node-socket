import express from "express";
import "dotenv/config";
import ApiRoutes from "./routes/api.js";
import http from "http";
import { fileURLToPath } from "url";
import path from "path";

import { Server } from "socket.io";

const io = new Server(http);

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", ApiRoutes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
