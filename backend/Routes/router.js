import express from 'express'

import {
      addDefault, 
      getTitles, 
      getFabricsByCategory,  
      getFabrics, 
      getHiddenProducts,
      activateProduct, 
      hideProduct, 
      getActiveProducts,
      getFabric,
      addFabrics,
      updateFabrics,
      deleteFabric 
} from '../Crud/textileCrud'


import {addOrder, getOrders, activateOrder, hideOrder, getActivedOrders, getHiddenOrders } from '../Crud/orderCrud'


const router = express.Router()

// route for fabrics
router.get('/api/v1/addDefault', addDefault )
router.get('/api/v1/titles', getTitles )
router.get('/api/v1/categories/:name', getFabricsByCategory)
router.get('/api/v1/fabrics', getFabrics )
router.get('/api/v1/fabrics/active', getActiveProducts )
router.get('/api/v1/fabrics/hidden', getHiddenProducts )

router.post('/api/v1/fabrics', addFabrics)

router.put('/api/v1/fabrics/:id', updateFabrics)
router.put('/api/v1/product/activate/:id', activateProduct)
router.put('/api/v1/product/hide/:id', hideProduct)

router.delete('/api/v1/fabrics/:id', deleteFabric)

// route for orders
router.get('/api/v1/orders', getOrders )
router.get('/api/v1/orders/active', getActivedOrders )
router.get('/api/v1/orders/hidden', getHiddenOrders )

router.put('/api/v1/order/activate/:id', activateOrder)
router.put('/api/v1/order/hide/:id', hideOrder)

router.post('/api/v1/order', addOrder )


// router.get('/api/v1/categories', getCategories)

//       .get('/api/v1/fabrics/:id', getFabric)
//       .post('/api/v1/fabrics', addFabrics)
//       .patch('/api/v1/fabrics/:id', updateFabrics)
//       .delete('/api/v1/fabrics/:id', deleteFabrics)

export default router
