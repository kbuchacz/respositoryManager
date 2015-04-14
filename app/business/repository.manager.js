(function ()
{
    'use strict';
    var q = require('q');
    var path = require('path');
    var applicationException = require('../service/applicationException');
    var request = require('request');
    var shell = require('shelljs');

    function create()
    {
        function addUserToRepository(data)
        {
            var defer = q.defer();
            defer.resolve();
            return defer.promise;
        }

        function createRepository(data)
        {
            var defer = q.defer();
            if (data.repositoryName) {
                var path = 'repositories/' + data.repositoryName;
                if (0 !== shell.exec('mkdir -p ' + path + '; cd ' + path + ' ; git init --bare').code) {
                    defer.reject(applicationException.FORBIDDEN);
                }
                addUserToRepository(data).then(defer.resolve).catch(defer.reject);
            } else {
                defer.reject();
            }
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