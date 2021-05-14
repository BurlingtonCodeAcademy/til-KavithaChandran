import React from 'react'

//setting up the form for the home-page to add the entries to your database
function Home(props) {

   
    return (
        <div id='home-container'>
            {/* title set-up*/}
            <div id="pageTitle"><h2><span>What did you learn today? Create a Journal:</span></h2></div>
            <form id='formEntry' method="POST" action={'/addEntry'}>

                <input id="formTitle" type="text" name="title" placeholder="Title" />

                <textarea id="formText" type="text" name="content" placeholder="Enter your Journal Post here" />
                {/*labels for different tags are set up */}
                <label id='tagTitle'>Categories:<span> select all relevant categories</span></label>
                <div id='tag-right'>
                    <label>React<input className='tag-right' type="checkbox" name="tags" value='javascript' /></label>
                    <label>CSS<input className='tag-right' type="checkbox" name="tags" value='css' /></label>
                    <label>JavaScript<input className='tag-right' type="checkbox" name="tags" value='javascript' /></label>
                    <label>MongoDB<input className='tag-right' type="checkbox" name="tags" value='mongodb' /></label>
                    <label>HTML<input className='tag-right' type="checkbox" name="tags" value='html' /></label>
                </div>
                <div id='tag-left'>
                <label>Family<input className='tag-left' type="checkbox" name="tags" value='family' /></label>
                    <label>Fun<input className='tag-left' type="checkbox" name="tags" value='fun' /></label>
                    <label>Personal<input className='tag-left' type="checkbox" name="tags" value='personal' /></label>
                    <label>Travel<input className='tag-left' type="checkbox" name="tags" value='travel' /></label>
                    <label>Lifestyle<input className='tag-left' type="checkbox" name="tags" value='lifestyle' /></label>
                </div>
                {/* click the submit button to add your journal to the database*/}
                <input id="submit" type='submit' value='Submit Entry' />
            </form>
        </div>
    )
}
export default Home
