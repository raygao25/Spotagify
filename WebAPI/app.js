const express = require('express');

const app = express();

app.get('/api', (req, res) => {
	res.json({
		root: 'hello'
	})
});

app.listen(3001, () => {
	console.log('Hi there');
});

