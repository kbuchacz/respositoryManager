(function ()
{
    'use strict';

    var applicationException = require('../service/applicationException');

    function authenticate(request, response, next)
    {
        if (!request.headers.authorization) {
            next();
        } else {
            var token = request.headers.authorization.substring(6);
            token = new Buffer(token, 'base64').toString('ascii');
            if(token != '55191d34e4b01960608d3f3e') {
                response.sendStatus(applicationException.UNAUTHORIZED);
            }
        }
    }

    module.exports = function (router)
    {
        router.use(authenticate);
        require('./repository.endpoint')(router);
    };
})();
