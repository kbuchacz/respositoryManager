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

        function createRepository(body)
        {
            var defer = q.defer();
            if (body.repositoryName) {
                var path = body.repositoryName;
                if (0 !==
                        shell.exec('cd /var/git; mkdir ' + path + ';').code &&
                        0 !==
                        shell.exec('cd ' +
                        path +
                        '; git init –bare –shared=group;' +
                        'git config –file config http.receivepack true; cd hooks; mv post-update.sample post-update').code) {
                    defer.reject(applicationException.FAIL_CREATE_REPOSITORY);
                }
                addUserToRepository(body).then(defer.resolve).catch(defer.reject);
            } else {
                defer.reject();
            }
            return defer.promise;
        }

        function removeRepository(body)
        {
            var defer = q.defer();
            if (body.user && body.repositoryName) {
                if (0 !== shell.exec('cd /var/git; rm -Rf ' + body.repositoryName + ';').code) {
                    defer.reject(applicationException.FAIL_REMOVE);
                }
            }
            defer.resolve();
            return defer.promise;
        }

        return {
            createRepository: createRepository, removeRepository: removeRepository
        };
    }

    module.exports = {
        create: create
    };
})();
