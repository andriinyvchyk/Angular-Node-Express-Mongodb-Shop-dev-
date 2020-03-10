const express = require('express');
const router = express.Router();
const cors = require('cors')
const sharp = require('sharp');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const Goods = require('../models/goods')
const Category = require('../models/category')

router.use(cors())
router.use(fileUpload({ parseNested: true }));

router.post('/add', cors(), async (req, res) => {
    console.log(req.body)
    // const obj = JSON.parse(req.body.preferences);
    console.log(req.body.preferences)
    // var example = req.body.preferences.split(',');
    // testObj = {}
    // req.body.preferences.map((val, index) =>{
    //     split = val.split(',');
    //     testObj[split[0]] = split[1]
    // })
    // console.log(testObj)
    const subscriber = new Goods({
        nameProd: req.body.nameProd,
        recomend: req.body.recomend,
        categoryes: req.body.categoryes,
        nameBrend: req.body.nameBrend,
        price: req.body.price,
        quantity: req.body.quantity,
        shortDescriptionProd: req.body.shortDescriptionProd,
        fullDescriptionProd: req.body.fullDescriptionProd,
        images: [],
        preferences: {}
    })
    goods = await Goods.findOne({ title: req.body.nameProd })
    // try {
    //     if (goods == null) {
    //         uploadImage = [];
    //         if (req.files.images.length === undefined) {
    //             uploadImage.push(req.files.images)
    //         }
    //         else if (req.files.images.length > 0) {
    //             for (let i = 0; i < req.files.images.length; i++) {
    //                 uploadImage.push(req.files.images[i])
    //             }
    //         }
    //         if (uploadImage.length > 0) {
    //             const renderMkr = Math.random().toString(36).substring(2);
    //             fs.mkdir(`./uploads/goods/${renderMkr}`, function (err) {
    //                 if (err) return res.status(500).json({ message: err.message })
    //                 else {
    //                     uploadImage.map(async file => {
    //                         const filename = file.name.replace(/\..+$/, "");
    //                         const newFilename = `${filename}-${Date.now()}.jpeg`;
    //                         await sharp(file.data)
    //                             .resize(700, 1000, { fit: sharp.fit.outside })
    //                             .toFormat("jpeg")
    //                             .jpeg({ quality: 60 })
    //                             .toFile(`uploads/goods/${renderMkr}/${newFilename}`);
    //                     })
    //                 }
    //             })
    //         }
    //     }
    //     else return res.status(400).json({ message: 'data error' })
    // } catch (err) {
    //     return res.status(400).json({ message: err.message })
    // }
})

module.exports = router;