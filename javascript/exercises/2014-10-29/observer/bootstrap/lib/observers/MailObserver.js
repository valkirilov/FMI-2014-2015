/* global require, module */

var Observer = require('./Observer'),
    // more information about the API at
    // http://www.nodemailer.com/docs/usage-example
    mail = require('nodemailer');

function MailObserver(config) {
  'use strict';
  this.config = config;
}

MailObserver.prototype = Object.create(Observer.prototype);

MailObserver.prototype.update = function (title, data) {
  	'use strict';
	var transporter = mail.createTransport();

	// // setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Valentin Kirilov ✔ <dev.val.kirilov@gmail.com>', // sender address
	    to: 'val.kirilov@gmail.com', // list of receivers
	    subject: title, // Subject line
	    text: data, // plaintext body
	    html: data // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});

};

module.exports = MailObserver;

