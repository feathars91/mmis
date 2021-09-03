/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



//var controllers = require( './staff.js' )
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bb = require( 'express-busboy' )
// declare a new express app
var app = express()
bb.extend(app)

app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
//app.use( controllers )

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


app.get('/items', async function(req, res) {


var db = require('./dbmysql')

var editorServer = require('datatables.net-editor-server')

var Editor = editorServer.Editor
var Field = editorServer.Field

	var editor = new Editor(db, 'datatables_demo').fields(
		new Field('first_name'),
		new Field('last_name'),
		new Field('position'),
		new Field('office'),
		new Field('extn'),
		new Field('age'),
		new Field('salary'),
		new Field('start_date')
	)
	await editor.process(req.body)
	res.json(editor.data())

//  res.json({success: 'post call succeed!', url: req.url, body: req.body})

});


app.post('/items', async function(req, res) {

var editor = require('./staff.js')

	await editor.process(req.body)
	res.json(editor.data())

});


module.exports = app
