const express = require("express");
const router = express.Router();
const fetchUser = require("./../middleware/fetchuser");
const { check, validationResult } = require("express-validator");
const Notes = require('./../models/Notes');

// Route-1 : add new note for login user using : POST   /api/note/addnote
router.post(
  "/addnote",
  fetchUser,
  [
    check("title").notEmpty().withMessage("Please Enter Title..!"),
    check("description").notEmpty().withMessage("Please Enter Description..!"),
  ],
  async (req, res) => {
    
    try{
        // check validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json(errors);
        }
        else{

            // store in mongoDB
            const { title , description , tag } = req.body;
            const note = Notes({ title , description , tag , user: req.user })

            const data = await note.save();

            res.json(data);
        }

    }
    catch(err){
        return res.status(400).json({ error:"Something Want Wrong.", message:err.message });
    }

  }
);

// Route-2 : get all notes of login user using : GET   /api/note/fetchallnotes
router.get(
    "/fetchallnotes",
    fetchUser,
    async (req, res) => {
        try{
            const allnotes = await Notes.find({"user": req.user});
            res.send(allnotes);
        }
        catch(err){
            return res.status(400).json({ error:"Something Want Wrong.", message:err.message });
        }
    }
);    

// Route-3 : Remove specific note of login user using : DELETE   /api/note/deletenote
router.delete(
    "/deletenote/:id",
    fetchUser,
    async (req, res) => {
        try{
            const note = await Notes.findById(req.params.id);
            if( !note ){
                return res.status(400).send( 'Note is Not Exist.' );
            }

            const deletedNote = await Notes.findByIdAndDelete(req.params.id);
            return res.json( { message: 'Note Remove Successfully.', deletedNote:deletedNote} ); 
        }
        catch(err){
            return res.status(400).json({ message:"Something Want Wrong.", message:err.message });
        }
    }
);    

// Route-4 : Remove all notes of login user using : DELETE   /api/note/deleteallnotes
router.delete(
    "/deleteallnotes",
    fetchUser,
    async (req, res) => {
        try{
            const deletedNote = await Notes.deleteMany({"user":req.user});
            return res.json( { message: 'All Note Remove Successfully.', deletedNote:deletedNote} ); 
        }
        catch(err){
            return res.status(400).json({ message:"Something Want Wrong.", message:err.message });
        }
    }
);   

// Route-3 : update specific note of login user using : PUT  /api/note/updatenote
router.put(
    "/updatenote/:id",
    fetchUser,
    async (req, res) => {
        try{
            const { title , description , tag } = req.body;

            // create update object
            const updatedNote = {};
            if( title ){ updatedNote.title = title };
            if( description ){ updatedNote.description = description };
            if( tag ){ updatedNote.tag = tag };
            // console.log(updatedNote);

            // check note is exist or not
            let note = await Notes.findById( req.params.id );
            if( !note ){
                return res.status(404).send("Note Not Found..!");
            }  
            
            // Check Owner of Note
            if( note.user.toString() != req.user ){
                return res.status(401).send('Update Operation Not Allowed.');
            }

            // update not in MongoDB
            const newNote = await Notes.findByIdAndUpdate( req.params.id , {$set:updatedNote} , {new:true} );  
            res.json( { message: 'Note Update Successfully.', updatedNote:newNote} );

        }
        catch(err){
            return res.status(400).json({ message:"Something Want Wrong.", message:err.message });
        }
    }
); 

module.exports = router;
