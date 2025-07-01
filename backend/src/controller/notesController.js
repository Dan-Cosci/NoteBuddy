import Note from "../models/Note.js";

export async function GetAllNotes(req, res){

  try {
    const notes =  await Note.find().sort({createdAt:-1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getting data:"+error);
    res.status(500).json({message:"internal server error"});
  }
}

export async function GetNotesById(req,res){
  try {
    const note = await Note.findById(req.params.id);

    if(!note) return res.status(404).json({message:"Note not Found"});
    res.json(note);

  } catch (error) {
    console.error("Error in GetNotesById:"+error);
    res.status(500).json({message:"internal server error"});
  }
}

export async function CreateNote(req, res) {
  try {
    const {title,content} = req.body;
    const newNote  = new Note({title,content});
    await newNote.save();
    res.status(200).json({message:"Note Created successfully"});
  } catch (error) {
    console.error("Error in CreateNote Controller:"+error);
    res.status(500).json({message:"internal server error"});
  }
}

export async function UpdateNotes(req,res){
  try {
    const {title,content} = req.body;
    const UpdateNote = await Note.findByIdAndUpdate(req.params.id,{title,content});

    if(!UpdateNote) return res.status(404).json({message:"Note not Found"});

    res.status(200).json({message:"Note Updated Successfully"})
  } catch (error) {
    console.error("Error in UpdateNote Controller:"+error);
    res.status(500).json({message:"internal server error"});
  }
}

export async function DeleteNotes(req,res){
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if(!deletedNote) return res.status(404).json({message:"Note not Found"});

    res.status(200).json({message:"Note deleted successfully"});

  } catch (error) {
    console.error("Error in DeleteNote Controller:"+error);
    res.status(500).json({message:"internal server error"});
  }
}