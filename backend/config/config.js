const nodemailer = require('nodemailer')
PORTNODE = 3002;
saltRounds = 10;
secretJWT = 'BKtKhiEcsRT';
secretKey = 'likengocomuapromiddle';
domain = '188.40.170.11:3002'


transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lvivneofoto@gmail.com',
        pass: '1q2w3e!Q@W#E'
    }
});