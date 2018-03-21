const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const tagModel = mongoose.model('Tag', tagSchema);

/**
 * Get All tags
 */
module.exports.getTags = (callback, limit) => tagModel.find(callback).limit(limit);

/**
 * Add tags
 */
module.exports.addTags = () => null;
