'use strict';

let RSA = require('node-rsa'),
  fs = require('fs');

class FileSigner {
  constructor() {
    this._rsa = new RSA();
    if(typeof encryption === 'undefined') {
      let Encryption = require('../encryption');
      this.encryption = new Encryption();
    }
  }

  /**
   * Generates a signature for a file.
   * @param fileName
   * @param {function} done Callback
   * @returns
   */
  signFile(fileName, privateKey, done) {
    if(privateKey !== 'undefined') {
      this.encryption.loadKey(privateKey, 'pkcs1-private', (err) => {
        if(err) console.log(err);
      });
    }
      this.loadFile( fileName, (err, fileData) => {
        if(err) return done(err);
        return done(null, this.encryption.sign(fileData));
      });
  }

  /**
   * Verifies a signature by looking at the file and the public key.
   * @param fileName String The filename for the file to check with the signature.
   * @param signature String the signature that goes with the file.
   * @param {String} keyFileName
   * @param {function} done Callback
   * @returns boolean True when signature matches the file.
   */
  verifySignature(fileName, signature, keyFileName, done) {
    let that = this;
    this.encryption.loadKey(keyFileName, 'pkcs1-public', function (err) {
      if(err) console.log(err);
      that.loadFile(fileName, (err, fileData) => {
        if(err) return done(err);
        return done(null, that.encryption.verify(fileData, signature));
      });
    });
  }

  /**
   * Loads a file from the filesystem.
   * @param {String} fileName The filename of the file to load.
   * @param {function} done Callback
   */
  loadFile(fileName, done) {
    fs.readFile(__dirname + "/" + fileName, done);
  }
}

module.exports = FileSigner;