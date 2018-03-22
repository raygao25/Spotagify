const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tag = require('./models/tag');

const app = express();

app.use(bodyParser.json());

/**
 * Connect to tag db
 */
mongoose.connect('mongodb://localhost/tag');
const db = mongoose.connection;

db.once('open', () => {
	// Connected!
	console.log('DB tag is connected!');
});


app.get('/api', (req, res) => {
	res.json({
		root: 'Hello world!',
	});
});

app.listen(3001, () => {
	console.log('Hi there');
});


app.get('/api/tags', (req, res) => {
	tag.getTags((err, tags) => {
		if (err) throw err;
		console.log('Fetched tags from db: ', tags);
		res.json(tags);
	});
});

app.post('/api/tags', (req, res) => {
	tag.addTags(req.body.payload, (err, tags) => {
		if (err) throw err;
		console.log('Inserted tags into db: ', tags);
		res.json(tags);
	});
});

app.delete('/api/tags', (req, res) => {
	tag.deleteTags(req.body.payload, (err, tags) => {
		if (err) throw err;
		console.log('Deleted tags from db: ', tags);
		res.json(tags);
	});
});
// To remove
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/playground');
// const db = mongoose.connection;

// db.once('open', () => {
// 	// we're connected!
// 	console.log('Collection playground is opened!');
// });

// const tagSchema = mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// });

// const tagModel = mongoose.model('Tag', tagSchema);

// tagModel.create({
// 	name: 'Pop',
// }, (err, res) => {
// 	if (err) throw err;
// 	console.log('Added "Pop": ', res);
// });

// tagModel.update({ name: 'Pop' }, { name: 'Pop' }, { upsert: true }, (err, res) => {
// 	if (err) throw err;
// 	console.log('Updated "Pop": ', res);
// });

// tagModel.update({ name: 'Rap' }, { name: 'Rap' }, { upsert: true }, (err, res) => {
// 	if (err) throw err;
// 	console.log('Updated "Rap": ', res);
// });


// tagModel.remove({}, (err, res) => {
// 	if (err) throw err;
// 	console.log('Removed all: ', res);
// });
