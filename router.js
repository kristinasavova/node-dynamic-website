
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
        res.write (username + '\n');
        res.end ('Footer\n');
    }
};

module.exports.home = home;
module.exports.user = user;