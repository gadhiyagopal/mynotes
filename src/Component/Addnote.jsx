import React, { useState , useContext } from 'react'
import Header from './Header'
import noteContext from '../Context/noteContext'

export default function Addnote() {

  // Context

  const allData = useContext(noteContext);

  // Creat blank note state

  const [note, setNote] = useState({title:"" , description:"" , tag:"General"})

  // When You Form Chang Data

  const handleChange = (e) => {
    setNote({ ...note , [e.target.name]: e.target.value });
  }

  // when you form submit
  const handleSubmit = (e) =>{

    // stop page reload
    e.preventDefault(); 

    // context API call
    allData.addNote(note.title , note.description , note.tag);

    // blank note state
    setNote({title:"" , description:"" , tag:"General"})
  }

  return (
    <>
      <Header title="Add New Note" desc="Hello Username, Add Your Note On Clouds." />

      <div className="container-fluid p-4">
        <div className="row justify-content-center">
          <div className="col-5 p-2">
            <form method="post" action="">
              <div className="card">
                <div className="card-header py-3">
                  Fill following data properly.
                </div>
                <div className="Card-body p-3">
                  <div className="mb-3">
                    <label htmlfor="exampleInputEmail2" className="form-label">Title</label>
                    <input type="text" className="form-control" id="exampleInputEmail2" name="title" onChange={handleChange} placeholder="Enter Title" value={note.title} />
                  </div>
                  <div className="mb-3">
                    <label htmlfor="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" name="description" rows="7" onChange={handleChange} placeholder="Enter Description" style={{ resize: "none" }} value={note.description}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlfor="exampleInputEmail2" className="form-label me-3">Type</label>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" onChange={handleChange} name="tag" id="inlineRadio1"  value="General" checked={ note.tag === "General" && true } />
                      <label class="form-check-label" for="inlineRadio1">General</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" onChange={handleChange} name="tag" id="inlineRadio2"  value="Personal"  checked={ note.tag === "Personal" && true } />
                      <label class="form-check-label" for="inlineRadio2">Personal</label>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-body-secondary text-center ">
                  <button className="btn btn-primary mx-2" onClick={handleSubmit}>Add New Note</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
