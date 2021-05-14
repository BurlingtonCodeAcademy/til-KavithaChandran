//imports from react
import React from 'react'
import { useState, useEffect } from 'react'
import Modal from './Modal'
import moment from 'moment'

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
            <h3>Make Changes If Required:</h3>
            <hr />

            <form id="editEntry" method="POST" action={`/editEntry/${tempId}`}>
            <h3>Originally Submitted:{entry.title}</h3>
                <label>Title:
                    
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
                        id="formText"
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
                        value={moment(entry.date).format('llll')}
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
                <input id="editButton" type='submit' value='Update' />
            
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

