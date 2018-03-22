const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const tagModel = mongoose.model('Tag', tagSchema);

/**
 * Get all tags
 */
module.exports.getTags = (callback, limit) => tagModel.find(callback).limit(limit);

/**
 * Insert tags
 */
module.exports.addTags = (payload, callback) => tagModel.insertMany(payload, callback);

/**
 * Delete tags
 */
module.exports.deleteTags = (payload, callback) => tagModel.deleteMany({ name: { $in: payload } }, callback);
