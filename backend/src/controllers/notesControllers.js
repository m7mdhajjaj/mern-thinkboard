
export function getNotes(req, res) {
  res.send("Notes Home Page");
};
export function createNote(req, res) {
  res.status(201).send('Note Created');
};
export function updateNote(req, res) {
    res.status(200).send(`Note with ID ${req.params.id} Updated`);
};
export function deleteNote(req, res) {
    res.status(200).send(`Note with ID ${req.params.id} Deleted`);
};



