const querystring = require ('querystring');
const Profile = require ('./profile.js');
const renderer = require ('./renderer');

const commonHeaders = { 'Content-Type': 'text/html' }; 

/* Handle HTTP routes GET / and POST / i.e. Home */

const home = (req, res) => {
    if (req.url === '/') {
        if (req.method.toLowerCase () === 'get') {
            res.writeHead (200, commonHeaders);
            renderer.view ('header', {}, res);
            renderer.view ('search', {}, res);
            renderer.view ('footer', {}, res);
            res.end ();
        } else {
            req.on ('data', (postBody) => {
                const query = querystring.parse (postBody.toString ());
                res.writeHead (303, { 'Location': '/' + query.username });
                res.end ();
            });
        }
    }
};

/* Handle HTTP route GET /:username i.e. /kristinasavova */

const user = (req, res) => {
    const username = req.url.replace ('/', '');
    if (username.length > 0) {
        res.writeHead (200, commonHeaders);
        renderer.view ('header', {}, res);
        const studentProfile = new Profile (username); // get JSON from Treehouse 
        studentProfile.on ('end', (profileJSON) => {
            // Store the values which we need
            const values = {
                avatarURL: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                JSPoints: profileJSON.points.JavaScript 
            }
            renderer.view ('profile', values, res);
            renderer.view ('footer', {}, res);
            res.end ();
        });
        studentProfile.on ('error', (error) => {
            renderer.view ('error', { errorMessage: error.message }, res);
            renderer.view ('search', {}, res);
            renderer.view ('footer', {}, res);
            res.end ();
        });
    }
};

module.exports.home = home;
module.exports.user = user;