//imports from react
import { useState, useEffect } from 'react'
import Modal from './Modal.js'

//function to edit and the delete an entry
function EditDelete(props) {
    //properties are set for displaying input info
    const [entry, setEntry] = useState(null)
    const [modal, setModal] = useState('hidden')
    //const [editTitle, setEditTitle] = useState(props.entry.title);
    //const [editContent, setEditContent] = useState(props.entry.content);
    let id = props.match.params.ObjectId

    //fetching the json values 
    useEffect(() => {
        if (!entry) {
            fetch(`/api/${id}`)
                .then((res) => res.json())
                .then((post) => {

                    setEntry(post);
                });
        }
    });

    //model will pop-out visible to trigger the users to confirm whether to delete the post
    function deleteEntry() {
        setModal("visible");
    }

    return (
        <div id='editDelete-container'>

            {entry && (
                <form id="editEntry" method="POST" action={`/editEntry/${id}`}>

                    <label>Title:</label>
                    <input
                        id="editTitle"
                        name="title"
                        type="text"
                        value={entry.title}
                    //onChange={(event)=>setEditTitle(event.target.value)}
                    />
                    <label>Content:</label>
                    <textarea
                        id="editContent"
                        name="content"
                        placeholder="Enter your Journal Entry here:"
                        value={entry.content}
                    //onChange={(event)=>setEditContent(event.target.value)}
                    />
                    <label>Date:</label>
                    <input
                        id="editDate"
                        name="date"
                        type="text"
                        value={entry.date}
                    />
                    <label id='tagTitle'>Choose Tag for your Entry:</label>
                    <div id='tag-right'>
                        <label>React<input className='tag-right' type="checkbox" name="tag" value='javascript' /></label>
                        <label>CSS<input className='tag-right' type="checkbox" name="tag" value='css' /></label>
                        <label>JavaScript<input className='tag-right' type="checkbox" name="tag" value='javascript' /></label>
                        <label>MongoDB<input className='tag-right' type="checkbox" name="tag" value='mongodb' /></label>
                        <label>HTML<input className='tag-right' type="checkbox" name="tag" value='html' /></label>
                    </div>
                    <div id='tag-left'>
                        <label>Lifestyle<input className='tag-left' type="checkbox" name="tag" value='lifestyle' /></label>
                        <label>Elephants<input className='tag-left' type="checkbox" name="tag" value='elephants' /></label>
                        <label>Personal<input className='tag-left' type="checkbox" name="tag" value='personal' /></label>
                        <label>Cows<input className='tag-left' type="checkbox" name="tag" value='cows' /></label>
                        <label>Games<input className='tag-left' type="checkbox" name="tag" value='games' /></label>
                    </div>
                    <input id="submit" type='submit' value='Edit' />


                </form>


            )}
            <button onClick={deleteEntry}>
                Delete
      </button>
            <Modal
                modal={modal}
                setModal={setModal}
                id={id}
            />
        </div>
    );
}
export default EditDelete;


