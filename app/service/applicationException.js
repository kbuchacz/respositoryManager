(function ()
{
    'use strict';

    function ApplicationException(code, message)
    {
        this.code = code;
        this.message = message;
    }

    module.exports = {
        NOT_FOUND: 'NOT_FOUND',
        FORBIDDEN: 'FORBIDDEN',
        UNAUTHORIZED: 'UNAUTHORIZED',
        VALIDATION_FAILURE: 'VALIDATION_FAILURE',
        FAIL_ADD_REMOTE:'Fail add remote to repository',
        FAIL_FETCH_REPOSITORY:'Fail fetch repository',
        FAIL_CHECKOUT:'Fail checkout',
        FAIL_CREATE_FILE:'Fail create files',
        FAIL_PUSH:'Fail push on github',
        FAIL_ADD_HOOK:'Fail add hook',
        FAIL_REMOVE:'Fail remove',
        FAIL_ADD_COLLABORATORS:'FAIL_ADD_COLLABORATORS',
        FAIL_CREATE_REPOSITORY:'FAIL_CREATE_REPOSITORY',
        is: function (error, errorCode)
        {
            console.log(error, errorCode);
            return error instanceof ApplicationException && (null == errorCode || error.code === errorCode);
        },
        new: function (code, message)
        {
            return new ApplicationException(code, message);
        }
    };
})();
