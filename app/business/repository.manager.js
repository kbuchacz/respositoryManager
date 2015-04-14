(function ()
{
    'use strict';
    var q = require('q');
    var path = require('path');
    var applicationException = require('../service/applicationException');
    var modes = require('js-git/lib/modes');
    var request = require('request');
    var sha1 = require('sha1');
    var saveData = require('js-git/mixins/create-tree');
    //var saveRepository = require('');
    function create()
    {
        function createRepository(filesToRepo)
        {
            var defer = q.defer();
            defer.resolve(filesToRepo);
            return defer.promise;
        }

        return {
            createRepository: createRepository
        };
    }

    module.exports = {
        create: create
    };
})();