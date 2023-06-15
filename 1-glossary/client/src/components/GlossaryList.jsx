import React, { useState } from 'react';
import axios from 'axios';
import GlossaryEntry from './GlossaryEntry.jsx';


const GlossaryList = ({entries, get}) => {

  const [ page, setPage ] = useState(0);

  const entriesPerPage = 10;

  const nextPage = () => {
    setPage(page + entriesPerPage);
  };

  const prevPage = () => {
    setPage(page - entriesPerPage);
  };

  const remove = (id) => {
    axios({
      method: 'delete',
      url: `/api/entries/${id}`
    })
      .then(() => {
        get('/api/entries');
      })
  };

  return (
    <div className="mt-4">
      {(entries
        .filter((entry, i) => i >= page && i < page + entriesPerPage)
        .map((entry, i) => <GlossaryEntry key={entry._id} entry={entry} i={i} get={get} remove={remove} />))}
      <div className="row mt-4">
        <div className="col-1">
          { page > 0 ? (
            <button type="button" className="btn btn-secondary" onClick={prevPage}>Back</button>
          ) : (
            <></>
          )}
        </div>
        <div className="col page">
            <small>Page {page / entriesPerPage + 1}</small>
        </div>
        <div className="col-1">
          { entries.length <= (page + entriesPerPage) ? (
            <></>
          ) : (
            <button type="button" className="btn btn-primary" onClick={nextPage}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlossaryList;