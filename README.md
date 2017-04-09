# NodeJS-Web-Server
 The program should handle all URL strings.  In cases of invalid input, the program should return the 
 appropriate error message.

    - For URLs ending in .html, the program will "serve" the file to the user's
      browser.  These files should reside in the PUBLIC directory beneath
      the directory you started your program.  The program shall return
      an error message if the file cannot be read/does not exist.

    - For URLs ending in .cgi, the program will attempt to execute the
      requested CGI program and return the output to the user's browser.
      Since we cannot accept random programs from a
      user to execute, the only valid programs will be executed from the
      directory CGIDIR located beneath the directory your project was
      started.  The program shall return an error message if a program
      fails to execute.

    - The modules I used are: http, fs, and child_process.

    - Here are the steps I performed:
    
        1) call http.createServer(myprocess)
                myprocess() is a function you will write to process requests
                from the user via their browser.
        2) create a mylisten() function that takes the following parameters:
                1) the http object returned in step one
                2) a port number which is a random port number between
                   paul.pstart() and paul.pend()
                3) paul.phost()
                4) paul.logger
        3) mylisten() will call the 4th argument passing it
                2 & 3 (the port and hostname)
                
           mylisten() will then call listen() on the 1st argument passing
                it arguments 2 & 3 also.

        4) myprocess() accepts two parameters, request and response.
           Your program needs to process request.url and fill in the
           appropriate values for response.statusCode response.setHeader,
           and finally sending content via response.end();

        5) I used fs.existsSync() to verify if a requested
           file exists.

        6) I used fs.readFileSync() to read the HTML files.

        7) I used child_process.exec(),
           which takes (3) parameters, the path of the program to
           execute, and environment object, and a callback function.
        
           the environment object looks like this:  {env: ourEnv}
           where ourEnv is declared like:         

           var ourEnv = { 'PATH': xxxxx };

           where xxxxx is the directory given above -> "./CGIDIR/" (for security purposes)
           

