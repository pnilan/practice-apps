import React, { useState } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';

const GlossaryEntry = ({entry, i, get, remove}) => {

  const [toggle, setToggle] = useState(false);
  const [updateTermInput, setUpdateTermInput] = useState(entry.term);
  const [updateDefinitionInput, setUpdateDefinitionInput] = useState(entry.definition);

  const update = (id, term, definition) => {
    term = term.toLowerCase().trim();
    definition = definition.trim();

    if (entry.term === term && entry.defintion === definition) {
      setToggle(false);
    }

    axios.put(`/api/entries/${id}`, {
      term: updateTermInput,
      definition: updateDefinitionInput
    })
      .then(() => {
        setToggle(false);
        setTimeout(() => {
          get('/api/entries')
        }, 200);
      })
      .catch((err) => {
        console.error(err);
      })
  };

  const handleEdit = () => {
    setToggle(!toggle);
  };

  const handleClick = () => {
    update(entry._id, updateTermInput, updateDefinitionInput);
  }

  const handleChange = (e, setter) => {
    setter(e.target.value);
  }

  return (
    <div className={i % 2 === 0 ? 'row dark' : 'row light'}>
      <div className="col-auto">
        { toggle ? (
          <input type='text' className="form-control" value={updateTermInput} onChange={(e) => handleChange(e, setUpdateTermInput)}></input>
        ) : (
          <h5>{entry.term}</h5>
        )}
      </div>
      <div className="col">
        { toggle ? (
          <TextareaAutosize type='text' className="form-control" value={updateDefinitionInput} onChange={(e) => handleChange(e, setUpdateDefinitionInput)} />
        ) : (
          <p>{entry.definition}</p>
        )}
      </div>
      <div className="col-1">
        { toggle ? (
           <button type="button" className="btn btn-success" onClick={handleClick}>Save</button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={handleEdit}>Edit</button>
        )}
      </div>
      <div className="col-auto">
        <button type="button" className="btn-close" onClick={() => remove(entry._id)} />
      </div>
    </div>
  );
};

export default GlossaryEntry;