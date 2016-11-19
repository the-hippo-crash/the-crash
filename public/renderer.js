// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

openHome();

// encryption should be available globally.
let Encryption = require('../libs/encryption');
const encryption = new Encryption();
let Signer = require('../libs/signer');
const signer = new Signer();
window.encryption = encryption;
