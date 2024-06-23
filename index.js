import express from "express";
import "dotenv/config";
import ApiRoutes from "./routes/api.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", ApiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
