//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//


// import Jargon File excerpt, command line parser
const jrgn = require ('./jargon');
const prs = require ('./parse');

//
// Setup Service on 8080
//
const crypto = require('crypto');
const sharedSecret = "VerRZqy4ARWmtuHPyaGOXLpteLm+7tDngVYaegTkBK0="; // e.g. "+ZaRRMC8+mpnfGaGsBOmkIFt98bttL5YQRq3p2tXgcE="
const bufSecret = Buffer(sharedSecret, "base64");

var http = require('http');
var PORT = process.env.port || process.env.PORT || 8080;

http.createServer(function(request, response) { 
	var payload = '';
	// Process the request
	request.on('data', function (data) {
		payload += data;
	});
	
	// Respond to the request
	request.on('end', function() {
		try {
			// Retrieve authorization HMAC information
			var auth = this.headers['authorization'];
			// Calculate HMAC on the message we've received using the shared secret			
			var msgBuf = Buffer.from(payload, 'utf8');
			var msgHash = "HMAC " + crypto.createHmac('sha256', bufSecret).update(msgBuf).digest("base64");

			response.writeHead(200);
			if (msgHash === auth) {
				var receivedMsg = JSON.parse(payload);
				console.debug(receivedMsg);
				
				// parse the lookup term from the message text
				var parsed  = prs.parse(receivedMsg.text);
				// lookup the term from jargon file
				var lookup = jrgn.lookUpJargon(parsed);
				
                var img = "<br><br><small>Result brought to you by </small><img src='https://avatars2.githubusercontent.com/u/38913576?s=200&v=4' alt='2DLogo' width='25' height='25' style='vertical-align:top;'/>";
				var responseMsg = '{ "type": "message", "text": "'+ parsed + " =&gt; **" + lookup + '**' +  img + '" }';
			} else {
				var responseMsg = '{ "type": "message", "text": "Error: message sender cannot be authenticated." }';
			}
			console.debug(responseMsg);
			response.write(responseMsg);
            response.end();
		}
		catch (err) {
			console.error(err);
			response.writeHead(400);
			return response.end("Error: " + err + "\n" + err.stack);
		}
	});
		
}).listen(PORT);


console.log('Listening on port %s', PORT);
