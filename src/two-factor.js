// Modules
const crypto = require('crypto');
const base32 = require('thirty-two');
const notp = require('notp');

// Generate the secret
// options = { 'app': 'TwoFactorExample', 'account': 'test@exordium.org' };
exports.generateSecret = (options, response, error) => { 
    if (!options) {
        return error = 'No options provided';
    }

    let bin = crypto.randomBytes(20),
        base = base32.encode(bin).toString('utf8').replace(/=/g, ''),
        secret = base.toLowerCase().replace(/(\w{4})/g, "$1 ").trim().split(' ').join('').toUpperCase(),
        uri = `otpauth://totp/${encodeURIComponent(options.app)}:${encodeURIComponent(options.account)}%3Fsecret=${secret}`

    return response({
        secret: secret,
        uri: uri,
        qr: `https://chart.googleapis.com/chart?chs=256x256&chld=L|0&cht=qr&chl=${uri}`
    });
};

// Generate the token
// options = { 'secret': 'CDLZ6LMIOOZ2WPPAE7FVP5QKHZHWWIMY' }
exports.generateToken = (options, response, error) => {
    if (!options || !options.secret) {
        return error = 'No secret provided.';
    }

    let unformatted = options.secret.replace(/\W+/g, '').toUpperCase(),
        bin = base32.decode(unformatted);

    return response({
        token: notp.totp.gen(bin)
    });
};

// Verify the token
// options = { 'secret': 'CDLZ6LMIOOZ2WPPAE7FVP5QKHZHWWIMY', 'token': '' };
exports.verifyToken = (options, response, error) => {
    if (!options || !options.secret || !options.token) {
        return error = 'No options provided, or missing secret or token keys.';
    }
    if (!options.window) {
        options.window = 4;
    }

    let unformatted = options.secret.replace(/\W+/g, '').toUpperCase(),
        bin = base32.decode(unformatted),
        token = options.token.replace(/\W+/g, '');

    return response(notp.totp.verify(token, bin, {
        window: options.window,
        time: 30
    }));
};