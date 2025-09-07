import express from "express";

import notesRoutes from "./routes/notesRoutes.js";

const app = express();

app.use("/api/notes", notesRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World122!');
// });

// app.post('/data', (req, res) => {
// res.status(201).send('Data received');
// });
// app.put('/data/:id', (req, res) => {
//     res.status(200).send('Data updated');
// });

// app.delete('/data/:id', (req, res) => {
//     res.status(200).send('Data deleted');
// });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
