import "server-only"

import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: `${process.env.NEXT_PINATA_SECRET_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

export { pinata };