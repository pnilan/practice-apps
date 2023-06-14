import React from 'react';

const GlossaryEntry = ({entry, i, update, remove}) => {
  return (
    <div className={i % 2 === 0 ? 'row light' : 'row dark'}>
      <div className="col-2">
        <h5>{entry.term}</h5>
      </div>
      <div className="col">
        <span>{entry.definition}</span>
      </div>
      <div className="col-auto">
        <button type="button">Edit</button>
        <button type="button" className="btn-close" onClick={() => remove(entry._id)} />
      </div>
    </div>
  );
};

export default GlossaryEntry;