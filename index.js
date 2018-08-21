'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Realm = require('realm');

const app = express();

let PostSchema = {
	name: 'commands',
	primaryKey: 'command', //기본키
	properties: {
		command: 'string',
		explain: 'string'
	}
};

var blogRealm = new Realm({
	path: 'Commands.realm',
	schema: [PostSchema]
});

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	let posts = blogRealm.objects('commands');
	res.render('index.ejs', {posts: posts});
});

app.get('/write', (req, res) => {
	res.sendFile(__dirname + "/write.html");
});

app.post('/write', (req, res) => {
	let command = req.body['command'],
	explain = req.body['explain'];
	
	blogRealm.write(() => {
		blogRealm.create('commands', {command: command, explain: explain});
	});
	
	res.sendFile(__dirname + "/write-complete.html");
});

app.listen(3000, () => {
  console.log("WebServer Start");
});