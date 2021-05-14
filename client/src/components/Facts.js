//imports from react
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function Facts(props) {
  // holds the entries once fetched from the database
  const [entryPost, setEntryPost] = useState([]);
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");

  //fetches the entries from database
  useEffect(() => {
    //this is to check if the entries is already populated or not
    if (entryPost.length === 0) {
      fetch("/api")
        .then((res) => res.json())
        //result is first stored in this middleware before passing to the entrypost
        .then((entryData) => {
          setEntryPost(entryData);
        });
    }
  });
  function handleChange(evt) {
    let target = evt.target;
    setSelected(target.value);
  }

  // fetch based on the filter form
  function filter(evt) {
    evt.preventDefault();
    // url is made to fetch with the query params
    let url = `/filter?${selected}=${evt.target[0].value}`;
    console.log(url);
    //fetching by using the URL
    fetch(url)
      .then((res) => res.json())
      .then((entryData) => {
        setEntryPost(entryData);
      });
  }

  function searchChange(evt) {
    let target = evt.target;
    setSearch(target.value);
  }

  function searchQuery(evt) {
    evt.preventDefault();
    let query = `/search?${search}=${evt.target[0].value}`;
    console.log(`query`, query);
    fetch(query)
      .then((res) => res.json())
      .then((appointmentList) => {
        setEntryPost(appointmentList);
      });

    //console.log(search);
  }

  return (
    <div>
      <div id='search-filter'>
      <form value={search} onChange={searchChange} onSubmit={searchQuery}>
        <input id='pick-a-filter' type="text" name="search" placeholder="Search:" />
        <button id="remove-all-filters" type="submit" value="Search">
          Search
        </button>
      </form>
     
      <div id="searchContainer">
      <div id ='Filter'>
        <div id='pick-a-filter'>Filter by:{selected}</div>
        {/* to filter the entries according to their values */}
        <select id= "filter-options" name="selection" value={selected} onChange={handleChange}>
          <option value="">Pick a Category:</option>
          <option value="title">Title</option>
          <option value="content">Content</option>
          <option value="tags">Tag</option>
          <option value="date">Date</option>
        </select>

        <div className="filter">
          {selected && (
            <form id="filterContainer" onSubmit={filter}>
              <label>
                <input id='user-input' type="text" name="filter" placeholder="Filter:" />
              </label>
              <input id='filter-button' type="submit" value="Filter" />
            </form>
            /* if results are filtered button shows offering option to remove filters */
          )}
        </div>
        <Link to={"/facts"}>
          <button onClick="window.location.reload()" id="remove-all-filters">
            Remove All Filters
          </button>
        </Link>
 </div>
 </div>
        {entryPost.map((entry, index) => {
          return (
            <div id="FactsContainer">
            <h3>Journal Entry:</h3>
              <hr />
              <h3 classname='title' key={index + "-title"}>{entry.title}</h3>
              <p classname='title'key={index + "-content"}>{entry.content}</p>
              <h4 classname='title'key={index + "-date"}>{moment(entry.date).format("llll")}</h4>
              <h4 classname='title' key={index + "-tags"}>{entry.tags + " "}</h4>

              <Link id="editButtonLink" to={"/EditDelete/" + entry._id}>
                <button id={entry._id + "-editEntry"}>
                  Edit/Delete Entry Data
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Facts;