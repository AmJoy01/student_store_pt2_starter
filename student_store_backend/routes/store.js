const express = require("express")
const Store = require("../models/store")
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const user = res.locals.user
        const products = await Store.listProducts(user)
        return res.status(200).json({ products })
    } catch (err) {
        next(err)
    }
})


module.exports = router
