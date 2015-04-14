(function ()
{
    'use strict';
    var childProcess = require('child_process');
    var business = require('../business/business.container');
    var spawn = childProcess.spawn;
    module.exports = function (router)
    {
        router.route('/:user/:project/git/info/refs').get(function (request, response)
        {
            //get Info refs
            var git, hex, length, packet, prefix;
            var service = request.query.service;
            response.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
            response.setHeader('Pragma', 'no-cache');
            response.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
            response.setHeader('Content-Type', 'application/x-' + service + '-advertisement');
            packet = '# service=git-receive-pack\n';
            length = packet.length + 4;
            hex = '0123456789abcdef';
            /*jshint -W016*/
            prefix = hex.charAt((length >> 12) & 0xf);
            prefix = prefix + hex.charAt((length >> 8) & 0xf);
            prefix = prefix + hex.charAt((length >> 4) & 0xf);
            prefix = prefix + hex.charAt(length & 0xf);
            response.write(prefix + packet + '0000');
            if ('git-receive-pack' === service) {
                git = spawn('git-receive-pack',
                        ['--stateless-rpc',
                         '--advertise-refs',
                         '/home/kronos/Pulpit/Praktyki/RSRepositoryManager/repositories/' +
                         request.params.user +
                         '/']);
            } else {
                git = spawn('git upload-pack',
                        ['/home/kronos/Pulpit/Praktyki/RSRepositoryManager/repositories/' + request.params.user]);
            }
            git.stdout.pipe(response);
            git.stderr.on('data', function (data)
            {
                return console.log('stderr: ' + data);
            });
            return git.on('exit', function ()
            {
                return response.end();
            });
        });
        router.route('/:user/:project/git/git-receive-pack').post(function (request, response)
        {
            //git push
            response.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
            response.setHeader('Pragma', 'no-cache');
            response.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
            response.setHeader('Content-Type', 'application/x-git-receive-pack-result');
            var git = spawn('git-receive-pack',
                    ['--stateless-rpc', '/home/kronos/Pulpit/Praktyki/RSRepositoryManager/repositories/' + request.params.user]);
            request.pipe(git.stdin);
            git.stdout.pipe(response);
            git.stderr.on('data', function (data)
            {
                return console.log('stderr: ' + data);
            });
            return git.on('exit', function ()
            {
                return response.end();
            });
        });
        router.route('/:user/:project/git/git-upload-pack').post(function (request, response)
        {
            //git clone
            response.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
            response.setHeader('Pragma', 'no-cache');
            response.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
            response.setHeader('Content-Type', 'application/x-git-upload-pack-result');
            var git = spawn('git-upload-pack', ['--stateless-rpc', '/home/kronos/Pulpit/Praktyki/RSRepositoryManager/repositories/' + request.params.user]);
            request.pipe(git.stdin);
            git.stdout.pipe(response);
            git.stderr.on('data', function (data)
            {
                return console.log('stderr: ' + data);
            });
            return git.on('exit', function ()
            {
                return response.end();
            });
        });
        router.route('/api/repository/create').post(function (request, response)
        {
            business.getRepositoryManager(request).createRepository(request.body).then(function ()
            {
                response.sendStatus(201);
            }).catch(function (error)
            {
                response.sendStatus(500);
                console.log(error);
            });

        });
    };
})();
