import React, { useState } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';

const GlossaryEntry = ({entry, i, get, remove}) => {

  const [toggle, setToggle] = useState(false);
  const [updateTermInput, setUpdateTermInput] = useState(entry.term);
  const [updateDefinitionInput, setUpdateDefinitionInput] = useState(entry.definition);

  var term = entry.term[0].toUpperCase() + entry.term.slice(1);

  const update = (id, term, definition) => {
    term = term.toLowerCase().trim();
    definition = definition.trim();

    if (entry.term === term && entry.definition === definition) {
      setToggle(false);
    } else {
      axios.put(`/api/entries/${id}`, {
        term: term,
        definition: definition
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
    }

  };

  const handleEdit = () => {
    setToggle(!toggle);
  };

  const handleCancel = () => {
    setToggle(!toggle);
    setUpdateTermInput(term);
    setUpdateDefinitionInput(entry.definition);
  };

  const handleClick = () => {
    update(entry._id, updateTermInput, updateDefinitionInput);
  }

  const handleChange = (e, setter) => {
    setter(e.target.value);
  }

  return (
    <div className={i % 2 === 0 ? 'row dark' : 'row light'}>
      <div className="col-2">
        { toggle ? (
          <input type='text' className="form-control" value={updateTermInput} onChange={(e) => handleChange(e, setUpdateTermInput)}></input>
        ) : (
          <h5>{term}</h5>
        )}
      </div>
      <div className="col definition-container">
        { toggle ? (
          <TextareaAutosize type='text' className="form-control" value={updateDefinitionInput} onChange={(e) => handleChange(e, setUpdateDefinitionInput)} autoFocus={true}/>
        ) : (
            <ReactMarkdown>{entry.definition}</ReactMarkdown>
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
        { toggle ? (
          <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
        ) : (
          <button type="button" className="btn-close" onClick={() => remove(entry._id)} />
        )}
      </div>
    </div>
  );
};

export default GlossaryEntry;