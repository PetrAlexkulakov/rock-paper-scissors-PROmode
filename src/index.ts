import * as crypto from 'crypto';

function generateRandomKey() {
  const keyLength = 32;
  const randomKey = crypto.randomBytes(keyLength).toString('hex');
  return randomKey;
}
function calculateHMAC(data: string, key: string, algorithm: string) {
  const hmac = crypto.createHmac(algorithm, key);
  hmac.update(data);
  return hmac.digest('hex');
}

const randomKey = generateRandomKey();
const HMAS = calculateHMAC('placeholder', randomKey, 'sha256');
console.log('HMAC:');
console.log(HMAS.toUpperCase())

const argv = process.argv.splice(2);
console.log(argv)