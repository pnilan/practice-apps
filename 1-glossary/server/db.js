const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

mongoose.connect('mongodb://127.0.0.1:27017/glossary');

const Entry = mongoose.model('Entry', {
  term: { type: String, unique: true, required: true },
  definition: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = {
  create: (data, callback) => {

    const entry = new Entry({
      term: data.term,
      definition: data.definition
    });

    entry.save()
      .then((res) => callback(null, res))
      .catch((err) => callback(err))
  },

  getAll: (callback) => {
    Entry.find({})
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  },

  update: (id, data, callback) => {
    Entry.updateOne({ _id: id }, { term: data.term, definition: data.definition })
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  },

  delete: (id, callback) => {
    Entry.findOneAndRemove({ _id: id })
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  }
};
