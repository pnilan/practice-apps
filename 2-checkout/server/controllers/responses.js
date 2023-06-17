const { getOne, create, update } = require('../models/responses');

module.exports = {

  get: (req, res) => {
    getOne(req.session_id, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).end();
      } else {
        console.log(result);
        res.json(result[0]);
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
    var properties = Object.keys(data);

    update(req.session_id, properties, data, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).end();
      } else {
        res.status(200).end();
      }

    })
  }

};