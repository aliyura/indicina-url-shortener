const customResponses = {
    custom_response: { status: statusCode.OK, message: 'custom message', data: {} },
};
/**
 * Push notification messages
 */
const notifications = {};

const builder = {
    success: (payload) => builder.prepare(statusCode.OK,'success', payload),
    server_error: (message) => builder.prepare(statusCode.INTERNAL_SERVER_ERROR, message ? message : 'internal server error'),
    not_found: (message) => builder.prepare(statusCode.NOT_FOUND, message ? message : 'not found'),
    invalid_request: (message) => builder.prepare(statusCode.BAD_REQUEST, message ? message : 'invalid request'),
    required_field: (message) => builder.prepare(statusCode.BAD_REQUEST, message ? message : 'missing required field'),
    
    custom: { ...customResponses },
    notifications,
};

Object.defineProperty(builder, 'prepare', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: (status, message, data) => ({
        status,
        message,
        data,
    }),
});

module.exports = builder;
