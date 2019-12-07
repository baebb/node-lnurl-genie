// NPM Dependencies
import axios from 'axios';
import sha256 from 'js-sha256';
import base64 from 'base64-js';
const https = require('https');

// Local Dependencies
import { metadataString } from './lnurl-one';

// sha256(utf8ByteArray(metadata))
const metadataHash = base64.fromByteArray(sha256.digest(JSON.stringify(metadataString)));

// Create an invoice for our customer
const createInvoice = async (amount) => {
    try {
        const LNnode = axios.create({
            baseURL: 'https://satata.ddns.net:10008',
            timeout: 10000,
            headers: {
                'Grpc-Metadata-macaroon': process.env.LN_MACAROON,
                'content-type': 'application/json',
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        });

        return await LNnode.post('/v1/invoices', {
            value: amount,
            private: false,
            description_hash: metadataHash
        });
    } catch (err) {
        throw err;
    }
};

const successActionUrl = {
    tag: 'url',
    description: 'Thank you for your purchase. Here is your order details', // Up to 144 characters
    url: 'https://www.ln-service.com/order/' // url domain must be the same as `callback` domain at step 3
};

const secondResponse = {
    pr: 'our lnbc... invoice', // bech32-serialized lightning invoice
    successAction: successActionUrl // An optional action to be executed after successfully paying an invoice
};

export default async (req, res) => {
    if (req.method !== 'GET') {
        res.status(404).send('Not found');
    } else {
        try {
            // Our server's URL
            const serverUrl = `https://${req.headers.host}`;

            console.log(metadataHash);

            // We won't use this since we use a set amount
            const { amount } = req.query;

            // Create a new invoice
            const newInvoice = await createInvoice(465);

            // Payment request and hash
            const { payment_request, r_hash } = newInvoice.data;

            res.status(200).json({
                pr: payment_request,
                successAction: {
                    tag: 'url',
                    description: 'The genie will answer your question...',
                    url: `${serverUrl}/answer?r=${r_hash}`
                }
            });
        } catch (err) {
            throw err;
        }
    }
};
