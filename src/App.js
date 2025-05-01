import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Aboutus from './Component/Aboutus';
import Addnote from './Component/Addnote';
import Footer from './Component/Footer';
import Home from './Component/Home';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import Register from './Component/Register';
import ViewNotes from './Component/ViewNotes';
import NoteData from './Context/noteData';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>

      <NoteData>
      <Routes>
        <Route path="/" element= { <Home/> } />
        <Route path="/about-us" element= { <Aboutus/> } />
        <Route path="/register" element= { <Register/> } />
        <Route path="/login" element= { <Login/> } />
        <Route path="/add-note" element= { <Addnote/> } />
        <Route path="/view-notes" element= { <ViewNotes/> } />
      </Routes>
      </NoteData>

      <Footer/>

      </BrowserRouter>
      
    </>
  );
}

export default App;
