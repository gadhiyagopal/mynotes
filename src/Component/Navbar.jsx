import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <nav className="navbar bg-dark navbar-expand-lg fixed-top "data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">MyNotes</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
          Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about-us">
          About Us
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/register" >
          Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/login" >
          Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/add-note" >
          Add Note
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/view-notes" >
          View All Notes
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
