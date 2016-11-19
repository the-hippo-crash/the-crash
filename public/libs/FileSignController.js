(function () {
  let Signer = require('./libs/signer'),
    Encryption = require('./libs/encryption');

  $(document).ready(function () {
    var signer = new Signer();
    var encryption = new Encryption();

    $('#load-key').onclick = function () {
      var loadedKey = encryption.loadKey();
    };

    $('#generate-keys').onclick = function () {
      var keyPair = encryption.generateKeyPair();
    };
  });
})();