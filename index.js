var request = require("request");
var bodyParser = require("body-parser");
var Q = require('q');

exports.getauth = function (version) {
    var deferred = Q.defer();

    if(version =='v1')
        url = 'https://auth.exacttargetapis.com/v1/requestToken';
    else 
        url = 'https://' + process.env.tennant + '.auth.marketingcloudapis.com/v2/token';

    var body = {
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET
    }

    if(version == 'v2'){
        
        body.set('grant_type', 'client_credentials');
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
        return deferred.promise;
    });       
};
