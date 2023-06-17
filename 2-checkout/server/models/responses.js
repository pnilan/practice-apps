const db = require('../db');

const query = (string, args, cb) => {
  db.queryAsync(string, args)
    .then((res) => cb(null, res))
    .catch((err) => cb(err));
};

module.exports = {

  getOne: (sessionId, callback) => {
    // var queryString = `SELECT
    //   *
    //   FROM responses
    //   WHERE session_id = ?`;
    var queryString = `SELECT * FROM responses`;
    var queryArgs = [sessionId];
    query(queryString, queryArgs, callback);
  },

  create: (session_id, data, callback) => {
    var queryString = 'INSERT INTO responses (session_id, name, email, password) VALUES (?, ?, ?, ?)';
    var queryArgs = [session_id, data.name, data.email, data.password];
    query(queryString, queryArgs, callback);
  },

  update: (id, data, callback) => {
    var queryString = '';
    var queryArgs = [];
    query(queryString, queryArgs, callback);
  }

};
