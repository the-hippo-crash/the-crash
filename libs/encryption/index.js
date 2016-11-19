'use strict';

let RSA = require('node-rsa'),
    fs = require('fs');

/**
 * Basic class, responsible for everything related to encryption.
 */
class Encryption {
    constructor() {
        this._rsa = new RSA();
        this._key;
    }

    /**
     * Generates a key pair and saves it in the instance
     * @TODO: should be async, is slow now.
     * @returns this
     */
    generateKeyPair() {
        this._key = this._rsa.generateKeyPair();
        return this;
    }

    /**
     * Returns the public key in base64 format
     * @returns {string}
     */
    getPublicKey() {
        return this._getKey('public');
    }

    /**
     * Returns the private key in base64 format
     * @returns {null}
     */
    getPrivateKey() {
        return this._getKey('private');
    }

    /**
     * Return the key in base64 format
     * @param {string} type 'public' or 'private'
     * @returns {string} key in base64 format
     * @private
     */
    _getKey(type) {
        if(!this._key) {
            return null;
        }

        return this._key.exportKey('pkcs1-' + type);
    }

    /**
     * Saves the public key to a file.
     * @param {string} location The location on the filesystem to store the file
     * @param done Callback function
     */
    savePublicKey(location, done) {
        this._saveKey('public', location, done);
    }

    /**
     * Saves the private key to a file.
     * @param {string} location The location on the filesystem to store the file
     * @param done Callback function
     */
    savePrivateKey(location, done) {
        this._saveKey('private', location, done);
    }

    /**
     * Saves a key to a file.
     * @param {string} type 'private' or 'public'
     * @param location The location on the filesystem to store the file
     * @param done Callback function
     * @private
     */
    _saveKey(type, location, done) {
        let content = this._getKey(type);

        if(!content) {
            return done('No key loaded');
        }

        fs.writeFile(location, content, done);
    }

    /**
    * Reads the key from a file.
    * @param {String} location The location of the key file.
    * @param {String} format The format of the key file.
    * @param {function} done Callback
    */
    loadKey(location, format, done) {
      fs.readFile(location, (err, keyData) => {
        if (err) return done(err);
        this._rsa.importKey(keyData, format);
        this._key = this._rsa.keyPair;
        done();
      });
    }

  /**
   *
   * @param fileData The file to be signed.
   * @returns String String fingerprint of the file signed with the private key.
   */
    sign(fileData) {
      if(!this._key) {
        throw new Error('No key loaded');
      }

      return this._key.sign(Buffer.from(fileData), 'base64', 'utf8');
    }

  /**
   *
   * @param fileData The file to be verified against the signature.
   * @param signature The signature to be verified against the file.
   * @returns boolean True when signatures matches file.
   */
    verify(fileData, signature) {
      // buffer — {buffer} — data for check, same as encrypt method.
      // signature — {string} — signature for check, result of sign method.
      // source_encoding — {string} — same as for encrypt method.
      // signature_encoding — {string} — encoding of given signature. May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
      return this._key.verify(Buffer.from(fileData), Buffer.from(signature), 'buffer', 'base');
    }
}

module.exports = Encryption;
