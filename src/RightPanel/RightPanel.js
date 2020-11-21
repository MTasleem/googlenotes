import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import "../HomePage/HomePage.css"
import { addNotes } from "../_actions";


export default function RightPanel() {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState({ "title": "", "body": "" });
  const [title, setTitle] = useState(false)
  const [body, setBody] = useState(false)
  const titleRef = useRef();
  const bodyRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (notes['title'] && notes['body']) {
      dispatch(addNotes(notes))
    } else {
      setTitle(true)
      setBody(true)
    }
  }

  const handleTitle = (e) => {
    if (e.target.name == "title" && e.target.value) {
      setTitle(false)
    } else {
      setTitle(true)
    }
  }

  const handleBody = (e) => {
    if (e.target.name == "body" && e.target.value) {
      setBody(false)
    } else {
      setBody(true)
    }
  }

  const clearField = (e) => {
    titleRef.current.value = '';
    bodyRef.current.value = '';
    setNotes({ title: '', body: '' })
  }

  return (
    <section className="right-side">
      <section className="add-notes">
        <button type="button" className="btn btn-default float-right" onClick={clearField}><strong>+</strong> Add Note</button>
      </section>
      <section className="add-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titleLabel">Title:</label>
            <input type="text" className="form-control" ref={titleRef} name="title" id="titleLabel" onChange={(e) => { setNotes({ ...notes, title: e.target.value }); handleTitle(e) }} />
            <div className="errorMsg">
              {
                title ? 'Enter Title' : null
              }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="bodyLabel">Body:</label>
            <textarea className="form-control" id="bodyLabel" ref={bodyRef} name="body" rows="10" onChange={(e) => { setNotes({ ...notes, body: e.target.value }); handleBody(e) }}></textarea>
            <div className="errorMsg">
              {
                body ? 'Enter Body' : null
              }
            </div>
          </div>
          <section className="save-btn">
            <button type="submit" className="btn btn-primary">Save</button>
          </section>
        </form>
      </section>
    </section>
  );
}