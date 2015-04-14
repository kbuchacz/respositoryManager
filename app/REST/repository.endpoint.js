(function ()
{
    'use strict';
    var business = require('../business/business.container');
    var applicationException = require('../service/applicationException');
    var multiparty = require('multiparty');
    var util = require('util');
    module.exports = function (router)
    {
        router.route('/').post(function (request, response)
        {
            var form = new multiparty.Form();

            form.parse(request, function(err, fields, files) {
                business.getRepositoryManager(request).createRepository(files).then(function (result)
                {
                    response.status(201).send(result);
                });
            });

        });
    };
})();