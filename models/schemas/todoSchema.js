const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// querying data thorugh instance methods process
todoSchema.methods = {
  findActive: function () {
    return mongoose.model('Todo').find({ status: 'active' });
  },
  findActiveCallback: function (cb) {
    return mongoose.model('Todo').find({ status: 'active' }, cb);
  },
};

// static methods
todoSchema.statics = {
  findByTitle: function () {
    return this.find({ title: /os/i });
  },
};

// query helpers
todoSchema.query = {
  byTitle: function (title) {
    return this.find({ title: new RegExp(title, 'i') }); // new RegExp()
  },
};

module.exports = todoSchema;
