(function ()
{
    'use strict';

    var configManager = require('./config.manager');

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
        getConfigManager: getter(configManager)

    };
})();