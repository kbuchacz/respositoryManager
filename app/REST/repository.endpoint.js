(function ()
{
    'use strict';
    var childProcess = require('child_process');
    var business = require('../business/business.container');
    var spawn = childProcess.spawn;
    var applicationException = require('../service/applicationException');
    module.exports = function (router)
    {
        router.route('/api/repository').post(function (request, response)
        {
            business.getRepositoryManager(request).createRepository(request.body).then(function ()
            {
                response.status(201).json({repositoryUrl: process.argv[2] + request.body.repositoryName});
            }).catch(function (error)
            {
                if (applicationException.is(error, applicationException.FAIL_CREATE_REPOSITORY)) {
                    response.sendStatus(403);
                } else {
                    response.sendStatus(500);
                    console.log(error);
                }

            });
        }).delete(function (request, response)
        {
            business.getRepositoryManager(request).removeRepository(request.body).then(function ()
            {
                response.sendStatus(200);
            }).catch(function (error)
            {
                if (applicationException.is(error, applicationException.FAIL_REMOVE)) {
                    response.sendStatus(410);
                } else {
                    console.log(error);
                    response.sendStatus(500);
                }
            });
        });
    };
})();
