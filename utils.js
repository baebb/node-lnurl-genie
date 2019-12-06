exports.buildLNURL = (orderId) =>
    bech32.encode(
        'lnurl',
        bech32.toWords(Buffer.from(
            `${process.env.SERVICE_URL}/lnurl/${orderId}`
        )),
        1500
    );
