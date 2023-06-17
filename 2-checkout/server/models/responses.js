const db = require('../db');

const query = (string, args, cb) => {
  db.queryAsync(string, args)
    .then((res) => cb(null, res))
    .catch((err) => cb(err));
};

module.exports = {

  getOne: (sessionId, callback) => {
    var queryString = `SELECT * FROM responses WHERE session_id = ?`;
    var queryArgs = [sessionId];
    query(queryString, queryArgs, callback);
  },

  create: (session_id, data, callback) => {
    var queryString = 'INSERT INTO responses (session_id, name, email, password) VALUES (?, ?, ?, ?)';
    var queryArgs = [session_id, data.name, data.email, data.password];
    query(queryString, queryArgs, callback);
  },

  updateShipping: (session_id, data, callback) => {
    var queryString = `UPDATE responses
    SET shipping_address_1 = ?,
    shipping_address_2 = ?,
    shipping_city = ?,
    shipping_state = ?,
    shipping_zip = ?,
    stage = ?
    WHERE session_id = ?
    `;
    var queryArgs = [data.shipping_address_1, data.shipping_address_2, data.shipping_city, data.shipping_state, data.shipping_zip, data.stage, session_id];
    query(queryString, queryArgs, callback);
  },

  updateBilling: (session_id, data, callback) => {
    var queryString = `UPDATE responses
    SET billing_cc = ?,
    billing_exp_month = ?,
    billing_exp_year = ?,
    billing_cvv = ?,
    billing_zip = ?,
    stage = ?
    WHERE session_id = ?`;
    var queryArgs = [data.billing_cc, data.billing_exp_month, data.billing_exp_year, data.billing_cvv, data.billing_zip, data.stage, session_id];
    query(queryString, queryArgs, callback);
  },

  updatePurchase: (session_id, data, callback) => {
    var queryString = `UPDATE responses
    SET stage = ?,
    order_completed = ?
    WHERE session_id = ?`;
    var queryArgs = [data.stage, data.order_completed, session_id];
    query(queryString, queryArgs, callback);
  }

};
