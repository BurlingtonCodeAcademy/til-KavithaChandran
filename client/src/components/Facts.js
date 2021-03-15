//imports from react
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Facts(props) {
    // holds the entries once fetched from the database
    const [entryPost, setEntryPost] = useState()
    const [selected, setSelected] = useState("")
    //fetches the entries from database
    useEffect(() => {
        //this is to check if the entries is already populated or not
        if (!entryPost) {
            fetch('/api')
                .then((res) => res.json())
                //result is first stored in this middleware before passing to the entrypost
                .then((entryData) => {
                    setEntryPost(entryData)
                })
        }
    })
    function change(event) {
        let target = event.target;
        setSelected(target.value);
    }


    return (
        <div>
            <h2>Journal Entries</h2>
            <div id='searchContainer'>
                {/* to filter the entries according to their values */}
                <select name='tag' value={selected} onChange={change}>
                    <option value='selection'>Filter by</option>
                    <option value='title'>Title</option>
                    <option value='content'>Content</option>
                    <option value='tag'>Tag</option>
                    <div>Filter by: {selected}</div>
                </select>
                {selected && (
                    <form id="searchForm" onSubmit={selected}>
                        <label>
                            <input type='text' name='filter' />
                        </label>
                        <input type='submit' value='filter' />
                    </form>
                )}

            </div>
            <div>
                {entryPost ? entryPost.map((entry, index) => {

                    return (
                        <div id='FactsContainer' >
                            <hr />
                            <Link to={`/facts/` + entry._id}>
                                <button id={entry._id + "-edit"}>Edit Journal</button>
                            </Link>
                            <h2 key={index + "-title"}>{entry.title}</h2>
                            <p key={index + "-content"}>{entry.content}</p>
                            <h4 key={index + "-date"}>{entry.date}</h4>
                            <h4 key={index + "-tag"}>{entry.tag}</h4>



                        </div>

                    )

                })

                    : "Loading Entry.......... "}
            </div>
        </div>
    )
}

export default Facts



