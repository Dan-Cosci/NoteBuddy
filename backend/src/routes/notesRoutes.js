import express from "express";
import * as NotesController from "../controller/notesController.js";

const router = express.Router();

router.get("/", NotesController.GetAllNotes);
router.get("/:id", NotesController.GetNotesById);
router.post("/", NotesController.CreateNote);
router.put("/:id", NotesController.UpdateNotes);
router.delete("/:id", NotesController.DeleteNotes);

export default router;

