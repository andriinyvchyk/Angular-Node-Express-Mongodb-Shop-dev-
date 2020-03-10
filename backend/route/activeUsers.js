const express = require('express');
const router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken');

const Users = require('../models/users.js')

router.use(cors())

router.get('/:token', cors(), async (req, res) =>{
    usersToken = await Users.findOne({ temporarytoken: req.params.token });
    try {
        if (usersToken) {
            console.log('зайшло')
            jwt.verify(req.params.token, secretJWT, async (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Activation link has expired.' }); // Token is expired
                } else if (!usersToken) {
                    res.json({ success: false, message: 'Activation link has expired.' }); // Token may be valid but does not match any user in the database
                } else {
                    usersToken.temporarytoken = false; // Remove temporary token
                    usersToken.active = true; // Change account status to Activated

                    await usersToken.save()
                    // res.status(201).json(newSubscriber)
                    res.status(201).json({ success: true, message: 'Account activated!' }); // Return success message to controller
                    const mailOptions = {
                        from: 'Liketechno.com.ua',
                        to: usersToken.email,
                        subject: 'Liketechno.com.ua Activation Link',
                        text: 'Hello ' + usersToken.email + ', Your account has been successfully activated!',
                        html: 'Hello<strong> ' + usersToken.email + 'Your account has been successfully activated!'
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                }
            });
        } else return res.status(400).json({ message: 'data error' })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
});

module.exports = router;