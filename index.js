var request = require("request");
var bodyParser = require("body-parser");
var Q = require('q');

exports.getauth = function (version, callback) {
    var deferred = Q.defer();
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
        url = 'https://' + process.env.tennant + '.auth.marketingcloudapis.com/v2/token';
        body = {
            clientId: process.env.CLIENTID,
            clientSecret: process.env.CLIENTSECRET,
            grant_type: 'client_credentials'
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
            deferred.resolve(response.body.accessToken);                            
        }         
        else {
            deferred.reject("Status Code: " + response.statusCode + "  Response Message: " + response.statusMessage);
        }
        deferred.promise.nodeify(callback);
        callback(deferred.promise);
    });       
};
