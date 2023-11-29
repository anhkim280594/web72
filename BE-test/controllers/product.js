const productModel = require("../model/product")
const joi = require("joi")
const userModel = require("../model/user")

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id

        const product = await productModel.findById(productId)

        return res.status(200).json({ product })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createProduct = async (req, res) => {
    try {
        const productSchema = joi.object({
            name: joi.string().required().min(3).max(32).messages({
                "string.min": "Tên phải có 3 kí tự trở lên",
                "string.max": "Tên phải bé hơn 32 kí tự",
                "string.base": "Tên phải là kiểu dữ liệu string",
                "any.required": "Tên không được để trống"
            }),
            title: joi.string().required(),
            time: joi.string().required(),
            year: joi.number().required(),
            image: joi.string().required(),
            introduce: joi.string().required(),
        }).unknown(true)


        const name = req.body.name
        const title = req.body.title
        const time = req.files.time
        const year = req.body.year
        const image = req.body.image
        const introduce = req.body.introduce

        const validate = productSchema.validate({ name, title, time, year, image, introduce})
        if (validate.error) {
            return res.status(400).json({ error: validate.error.message })
        }


        const newProduct = await productModel.create({ name,  title, time, year, image, introduce, createdBy: req.userId })
        return res.status(201).json({ product: newProduct, message: "Tao san pham thanh cong" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message || "Failed" })
    }
}

const getProduct = async (req, res) => {
    try {
        const products = await productModel.find()

        return res.status(200).json({ products })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message || "Failed" })
    }
}

const getPagingProduct = async (req, res) => {
    try {
        const pageSize = req.query.pageSize || 5// So luong phan tu trong 1 trang
        const pageIndex = req.query.pageIndex || 1 // So trang

        const product = await productModel
            .find()
            .populate({ path: "createdBy", select: "-password" })
            .skip(pageSize * pageIndex - pageSize).limit(pageSize)
        const count = await productModel.countDocuments()
        const totalPage = Math.ceil(count / pageSize)

        return res.status(200).json({ product, count, totalPage })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message || "Failed" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id

        const product = await productModel.findOneAndDelete({ _id: id })

        return res.status(200).json({ message: "Xoa san pham thanh cong" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message || "Failed" })
    }
}
const searchProduct = async (req, res) => {
    try {
        const name = req.query.name
        const products = await productModel.find({ name: { $regex: name, $options: "i" } })
        return res.status(200).json({ products })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message || "Failed" })
    }
}

module.exports = {
    createProduct,
    getProduct,
    getPagingProduct,
    deleteProduct,
    getProductById,
    searchProduct
}