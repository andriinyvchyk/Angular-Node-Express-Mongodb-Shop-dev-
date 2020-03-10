const express = require('express');
const router = express.Router();
const cors = require('cors')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

router.use(cors())

router.post('/api/auth', cors(), async(req, res) => {
    users = await Users.findOne({ email: req.body.email })
    try{
        if(users == null) return res.status(400).json({ success: false, msg: "Not found User" })
        else{
            if(users.active){
                const match = await bcrypt.compare(req.body.pass, users.password);
                if(match){
                    const token = jwt.sign(users.toJSON(), secretKey, {
                        expiresIn: 3600
                    });
                    res.status(201).json({
                        success: true,
                        token: 'JWT' + token,
                        users: {
                            id: users._id,
                            login: users.email
                        }
                    })
                    return match
                }
                else return res.status(400).json({ success: false, msg: "Not pass User" })
            }
            else return res.status(400).json({ success: false, msg: "Not active gmail" })
        }
    }catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router;