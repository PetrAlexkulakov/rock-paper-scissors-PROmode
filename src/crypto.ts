import * as crypto from 'crypto';

export class Crypto {
    private hmac: string | null;
    private key: string | null;

    constructor() {
        this.hmac = null;
        this.key = null;
    }

    generateRandomKey() {
        const keyLength = 32;
        const randomKey = crypto.randomBytes(keyLength).toString('hex');
        return randomKey;
    }

    calculateHMAC(data: string, key: string, algorithm: string) {
        const hmac = crypto.createHmac(algorithm, key);
        hmac.update(data);
        return hmac.digest('hex');
    }
}