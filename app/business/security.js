(function ()
{
    'use strict';

    var q = require('q');
    var _ = require('underscore');
    var applicationException = require('../service/applicationException');

    function isAuthenticated(context)
    {
        var defer = q.defer();
        if (!context || !context.user) {
            defer.reject(applicationException.new(applicationException.UNAUTHORIZED, 'User NOT exist'));
        } else {
            defer.resolve();
        }
        return defer.promise;
    }

    module.exports = {
        isAuthenticated: isAuthenticated
    };
})();
