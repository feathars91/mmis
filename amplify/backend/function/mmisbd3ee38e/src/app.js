/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bb = require( 'express-busboy' )
// declare a new express app
var app = express()
bb.extend(app)
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/items', async function(req, res) {
  // Add your code here

var db = require('./db')

var editorServer = require('datatables.net-editor-server')
var Editor = editorServer.Editor
var Field = editorServer.Field
 const query = req.query;

var fname = "";
var lname = "";
var city = "";
var state = "";
var zip = "";
var desc = "";

fname = query.fname;
if( fname == null){fname = ""};
lname = query.lname;
if( lname == null){lname = ""};
city = query.city;
if( city == null){city = ""};
state= query.state;
if( state == null){state = ""};
zip = query.zip;
if( zip == null){zip = ""};
desc = query.desc;
if( desc == null){desc = ""};
	var editor = new Editor(db, 'texas.v_10', 'npi').fields(
		new Field('npi'),
  		new Field('fname'),
  		new Field('last_name'),
		  new Field('classification'),			  
  		new Field('fcity'),
  		new Field('sline'),
  		new Field('fline'),
  		new Field('fstate'),
  		new Field('fzip'),
  		new Field('fphone'),
  		new Field('provider secondary practice location address- address line 1'),
  		new Field('provider secondary practice location address-  address line 2'),
  		new Field('provider secondary practice location address - city name'),
  		new Field('provider secondary practice location address - state name'),
  		new Field('provider secondary practice location address - postal code'),
  		new Field('provider secondary practice location address - telephone number')
	);

	if (fname != ""){editor.where( {'fname': fname})}
	if (lname != ""){editor.where( {'last_name': lname})}
	if (city != ""){editor.where( {'fcity': city})}
	if (state != ""){editor.where( {'fstate': state})}
	if (zip != ""){editor.where( {'fzip': zip})}
	if (desc	 != ""){ editor.where( {'classification': desc})	}

	await editor.process(req.body)
	res.json(editor.data())



  //res.json({success: 'get call succeed!', url: req.url});
});



// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
