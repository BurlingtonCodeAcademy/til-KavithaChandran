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
      

      <form value={search} onChange={searchChange} onSubmit={searchQuery}>
        <input type="text" name="search" placeholder="Search:" />
        <button type="submit" value="Search">
          Search
        </button>
      </form>
      <h2>Journal Entries</h2>
      <div id="searchContainer">
        <div>Filter by:{selected}</div>
        {/* to filter the entries according to their values */}
        <select name="selection" value={selected} onChange={handleChange}>
          <option value="">Categories</option>
          <option value="title">Title</option>
          <option value="content">Content</option>
          <option value="tags">Tag</option>
          <option value="date">Date</option>
        </select>

        <div className="filter">
          {selected && (
            <form id="filterContainer" onSubmit={filter}>
              <label>
                <input type="text" name="filter" placeholder="Filter:" />
              </label>
              <input type="submit" value="Filter" />
            </form>
            /* if results are filtered button shows offering option to remove filters */
          )}
        </div>
        <Link to={"/facts"}>
          <button onClick="window.location.reload()" id="remove-all-filters">
            Remove All Filters
          </button>
        </Link>

        {entryPost.map((entry, index) => {
          return (
            <div id="FactsContainer">
              <hr />
              <h2 key={index + "-title"}>{entry.title}</h2>
              <p key={index + "-content"}>{entry.content}</p>
              <h4 key={index + "-date"}>{moment(entry.date).format("llll")}</h4>
              <h4 key={index + "-tags"}>{entry.tags + " "}</h4>

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
