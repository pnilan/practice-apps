import React from 'react';

const F1 = ({ name, setName, email, setEmail, password, setPassword, stage, setStage, post }) => {

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = () => {
    var data = {
      name: name,
      email: email,
      password: password,
      stage: stage + 1
    };
    console.log(data);
    post('/api/responses', data);
    setStage(stage + 1);
  }

  return (
    <div className="container popup">
      <div className="row">
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" className="form-control" value={name} onChange={(e) => handleChange(e, setName)} required/>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => handleChange(e, setEmail)} required/>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" value={password} onChange={(e) => handleChange(e, setPassword)} required/>
          </div>
          <div className="row">
            <div className="col button-container">
                <button type="submit" className="btn btn-primary">Create Account</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default F1;