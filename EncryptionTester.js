'use strict';

let Encryption = require('./libs/encryption'),
  Signer = require('./libs/signer');

const encryption = new Encryption();
// encryption.generateKeyPair();
//
// encryption.savePrivateKey('./private.key', function(err) {
//  if(err) {
//    console.error(err);
//  }
//
//   encryption.savePublicKey('./public.key', function(err) {
//     if(err) {
//       console.error(err);
//     }
//   });

  let signer = new Signer();
  signer.signFile('../../helloworld.txt', 'private.key', function (err, signature) {
    if(err) console.error(err);
    console.log('signature: ' + signature.toString());

    signer.verifySignature('../../helloworld.txt', signature, 'public.key', (err, isValid) => {
      console.log('Signature verifies: ' + isValid);
    });
  });
// });

