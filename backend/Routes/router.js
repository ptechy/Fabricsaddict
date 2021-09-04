import express from 'express'

import {addDefault, getTitles, getFabricsByCategory,  getFabrics, getFabric, addFabrics, updateFabrics, deleteFabrics } from '../Crud/textileCrud'


import {addOrder, getOrders } from '../Crud/orderCrud'

const router = express.Router()

// route for fabrics

router.get('/api/v1/addDefault', addDefault )
router.get('/api/v1/titles', getTitles )
router.get('/api/v1/categories/:name', getFabricsByCategory)
router.get('/api/v1/fabrics', getFabrics )

router.post('/api/v1/fabrics', addFabrics)

// route for orders
router.get('/api/v1/orders', getOrders )


router.post('/api/v1/order', addOrder )



// router.get('/api/v1/categories', getCategories)

//       .get('/api/v1/fabrics/:id', getFabric)
//       .post('/api/v1/fabrics', addFabrics)
//       .patch('/api/v1/fabrics/:id', updateFabrics)
//       .delete('/api/v1/fabrics/:id', deleteFabrics)

export default router
