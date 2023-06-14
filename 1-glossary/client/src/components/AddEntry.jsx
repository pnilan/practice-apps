import React, { useState } from 'react';

const AddEntry = ({post}) => {

  const [termInput, setTermInput] = useState('');
  const [definitionInput, setDefinitionInput] = useState('');

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/api/entries', termInput, definitionInput);
    setTermInput('');
    setDefinitionInput('');
  };

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="termInput">Term:</label>
            <input type="text" className="form-control" value={termInput} name="termInput" onChange={(e) => handleChange(e, setTermInput)} />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="definitionInput">Definition:</label>
            <textarea className="form-control" value={definitionInput} rows={3} name="definitionInput" onChange={(e) => handleChange(e, setDefinitionInput)} />
          </div>
          <button type="submit" className="btn btn-primary">Add Term</button>
        </form>
      </div>
    </div>
  );
};

export default AddEntry;