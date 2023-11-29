const router = require("express").Router()
const { createProduct,searchProduct, getProduct, deleteProduct, getPagingProduct, getProductById } = require('../controllers/product')
const { authentication } = require("../middlewares")

router.post('/', authentication, createProduct)
router.get('/', getProduct)
router.delete('/:id', deleteProduct)
router.get('/get-paging', getPagingProduct)
router.get('/:id', getProductById)
router.get('/search', searchProduct)

module.exports = router