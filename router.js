const Profile = require ('./profile.js');

/* Handle HTTP routes GET / and POST / i.e. Home */

const home = (req, res) => {
    if (req.url === '/') {
        res.writeHead (200, { 'Content-Type': 'text/plain' });
        res.write ('Header\n');
        res.write ('Search\n');
        res.end ('Footer\n');
    }
};

/* Handle HTTP route GET /:username i.e. /kristinasavova */

const user = (req, res) => {
    const username = req.url.replace ('/', '');
    if (username.length > 0) {
        res.writeHead (200, { 'Content-Type': 'text/plain' });
        res.write ('Header\n');
        const studentProfile = new Profile (username); // get JSON from Treehouse 
        studentProfile.on ('end', (profileJSON) => {
            // Store the values which we need
            const values = {
                avatarURL: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                JSPoints: profileJSON.points.JavaScript 
            }
            res.write (values.username + ' has ' + values.badges + ' badges\n');
            res.end ('Footer\n');
        });
        studentProfile.on ('error', (error) => {
            res.write (error.message + '\n');
            res.end ('Footer\n');

        });
    }
};

module.exports.home = home;
module.exports.user = user;