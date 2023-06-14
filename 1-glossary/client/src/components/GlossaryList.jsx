import React from 'react';
import axios from 'axios';
import GlossaryEntry from './GlossaryEntry.jsx';


const GlossaryList = ({entries, get}) => {


  const update = (id, data) => {

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
      {entries.map((entry, i) => <GlossaryEntry key={entry._id} entry={entry} i={i} update={update} remove={remove} />)}
    </div>
  );
};

export default GlossaryList;