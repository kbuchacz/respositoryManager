(function ()
{
    'use strict';

    var applicationException = require('../service/applicationException');

    function authenticate(request, response, next)
    {
        if (!request.headers.authorization) {
            next();
        } else {
            var token = request.headers.authorization;
            var tokenUTC = 'Token ' + new Buffer('55191d34e4b01960608d3f3e').toString('base64');
            if(token != tokenUTC) {
                response.status(401).send(applicationException.UNAUTHORIZED);
            } else {
                next();
            }
        }
    }

    module.exports = function (router)
    {
        router.use(authenticate);
        require('./repository.endpoint')(router);
    };
})();
