import express from "express";

import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import ratelimiter from "./middleware/ratelimiter.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
  })
);
app.use(ratelimiter);

app.use("/api/notes", notesRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
});

