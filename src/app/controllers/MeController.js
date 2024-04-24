const Products = require('../model/Product.js')
const Account = require('../model/Account.js')

class MeController {
    async storedProduct(req, res, next) {
        const user = await Account.findOne({ username: req.cookies.sessionId })
        let productQuery = Products.find({});
        if (req.query.hasOwnProperty('_sort')) {
            productQuery = productQuery.sort({
                [req.query.collumn]: req.query.type
            })
        }

        Promise.all([
            Products.countDocumentsWithDeleted({ deleted: true }).lean(),
            productQuery.lean(),
        ])
            .then(([deletedCount, findDeletedResult]) => {
                res.render('me/storedProducts', {
                    deletedCount,
                    findDeletedResult,
                    user,
                });
            })
            .catch(next);
    }

    async trashProducts(req, res, next) {
        try {
            const user = await Account.findOne({ username: req.cookies.sessionId })
            const product = await Products.findWithDeleted({ deleted: true }).lean();
            res.render('me/trashProducts', { product, user });
        } catch (error) {
            res.json({ error: err.message });
        }
    }
}

module.exports = new MeController();