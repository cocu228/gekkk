import {MD5} from "crypto-js";

export function generateUid() {
    // Generate a random Uint32 value as a string
    const uid = Math.floor(Math.random() * 0xffffffff).toString(16);
    // Calculate the MD5 hash of the UID using crypto-js
    const hashUid = MD5(uid).toString();

    return hashUid;
}