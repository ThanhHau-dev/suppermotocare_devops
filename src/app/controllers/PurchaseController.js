const Products = require('../model/Product.js')
const Account = require('../model/Account.js')
const Cart = require('../model/Cart.js')
const Session = require('../model/Session.js')


class PurchaseController {
    async show(req, res, next) {
        try {
            const user = await Account.findOne({ username: req.cookies.sessionId })

            const results = await Products.findById({ _id: req.params.id }).lean()
            res.render('purchase/purchase', { results, user })
        } catch (error) {
            res.json({ error: error.message });
        }
    }


    async addProductIncart(req, res, next) {
        try {
            const user = await Account.findOne({ username: req.cookies.sessionId })
            if (!user) {
                return res.redirect('/account/login')
            }
            const product = await Products.findById({ _id: req.params.id }).lean();
            const results = new Cart({
                customerName: user.username,
                productName: product.name,
                imgProduct: product.img,
                priceProduct: product.price,
                quantity: req.params.amount,
            })
            await results.save()
            res.redirect('back')
        } catch (error) {
            res.json({ error: error.message });
        }
    }
    async showCart(req, res, next) {
        try {
            const user = await Account.findOne({ username: req.cookies.sessionId })
            const session = await Session.findOne({ session_username: req.cookies.sessionId })
            if (!session) {
                return res.redirect('/account/login');
            }
            const results = await Cart.find({ customerName: req.cookies.sessionId }).lean();
            res.render('purchase/cart', { results, user })
        } catch (error) {
            res.json({ error: error.message });
        }
    }

    async delete(req, res, next) {
        try {
            await Cart.findOneAndDelete({ _id: req.params.id })
            res.redirect('back')
        } catch (error) {
            res.json({ error: error.message });
        }
    }

    async type(req, res, next) {
        try {
            const user = await Account.findOne({ username: req.cookies.sessionId })

            const results = await Products.find({ type: req.query.type }).lean()
            res.render('purchase/listPurchase', { results, user })
        } catch (error) {
            res.json({ error: error.message });
        }
    }
}

module.exports = new PurchaseController