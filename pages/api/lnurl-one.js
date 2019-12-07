export const metadataString = [
    [
        'text/plain', // mime-type, "text/plain" is the only supported type for now, must always be present
        'The genie asks for some sats to answer your question...' // actual metadata content
    ]
];

const firstResponse = {
    callback: 'we replace this with the server url' , // the URL from LN SERVICE which will accept the pay request parameters
    maxSendable: 465 * 1000, // max amount LN SERVICE is willing to receive in mSat
    minSendable: 465 * 1000, // min amount LN SERVICE is willing to receive in mSat, can not be less than 1 or more than `maxSendable`
    metadata: JSON.stringify(metadataString), // metadata json which must be presented as raw string here, this is required to pass signature verification at a later step
    tag: 'payRequest' // type of LNURL
};

export default async (req, res) => {
    // Our server's URL
    const serverUrl = `https://${req.headers.host}`;

    if (req.method !== 'GET') {
        res.status(404).send('Not found');
    } else {
        res.status(200).json({
            ...firstResponse,
            callback: `${serverUrl}/api/lnurl-two`, // update the callback with our server's URL
        });
    }
};
