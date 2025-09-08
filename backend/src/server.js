import express from "express";

import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/notes", notesRoutes);
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
