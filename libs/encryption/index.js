'use strict';

let RSA = require('node-rsa');

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
}

module.exports = Encryption;
