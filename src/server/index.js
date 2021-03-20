const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const { join } = require('path')

app.use(express.static(join(__dirname, '../client')));

app.get('/', (req, res) => {
	res.sendFile(join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => console.log(`server running at ${PORT}`));

// a simple web server ig