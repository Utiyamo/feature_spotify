'use strict'

const autentication = require('./autentication');

module.exports = function(app){
    
    const Autorization = require('./autentication');

    app.route('/')
        .get(function(req, res, next){
            let message = {
                message: `Hello! You're on Features_Spotify. Welcome`
            };

            const query = req.query;
            const code = query.code;
            const state = query.state;

            console.log(JSON.stringify(query));

            if(code){
                message = {
                    welcome: "Hello Friend! You're log in my feature.",
                    code: `Your code: ${code}`,
                    state: `Your state: ${state}`
                };
            }

            res.send(message);
            return next();
    });

    app.route('/autorization')
        .get(Autorization.getAutorizationFirstAccess)
        .post(Autorization.getAccessToken);

}