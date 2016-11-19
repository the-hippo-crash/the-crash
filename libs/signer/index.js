'use strict';

let RSA = require('node-rsa'),
  Encryption = require('../encryption'),
  fs = require('fs');

class FileSigner {
  constructor() {
    this._rsa = new RSA();
    this._encryption = new Encryption();
  }

  /**
   * Generates a signature for a file.
   * @param fileName
   * @param keyFileName
   * @param {function} done Callback
   * @returns
   */
  signFile(fileName, keyFileName, done) {
    let that = this;
    this._encryption.loadKey(keyFileName, 'pkcs1-private', function (err) {
      if(err) return done(err);

      that.loadFile(fileName, (err, fileData) => {
        if(err) return done(err);
        return done(null, that._encryption.sign(fileData));
      });
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
    this._encryption.loadKey(keyFileName, 'pkcs1-public', function (err) {
      if(err) console.log(err);
      that.loadFile(fileName, (err, fileData) => {
        if(err) return done(err);
        return done(null, that._encryption.verify(fileData, signature));
      });
    });
  }

  /**
   * Loads a file from the filesystem.
   * @param {String} fileName The filename of the file to load.
   * @param {function} done Callback
   */
  loadFile(fileName, done) {
    fs.readFile( __dirname + "/" + fileName, done);
  }
}

module.exports = FileSigner;