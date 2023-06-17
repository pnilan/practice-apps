const { getOne, create, updateShipping, updateBilling, updatePurchase } = require('../models/responses');

module.exports = {

  get: (req, res) => {
    getOne(req.session_id, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).end();
      } else {
        console.log(result[0]);
        res.send(result[0]);
      }
    });

  },

  post: (req, res) => {
    var data = req.body;

    create(req.session_id, data, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).end();
      } else {
        res.status(201).end();
      }
    })

  },

  put: (req, res) => {

    var data = req.body;
    var session_id = req.session_id;

    if (data.stage === 3) {
      updateShipping(session_id, data, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).end();
        } else {
          res.status(200).end();
        }
      })
    } else if (data.stage === 4) {
      updateBilling(session_id, data, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).end();
        } else {
          res.status(200).end();
        }
      })
    } else {
      updatePurchase(session_id, data, (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).end();
        } else {
          res.status(200).end();
        }
      })
    }
  }
};