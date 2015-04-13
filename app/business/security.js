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

    function checkAuthor(element, context)
    {
        var defer = q.defer();
        if (!element || !element.author || !context || !context.user || element.author !== context.user.id.toString()) {
            throw applicationException.new(applicationException.FORBIDDEN);
        } else {
            defer.resolve();
        }
        return defer.promise;
    }

    function checkRoles(context)
    {
        var user = context && context.user;
        var defer = q.defer();
        if (!user || !user.role) {
            defer.reject();
        } else if (_.intersection(user.role, arguments).length) {
            defer.resolve();
        } else {
            defer.reject();
        }
        return defer.promise;
    }

    module.exports = {
        ADMIN: 'admin', USER: 'user', isAuthenticated: isAuthenticated, checkAuthor: checkAuthor, checkRoles: checkRoles
    };
})();
