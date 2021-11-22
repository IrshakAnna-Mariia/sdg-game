const Router = require('express')
const router = Router()
const Item = require('../models/Item')


router.get('/get/:id', async (req, res) => {
  try {
    const idItem = req.params.id    
    const foundItem = await Item.findOne({ idItem })    
    return res.json(foundItem)    
  } catch { }
})


module.exports = router