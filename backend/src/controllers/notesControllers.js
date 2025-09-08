import Note from "../models/Note.js";
export async function getNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note Not Found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({ message: "Note Created", note: newNote });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }

};
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note Not Found" });
    }
    res.status(200).json({ message: "Note Updated", note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note Not Found" });
    }
    res.status(200).json({ message: "Note Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
