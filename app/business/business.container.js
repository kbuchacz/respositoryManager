(function ()
{
    'use strict';

    var repositoryManager = require('./repository.manager');

    function getContext(request)
    {
        return {user: request.user};
    }

    function getter(manager)
    {
        return function (request)
        {
            return manager.create(getContext(request));
        };
    }


    module.exports = {
        getRepositoryManager: getter(repositoryManager)

    };
})();