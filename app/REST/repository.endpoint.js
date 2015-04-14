(function ()
{
    'use strict';
    var childProcess = require('child_process');
    var spawn = childProcess.spawn;
    module.exports = function (router)
    {
        //router.route('/').get(function (req, res)
        //{
        //    res.setHeader = {'Expires': 'Fri, 01 Jan 1980 00:00:00 GMT'};
        //    res.setHeader = {'Pragma': 'no-cache'};
        //    res.setHeader = {'Cache-Control': 'no-cache, max-age=0, must-revalidate'};
        //    res.setHeader = {'Content-Type': 'application/x-git-receive-pack-advertisement'};
        //
        //    var packet = '# service=git-receive-pack\n';
        //    var length = packet.length + 4;
        //    var hex = '0123456789abcdef';
        //    /*jshint -W016*/
        //    var prefix = hex.charAt(length >> 12) & 0xf;
        //    prefix = prefix + hex.charAt(length >> 8) & 0xf;
        //    prefix = prefix + hex.charAt(length >> 4) & 0xf;
        //    prefix = prefix + hex.charAt(length & 0xf);
        //    res.write(prefix + packet + '+0000');
        //
        //    var git = spawn('@git receive-pack %*', ['--stateless-rpc', '--advertise-refs', '/home/Kronos/GitProjects/repo/GitServer']);
        //    git.stdout.pipe(res);
        //    git.on('exit', function ()
        //    {
        //        res.end();
        //    });
        //});
        router.route('/:user/:project/git/info/refs').get(function (req, res)
        {
            //get Info refs
            var git, hex, length, packet, prefix;
            var service = req.query.service;
            res.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
            res.setHeader('Content-Type', 'application/x-git-receive-pack-advertisement');
            packet = '# service=git-receive-pack\n';
            length = packet.length + 4;
            hex = '0123456789abcdef';
            /*jshint -W016*/
            prefix = hex.charAt((length >> 12) & 0xf);
            prefix = prefix + hex.charAt((length >> 8) & 0xf);
            prefix = prefix + hex.charAt((length >> 4) & 0xf);
            prefix = prefix + hex.charAt(length & 0xf);
            res.write(prefix + packet + '0000');
            if ('git-receive-pack' === service) {
                git = spawn(service,
                        ['--stateless-rpc', '--advertise-refs', '/home/kronos/Pulpit/Praktyki/RSRepositoryManager/app/repositories/' + req.params.user]);
            } else {
                git = spawn('git upload-pack',
                        ['--timeout=10', '/home/kronos/Pulpit/Praktyki/RSRepositoryManager/app/repositories/' + req.params.user]);
            }
            git.stdout.pipe(res);
            git.stderr.on('data', function (data)
            {
                return console.log('stderr: ' + data);
            });
            return git.on('exit', function ()
            {
                return res.end();
            });
        });
        router.route('/:user/:project/git/git-receive-pack').post(function (req, res)
        {
            //git push
            res.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
            res.setHeader('Content-Type', 'application/x-git-receive-pack-result');
            var git = spawn('git-receive-pack',
                    ['--stateless-rpc', '/home/kronos/Pulpit/Praktyki/RSRepositoryManager/app/repositories/' + req.params.user]);
            req.pipe(git.stdin);
            git.stdout.pipe(res);
            git.stderr.on('data', function (data)
            {
                return console.log('stderr: ' + data);
            });
            return git.on('exit', function ()
            {
                return res.end();
            });
        });
        router.route('/:user/:project/git/git-upload-pack').post(function (req, res)
        {
            //git clone
            res.setHeader('Expires', 'Fri, 01 Jan 1980 00:00:00 GMT');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
            res.setHeader('Content-Type', 'application/x-git-upload-pack-result');
            var git = spawn('git-upload-pack', ['--stateless-rpc', '/home/kronos/Pulpit/Praktyki/RSRepositoryManager/app/repositories/' + req.params.user]);
            req.pipe(git.stdin);
            git.stdout.pipe(res);
            git.stderr.on('data', function (data)
            {
                return console.log('stderr: ' + data);
            });
            return git.on('exit', function ()
            {
                return res.end();
            });
        });
    };
})();
