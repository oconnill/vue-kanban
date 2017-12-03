var models = require('../config/constants').models
let mongoose = require('mongoose')
var Lists = require('./list')
var Tasks = require('./task')
var Comments = require('./comment')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created: { type: Number, default: Date.now() },
  creatorId: {type: ObjectId, ref: models.user.name, required: true},
  collaborators: [{type: ObjectId, ref: models.user.name}]
});

schema.pre('remove', function (next) {
  console.log('schema.pre in board')
  Lists.remove({ boardId: this._id }).exec()
  Tasks.remove({ boardId: this._id }).exec()
  Comments.remove({ boardId: this._id }).exec()
  next()
});

module.exports = mongoose.model(models.board.name, schema);