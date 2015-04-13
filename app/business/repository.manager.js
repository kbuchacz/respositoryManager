(function ()
{
    'use strict';
    var q = require('q');
    var path = require('path');
    var applicationException = require('../service/applicationException');
    var gift = require('gift');

    function create()
    {
        function createRepository(body)
        {
            var defer = q.defer();
            defer.resolve(body);
            return defer.promise;
        }

        return {
            createRepository: createRepository
        }
    }

    module.exports = {
        create: create
    }
})();