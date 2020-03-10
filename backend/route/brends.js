const express = require('express');
const router = express.Router();
const cors = require('cors')
const fileUpload = require('express-fileupload');
const fs = require('fs');
const Brends = require('../models/brends')

router.use(cors())
router.use(fileUpload({ parseNested: true }));


router.get('/', cors(), async (req, res) => {
    try {
        const subscribers = await Brends.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.post('/add', cors(), async (req, res) => {
    brends = await Brends.findOne({ nameBrends: req.body.nameBrends })
    try {
        if (brends == null ) {
            if(req.files.logo_img){
                req.files.logo_img.name = Math.random().toString(36).substring(2);
                const editFilles = req.files.logo_img.mimetype.indexOf('/');
                const img = `${req.files.logo_img.name}.${req.files.logo_img.mimetype.slice(editFilles + 1)}`;
                const subscriber = new Brends({
                    nameBrends: req.body.nameBrends,
                    imagesId: img,
                    images: `http://${domain}/uploads/brends/${img}`
                })
                req.files.logo_img.mv(`./uploads/brends/${img}`, async(error) =>{
                    if (error)
                        return res.status(500).json({ message: 'no loaded img' })
                    else{
                            const newSubscriber = await subscriber.save()
                            res.status(201).json(newSubscriber)
                    }
                });
            }
            else return res.status(400).json({ message: 'no image' })
        }
        else return res.status(400).json({ message: 'The name is already there' })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})
router.delete('/:id', cors(), async (req, res) =>{
    const brends = await Brends.findByIdAndRemove(req.params.id);
    try{
        if(brends == null) return res.status(400).json({ message: 'Id not found' })
        else{
            fs.unlinkSync(`./uploads/brends/${brends.imagesId}`);
            res.status(201);
        }
    }catch(err){
        return res.status(400).json({ message: err.message })
    }
})
module.exports = router;