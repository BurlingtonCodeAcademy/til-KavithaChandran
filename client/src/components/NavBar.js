//imports from react
import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
// Directs User from Home to all entries/facts page
function NavBar(props) {
    const [hidden, setHidden] = useState(true)
    return (
        <div id='NavContainer'>
            <button
                onClick={function () {
                    setHidden(!hidden)
                }}

                //toggle button is set so the nav buttons are displayed only when it is pressed
                style={hidden ? { backgroundColor: 'blue', color: 'white' } : { backgroundColor: 'liteBlue' }}
            >Toggle Nav</button>
            <div id='nav-header'>
            <Link to={"/"}><h1 ><span>Today I Learned-My Online Journal</span>
            </h1></Link></div>
            <header id='nav-bar' style={hidden ? { display: 'none' } : { display: 'flex' }}>
                {/* linked to the home button */}
                <Link id='NavContainerLink' to={"/"}>Home
            </Link>
                {/* this link will take you to a page with all journal entries*/}
                <Link id='NavContainerLink' to={"/Facts"}> Entries
            </Link>
            </header>
        </div>
    )
}

export default NavBar