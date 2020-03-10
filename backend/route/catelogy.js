const express = require('express');
const router = express.Router();
const cors = require('cors')
const Category = require('../models/category')

router.use(cors())

router.get('/', cors(), async (req, res) => {
    try {
        const subscribers = await Category.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/edit/:id', cors(), async (req, res) => {
    try {
        const subscribers = await Category.findById({ '_id': req.params.id })
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.patch('/edit-update/:id', cors(), async (req, res) => {
    try {
        const subscribers = await Category.findByIdAndUpdate(req.params.id, { $set: req.body })
        res.status(201).json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/add', cors(), async (req, res) => {
    const subscriber = new Category({
        title: req.body.title,
        arrayPreference: [],
    })
    category = await Category.findOne({ title: req.body.title })
    try {
        if (category == null) {
            const newSubscriber = await subscriber.save()
            res.status(201).json(newSubscriber)
        }
        else return res.status(400).json({ message: 'data error' })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})


router.patch('/preference/creating/:name', cors(), async (req, res) => {
    Category.findOneAndUpdate({ title: req.params.name }, { $addToSet: { 'arrayPreference': { 'perference': req.body.namePreference } } })
        .then((list) => { res.status(201).json(list) })
        .catch((error) => { res.status(500).json({ message: error.message } )})
})

router.patch('/preference/delete/:id', cors(), async (req, res) =>{
    Category.findByIdAndUpdate(req.params.id, { $pull: { "arrayPreference": { "perference": req.body.preference } } })
        .then(list => { res.status(201).json(list) })
        .catch((error) => { res.status(500).json({ message: error.message } )})
})
module.exports = router;