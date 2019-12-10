// NPM Dependencies
import bech32 from 'bech32';
import axios from 'axios';
const https = require('https');

export const buildLNURL = (url) =>
    bech32.encode(
        'lnurl',
        bech32.toWords(Buffer.from(url)),
        1500
    );

export const LNnode = axios.create({
    baseURL: process.env.LN_SERVER_URL,
    timeout: 12000,
    headers: {
        'Grpc-Metadata-macaroon': process.env.LN_MACAROON,
        'content-type': 'application/json',
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});
