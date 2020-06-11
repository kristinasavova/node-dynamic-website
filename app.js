const http = require ('http');
const router = require ('./router');

/* 
Problem. We need a simple way to look at user's badge count and JS points from a web browser. 
Solution. Use Node.js to perform the profile look ups and serve our template via HTTP.
*/

/* Create a web server */

http.createServer ( (req, res) => {
    router.home (req, res); 
    router.user (req, res);
}).listen (3000);
console.log ('Server running at http://localhost:3000/');

/* Function that handles the reading of files and merge in value */