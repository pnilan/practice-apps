import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEntry from './AddEntry.jsx';
import Search from './Search.jsx';
import GlossaryList from './GlossaryList.jsx';

const App = () => {

  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    get('/api/entries');
  }, []);

  const get = (url) => {
    axios.get(url)
      .then((res) => {
        setEntries(res.data);
        setFilteredEntries(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
    };

  const post = (url, term, definition) => {
    term = term.trim();
    definition = definition.trim();

    axios.post(url, {
      term: term,
      definition: definition
    })
    .then(() => {
      get(url);
    })
    .catch((err) => {
      console.error(err);
    })
  };

  const search = (search) => {
    var tempList = entries.filter((entry) => {
      return entry.term.includes(search);
    });

    setFilteredEntries(tempList);
  }

  return (
    <>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h2>Glossary App</h2>
            </div>
            <div className="col-4"></div>
            <div className="col-4">
              <Search search={search} />
            </div>
          </div>
        </div>
      </header>
      <section className="container">
        <AddEntry post={post} />
        <GlossaryList entries={filteredEntries} get={get} />
      </section>
    </>
  )
};

export default App;