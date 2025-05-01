import React , {useState} from 'react'
import noteContext from './noteContext'

const NoteData = ( props ) => {

    // All Notes

    const [allNotes, setAllNotes] = useState([])
  
    // server hostname

    const servername = "http://localhost:5000/";

    // API-1 add New Notes [POST]
    const addNote = async ( title , description , tag ) => {

        // Fetch API
        const response = await fetch(`${servername}api/note/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkODA1OTQ1OGZhYWI4ZjEwODYyYmY1In0sImlhdCI6MTc0MjIxMDQ1Mn0.HoS_P1xAn-tE0YGu5i-kmXgrPZF6-MjYMfBaR5hr84k"
            },
            body: JSON.stringify({ title , description , tag }),
          });
          
          const json = await response.json();
    }

    // API-2 Fetch All Notes Of Specific User [GET]
    const fetchAllNotes = async () => {

        // Fetch API
        const response = await fetch(`${servername}api/note/fetchallnotes`, {
            method: "GET",
            headers: {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdkODA1OTQ1OGZhYWI4ZjEwODYyYmY1In0sImlhdCI6MTc0MjIxMDQ1Mn0.HoS_P1xAn-tE0YGu5i-kmXgrPZF6-MjYMfBaR5hr84k"
            }
        });

        const json = await response.json();

        setAllNotes(json);
    }

    return (
        <noteContext.Provider value={{ allNotes , addNote , fetchAllNotes }} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteData ;