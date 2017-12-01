var models = require('../config/constants').models
let mongoose = require('mongoose')
var Comments = require('./comment')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	// Relations
	listId: { type: ObjectId, required: true } // boardId: { type: ObjectId, ref: models.board, required: true }
});

schema.pre('remove', function (next) {
	console.log('schema.pre in board')
	Comments.remove({ taskId: this._id }).exec()
	next()
});

module.exports = mongoose.model(models.task.name, schema);