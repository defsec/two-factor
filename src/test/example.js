const twofactor = require('../two-factor');

// Generate a new secret
console.log(`Generating new secret`);
const secret = twofactor.generateSecret({
    app: 'TwoFactorExample',
    account: 'test@exordium.org'
}, (response, error) => {
    // Did we error? Handle it.
    if (error) console.error(error);
    console.info(response);

    // Return the response
    return response;
});

// Generating a new token w/secret
console.log(`\nGenerating new token (secret = ${secret.secret})`);
const token = twofactor.generateToken({
    secret: secret.secret
}, (response, error) => {
    // Did we error? Handle it.
    if (error) console.error(error);
    console.info(response);

    // Return the response
    return response;
});

// Verifying a valid token
console.log(`\nVerifying a valid token`);
twofactor.verifyToken({
    secret: secret.secret,
    token: token.token
}, (response, error) => {
    // Did we error? Handle it.
    if (error) console.error(error);
    console.info(response);
});

// Verifying a valid token (window 1)
console.log(`\nVerifying a valid token (window: 1)`);
twofactor.verifyToken({
    secret: secret.secret,
    token: token.token,
    window: 1
}, (response, error) => {
    // Did we error? Handle it.
    if (error) console.error(error);
    console.info(response);
});

// Verifying a valid token (window -3)
console.log(`\nVerifying a valid token (window: -3)`);
twofactor.verifyToken({
    secret: secret.secret,
    token: token.token,
    window: -3
}, (response, error) => {
    // Did we error? Handle it.
    if (error) console.error(error);
    console.info(response);
});

// Verifying an invalid token
console.log(`\nVerifying an invalid token`);
twofactor.verifyToken({
    secret: secret.secret,
    token: '12345',
}, (response, error) => {
    // Did we error? Handle it.
    if (error) console.error(error);
    console.info(response);
});

// Finished test
console.log(`\nExample test complete!`);
console.log(`https://github.com/defsec/two-factor\n`);