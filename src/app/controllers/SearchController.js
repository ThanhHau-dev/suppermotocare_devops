const Products = require('../model/Product.js')
const Account = require('../model/Account.js')


class SearchController {
    async showSearch(req, res, next) {
        try {
            const user = await Account.findOne({ username: req.cookies.sessionId })

            const data = await Products.find().lean().exec();
            const results = data.filter(data => data.name.includes(req.body.search_product))
            res.render('search', { results, user })
        } catch (error) {
            res.json({ error: error.message });
        }
    }
}

module.exports = new SearchController