(function ()
{
    'use strict';

    var userManager = require('../business/user.manager');
    var applicationException = require('../service/applicationException');

    function authenticate(request, response, next)
    {
        if (!request.headers.authorization) {
            next();
        } else {
            var token = request.headers.authorization.substring(6);
            token = new Buffer(token, 'base64').toString('ascii');
            userManager.getUserByToken(token).then(function (result)
            {
                request.user = result;
            }).catch(function (error)
            {
                if (applicationException.is(error, applicationException.UNAUTHORIZED)) {
                    response.sendStatus(401);
                }
            }).finally(next);
        }
    }

    module.exports = function (router)
    {
        router.use(authenticate);
    };
})();
