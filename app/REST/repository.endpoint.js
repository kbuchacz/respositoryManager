(function ()
{
    'use strict';
    var business = require('../business/business.container');
    var applicationException = require('../service/applicationException');

    module.exports = function (router)
    {
        router.route('/api/repository').post(function (request, response)
        {
            business.getRepositoryManager(request).createRepository(request.body).then(function (result)
            {
                response.status(200).send(result);
            });
        })
    }
})();