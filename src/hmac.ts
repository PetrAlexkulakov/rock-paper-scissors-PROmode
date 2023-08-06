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
        this.key = crypto.randomBytes(keyLength).toString('hex');
        return this.key;
    }

    calculateHMAC(data: string, key: string, algorithm: string) {
        const hmac = crypto.createHmac(algorithm, key);
        hmac.update(data);
        this.hmac = hmac.digest('hex')
        return this.hmac;
    }
}