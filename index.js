var request = require("request");
var bodyParser = require("body-parser");

module.exports.getauth = function (version, callback) {

    var url = '';
    var body = '';

    if(version =='v1'){
        url = 'https://auth.exacttargetapis.com/v1/requestToken';
        body = {
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET
        };
    }
    else{
        url = 'https://' + process.env.TENNANT + '.auth.marketingcloudapis.com/v2/token';
        body = {
            "client_id": process.env.CLIENTID,
            "client_secret": process.env.CLIENTSECRET,
            "grant_type": 'client_credentials'
        }
    } 
        
    var options = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body,
        json: true
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(response.body); 
        }         
        else {
            console.log(error);
        }                
    });       
};