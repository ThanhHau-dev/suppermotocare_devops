const Products = require('../model/Product.js')
const Account = require('../model/Account.js')


class HomeConTroller {
    async index(req, res, next) {
        const user = await Account.findOne({ username: req.cookies.sessionId})
        const results = await Products.find({}).lean()
        res.render('layouts/main', { results, user })
    }
}

module.exports = new HomeConTroller