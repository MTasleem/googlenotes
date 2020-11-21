import React, { useState } from 'react'
import { render } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import "../HomePage/HomePage.css"
import { deleteNotes } from "../_actions";

export default function LeftPanel() {
  // const [deleteNotes, setDeleteNotes] = useState(0)
  const dispatch = useDispatch();
  const noteState = useSelector(state => state.users);
  const notes = noteState && Object.keys(noteState).length > 0 ? noteState['notes'] : null;

  const handleDeleteElement = (index) => {
    // setDeleteNotes(index);
    dispatch(deleteNotes(index))
  }

  return (
    <section className="left-side">
      {
        notes && notes.length > 0 ?
          notes.map((item, index) => {
            return (
              <section className="wrap-content pos-relative" key={index}>
                <div className="message-body pos-relative" key={index}>
                  <div className="title"><strong>{item?.title}</strong></div>
                  <div className="body">{item?.body}</div>
                </div>
                <span className="pos-absolute" onClick={(e) => handleDeleteElement(index)}>&times;</span>
              </section>)
          })
          :
          <div className="no-data">
            No Notes Available
        </div>
      }
    </section >
  );
}