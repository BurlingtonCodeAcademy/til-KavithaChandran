//imports from react
import React from 'react'
import { useState, useEffect } from 'react'
import Modal from './Modal'

//function to edit and the delete an entry
function EditDelete(props) {
    //properties are set for displaying input info
    const [entry, setEntry] = useState([])
    const [modal, setModal] = useState('hidden')


    let tempId = window.location.pathname.replace("/EditDelete/", "")



    //fetching the json values 
    useEffect(() => {
        if (entry.length === 0) {
            fetch('/api/' + tempId)
                .then((res) => res.json())
                .then((entryData) => {
                    setEntry(entryData);
                });
        }
    });

    //model will pop-out visible to trigger the users to confirm whether to delete the post
    function deleteEntry() {
        setModal("visible");
    }

    return (
        <div id='editDelete-container'>
            <h2>Make the Changes</h2>
            <hr />

            <form id="editEntry" method="POST" action={`/editEntry/${tempId}`}>

                <label>Title:
                    <h3>{entry.title}</h3>
                    <input
                        id="editTitle"
                        name="title"
                        type="text"
                        value={entry.title}
                        onChange={(event) => setEntry({ title: event.target.value })}
                    />
                </label>
                <label>Content:
                    <textarea
                        id="editContent"
                        name="content"
                        type="textarea"
                        placeholder="Enter your Journal Entry here:"
                        value={entry.content}
                        onChange={(event) => setEntry({ content: event.target.value })}
                    />
                </label>
                <label>Date:
                    <input
                        id="editDate"
                        name="date"
                        type="text"
                        value={entry.date}
                    />
                </label>
                <label id='tagTitle'>Choose Tag for your Entry:
                    <input
                        id="editTag"
                        name="tags"
                        type="input"
                        value={entry.tags}
                        onChange={(event) => setEntry({ tags: event.target.value })}
                    />
                </label>
                <input id="editButton" type='submit' value='Edit' />
     </form>
          
                <button id="deleteButton" onClick={deleteEntry}>
                    Delete
      </button>
      
            <Modal
                modal={modal}
                setModal={setModal}
                id={tempId}
            />
        </div>
    );
}
export default EditDelete;
 /*  //<Link to={"/Facts/"}>
 <div id='tag-right'>
                       <label>React<input className='tag-right' type="checkbox" name="tag" value={entry.react} /></label>
                       <label>CSS<input className='tag-right' type="checkbox" name="tag" value={entry.css} /></label>
                       <label>JavaScript<input className='tag-right' type="checkbox" name="tag" value={entry.javascript} /></label>
                       <label>MongoDB<input className='tag-right' type="checkbox" name="tag" value={entry.mongodb} /></label>
                       <label>HTML<input className='tag-right' type="checkbox" name="tag" value={entry.html} /></label>
                   </div>
                   <div id='tag-left'>
                       <label>Lifestyle<input className='tag-left' type="checkbox" name="tag" value={entry.lifestyle} /></label>
                       <label>Elephants<input className='tag-left' type="checkbox" name="tag" value={entry.elephants} /></label>
                       <label>Personal<input className='tag-left' type="checkbox" name="tag" value={entry.personal} /></label>
                       <label>Cows<input className='tag-left' type="checkbox" name="tag" value={entry.cows} /></label>
                       <label>Games<input className='tag-left' type="checkbox" name="tag" value={entry.games} /></label>
                   </div>*/

