const express = require('express');
const router = express.Router();
const cors = require('cors')
const bcrypt = require('bcrypt');
const Users = require('../models/users')
const jwt = require('jsonwebtoken');

router.use(cors())

router.get('/s/:id', cors(), async(req, res) => {
    try{
        const subscribers = await Users.findById({ '_id': req.params.id })
        res.json(subscribers)
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})

router.post('/register', cors(), async (req, res) => {
    users = await Users.findOne({ email: req.body.email })
    try {
        if (users == null) {
            const tokenEmail = jwt.sign({ email: req.body.email, password: req.body.password }, secretJWT, { expiresIn: '24h' });
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            const subscriber = new Users({
                email: req.body.email,
                password: hash,
                temporarytoken: tokenEmail
            })
            const newSubscriber = await subscriber.save()
            res.status(201).json(newSubscriber)

            const mailOptions = {
                from: 'Liketechno.com.ua',
                to: req.body.email,
                subject: 'Confirn active email address',
                text: 'Hello ' + req.body.email + ', thank you for registering at Liketechno.com.ua. Please click on the following link to complete your activation: http://188.40.170.11:3002/activate/' + tokenEmail,
                html: 'Hello<strong> ' + req.body.email + '</strong>,<br><br>Thank you for registering at Liketechno.com.ua. Please click on the link below to complete your activation:<br><br><a href="http://188.40.170.11:3002/activate/' + tokenEmail + '">http://188.40.170.11:3002/activate/</a>'
            };

            transporter.sendMail(mailOptions, (error, info) =>{
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        }
        else return res.status(400).json({ message: 'data error' })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router;