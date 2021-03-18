//imports from react
import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


function Facts(props) {
    // holds the entries once fetched from the database
    const [entryPost, setEntryPost] = useState([])
    const [selected, setSelected] = useState("")



    //fetches the entries from database
    useEffect(() => {
        //this is to check if the entries is already populated or not
        if (entryPost.length===0) {

            fetch('/api')
                .then((res) => res.json())
                //result is first stored in this middleware before passing to the entrypost
                .then((entryData) => {

                    setEntryPost(entryData)
                })
        }

    })
    function handleChange(event) {
        let target = event.target;
        console.log(target);
        setSelected(target.value);
    }

    // fetch results based on filter form
    function filter(event) {
        // selection event
        event.preventDefault();
        // make url for fetch, with query params
        let url = `/filter?${selected}=${event.target[0].value}`
        fetch(url)
            .then((res) => res.json())
            .then((entryData) => {
                // then set it in state
                setEntryPost(entryData);
            });
    }



    return (
        <div>
            <h2>Journal Entries</h2>
            <div id='searchContainer'>

                {/* to filter the entries according to their values */}
                <select name='selection' value={selected} onChange={handleChange}>
                    <option value=''></option>
                    <option value='title'>Title</option>
                    <option value='content'>Content</option>
                    <option value='tags'>Tag</option>

                </select>

                <div>Filter by:{selected}</div>
                <div className ='filter'>
                    {selected && (
                <form id='filterContainer' onSubmit={filter}>
                    <label>
                        <input type='text' name='filter' placeholder="Filter:" />
                    </label>
                    <input type='submit' value='Filter' />
                </form>
                /* if results are filtered button shows offering option to remove filters */
            )}
        </div>


            {entryPost.map((entry, index) => {

                return (
                    <div id='FactsContainer' >
                        <hr />
                        <h2 key={index + "-title"}>{entry.title}</h2>
                        <h4 key={index + "-date"}>{entry.date}</h4>
                        <p key={index + "-content"}>{entry.content}</p>
                        <h4 key={index + "-tags"}>{entry.tags + " "}</h4>



                        <Link id="editButtonLink" to={"/EditDelete/" + entry._id}>
                            <button id={entry._id + "-editEntry"}>Edit/Delete Post Data</button>


                        </Link>
                    </div >

                )

            })

            }
        </div >
        </div >
   
)
}

export default Facts
/*<ul>
{arrayOfTags.map(tag, index => {
    if (entry.tags[tag])
        return <li key={index}>{`#${tag}`}</li>;
})}
</ul>*/


