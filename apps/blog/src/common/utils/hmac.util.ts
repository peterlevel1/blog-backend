import { BinaryToTextEncoding, createHmac } from 'node:crypto';

export const hmacUtil = {
  hash(data: string) {
    return createHmac(process.env.HMAC_ALG, process.env.HMAC_SEC)
      .update(String(data))
      .digest(process.env.HMAC_DIG as BinaryToTextEncoding);
  },
};
