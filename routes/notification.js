var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');
var express = require('express');
var router = express.Router();
var smtpTransport = nodemailer.createTransport(smtp({
    host: '127.0.0.1',
    port: '2525',
    auth :{
        user : '',
        pass : ''
    }
}));

var mailOptions = {
    from : 're@gmail.com',
    to : 'rec@gmail.com',
    cc : 'cc@gmail.com',
    text : 'Welcome to Nodemailer',
    subject :'Test API'

};

router.get('/sendEmail', function(req,res){

    smtpTransport.sendMail(mailOptions, function(err, res){
        if(err){
            console.log('Email sending failed',err);
        }
        else{
            console.log('Yes I got it');
        }
    });

});

module.exports = router;