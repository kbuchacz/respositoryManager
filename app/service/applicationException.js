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
        is: function (error, errorCode)
        {
            return error instanceof ApplicationException && (null == errorCode || error.code === errorCode);
        },
        new: function (code, message)
        {
            return new ApplicationException(code, message);
        }
    };
})();
