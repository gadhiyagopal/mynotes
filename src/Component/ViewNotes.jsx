import React, { useContext } from 'react'
import Header from './Header'
import SingleNote from './SingleNote'
import noteContext from '../Context/noteContext'

export default function ViewNotes() {


// context
  const allData = useContext(noteContext);
  const { allNotes , fetchAllNotes } = allData

  // fetch all note when component mount

  useEffect(() => {
    fetchAllNotes();
  },[]);

  return (
    <>
    
    <Header title="View All Notes" desc="Hello Username, Add Your Note On Clouds is hear."/>

    <div className="container p-3">
        <div className="row justify-content-end p-2">
            <div className="col-2">
                <button className="btn btn-danger">Remove All Notes</button>
            </div>
        </div>
    </div>
    <div className="container mycontent">
    <div className="row">

        
    </div>
    </div>
    
    
    </>
  )
}
