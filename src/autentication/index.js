'use strict'

const axios = require("axios");
const request = require('request');

class Autentication{
    async getRedirectToPage(req, res, next){
        await axios.get('https://api.spotify.com/login', function(error, data){
            if(error){
                res.send(error);
                return next();
            }
            
            if(data){
                let scopes = 'user-read-private user-read-email';
                res.redirect('https://accounts.spotify.com/authorize' + 
                '?response_type=code' +
                '&client_id=' + my_client_id + 
                (scopes ? '&scope=' + encodeURIComponent(scopes) : '') + 
                '&redirect_uri=' + encodeURIComponent(redirect_uri));
            }
        });
    }

    getAutorizationFirstAccess(req, res, next){
        const scopes = 'user-read-private%20user-read-email';
        const clientId='0f40c749aada4104953b1086fe54b443';
        const redirectId='http%3A%2F%2Flocalhost%3A3001%2F';
        const state='34fFs29kd09';

        const uri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectId}&scope=${scopes}&state=${state}`;

        const getaut = axios({
            method: 'get',
            url: uri
        })
            .then(function(response){
                if(response){
                    switch(response.status){
                        case 200:
                            console.log(response.config.url);
                            let message = {
                                message: "Please enter in this url for continue your autentication",
                                url: response.config.url
                            }
                            res.json(message);
                            return next();
                    }
                }

                return next();
            })
    }

    async getAccessToken(req, res, next){
        const body = req.body;

        if(body.code){
            const uri = "https://accounts.spotify.com/api/token";
            const redirectId='http%3A%2F%2Flocalhost%3A3001%2F';
            const clientId = '0f40c749aada4104953b1086fe54b443';
            const clientSecret = '10444ee383e04ccdae2ca233fb3b1ccd'
            const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

            const response = await axios({
                method: "post",
                url: uri,
                Headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*c"
                },
                data: {
                    grant_type: 'autorization_code',
                    code: body.code,
                    redirect_uri: redirectId,
                    client_id: clientId,
                    cliend_secret: clientSecret
                }
            })
                .then((response) => {
                    if(error){
                        res.send(error);
                        return next();
                    }
                    console.log(response);

                    return next();
                })
                .catch(function(error){
                    if(error){
                        res.send(error);
                        return next();
                    }
                })
        }
    }
}

module.exports = new Autentication();