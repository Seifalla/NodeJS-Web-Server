// CS316 Project 2
// Seifalla Moustafa

// import the required header files.

var http = require("http"),
	url = require('url');

var paul = require('/homes/paul/HTML/CS316/p2_req.js');
	
const child_process = require('child_process');

const fs = require('fs');

// This method receives the url request 
// checks for its validity and 
// return the appropriate 
// output/error message.

function myprocess(request, response) {

// this variable stores the url 
	var xurl = request.url;

// these two variables store the
// two possible regular expressions
// (for html and cgi files)
	var regex1 = /[a-zA-Z0-9_].html/;
	var regex2 = /[a-zA-Z0-9_].cgi/;
	var validFormat = 0;
	var html = 0;

// check if the user input is correctly
// formated

	if(regex1.test('/'+xurl)){
		validFormat ++;
		html = 1;
	}
	else if(regex2.test('/'+xurl))
		validFormat ++;
	else{}

// if the user typed in a valid string,
// process the url request, otherwise 
// display an error message.

	if(validFormat > 0)

//check if the requested file exists

		if(fs.existsSync('./CGIDIR/'+xurl) || fs.existsSync('./PUBLIC/'+xurl)){
			response.statusCode = 200;

// if the requested file is html, read it 
// and send it to the user,
// if it is cgi, execute the file
// and send the output to the user.

			if(html === 1){

				serveHTML(xurl, response);
			}
			else
				executeCGI(xurl, response);
		}else{
			response.statusCode = 404;
			response.setHeader('Content-Type', 'text/plain');
			response.end('File not found\n');
		}
	else{
		response.statusCode = 404;
                response.setHeader('Content-Type', 'text/plain');
                response.end('Invalid File format\n');
	}	
}

// this method executes a cgi file and returns 
// the output to the client.

function executeCGI(xurl, response){

// remove the slash in the beginning of the url

	xurl = xurl.slice(1);

// execute the cgi file.

	child_process.exec(xurl,{env: {'PATH': "./CGIDIR/"}}, function(error, stdout, stderr){
		if (error) {
    			console.error(error);
  		}
  		console.log(stderr);
		response.setHeader('Content-Type', 'text/html');
		response.end(stdout+stderr);
	});
}

// read the html file and send it to the client.

function serveHTML(xurl, response){

	response.setHeader('Content-Type', 'text/html');
        var data = fs.readFileSync('./PUBLIC/'+xurl);

	if(data)
        	response.end(data.toString());
	else
		response.end("Error: Cannot Read file!");
}

// generate a port number between paul.pstart and paul.pend

const port = Math.floor(Math.random() * paul.pstart()) + paul.pend(); 

const hostname = paul.phost();

// start the server

var server = http.createServer(myprocess);

mylisten(server,port,hostname,paul.logger);

// listen to http requests

function mylisten(server,port,hostname,logger){

	logger(port,hostname);
	server.listen(port,hostname);
}
