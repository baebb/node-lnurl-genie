// NPM Dependencies
import axios from 'axios';
const https = require('https');

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
            memo: 'LNURL genie fee',
            value: amount * 1000,
            private: false,
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
                    desciption: 'The genie will answer your question...',
                    url: `${serverUrl}/answer?r=${r_hash}`
                }
            });
        } catch (err) {
            throw err;
        }
    }
};
