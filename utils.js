// NPM Dependencies
import bech32 from 'bech32';

export const buildLNURL = (url) =>
    bech32.encode(
        'lnurl',
        bech32.toWords(Buffer.from(url)),
        1500
    );
