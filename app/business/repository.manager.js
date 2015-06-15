(function ()
{
    'use strict';
    var q = require('q');
    var applicationException = require('../service/applicationException');
    var request = require('request');
    var shell = require('shelljs');
    var basePath = '/var/git/';

    function create()
    {
        function createRepository(body)
        {
            var defer = q.defer();
            if (body.repositoryName) {
                console.log('Creating repository ' + body.repositoryName);
                shell.mkdir(basePath + body.repositoryName);
                if (null === shell.error()) {
                    shell.cd(basePath + body.repositoryName);
                    shell.exec('git init --bare --shared=group');
                    shell.exec('git config --file config http.receivepack true');
                    shell.cd('hooks');
                    shell.mv('post-update.sample', 'post-update');
                } else {
                    removeRepository(body);
                }
                if (null !== shell.error()) {
                    defer.reject(applicationException.FAIL_CREATE_REPOSITORY);
                } else {
                    defer.resolve();
                }
            } else {
                defer.reject();
            }
            return defer.promise;
        }

        function removeRepository(body)
        {
            var defer = q.defer();
            if (body.repositoryName) {
                shell.rm('-Rf', basePath + body.repositoryName + '/');
                if (null != shell.error()) {
                    defer.reject(applicationException.FAIL_REMOVE);
                }
                defer.resolve();
            } else {
                defer.reject(applicationException.FAIL_REMOVE);
            }
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
