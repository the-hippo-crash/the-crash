(function () {
    $(document).ready(function () {
        var nodemailer = require('nodemailer');


        $mailForm = $('#mail-form');
        $asAttachment = $('#as-attachment');
        $sendMail = $('#send-mail');
        $clearMailForm = $('#clear-send-mail-form');
        $mailTextField = $('#email-text');
        prefilMailText();

        function prefilMailText() {
            $mailText = "hoi ik ben een mailtje";
            // Prefil the email text
            $mailTextField.text($mailText);
        }

        $mailForm.on('submit', function (e) {
            "use strict";
            e.preventDefault();
            var smtpTransport = require('nodemailer-smtp-transport');
            var transporter = nodemailer.createTransport(smtpTransport({
                host: "localhost", // hostname
                secure: false, // use SSL
                port: 25,
                tls: {
                    rejectUnauthorized: false
                }
            }));
            transporter.sendMail({
                from: 'yourmail@gmail.com',
                to: 'yourmail@gmail.com',
                subject: "test123",
                text: "hi world"
            }, function (error, response) {
                if (error) {
                    console.log('Failed', error);
                } else {
                    console.log('Message sent', response);
                }
            });
        });

        $sendMail.on('click', function () {
            $mailForm.submit();
        });

        $clearMailForm.on('click', function () {
            $mailForm.clear();
        });
    });
})();