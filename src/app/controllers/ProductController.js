const Products = require('../model/Product.js');
const Account = require('../model/Account.js');

class ProductController {
    // async show(req, res, next) {
    //     try {
    //         var product = await Products.findOne({ slug: req.params.slug }).lean();
    //         res.render('product/show', { product });
    //     } catch (error) {
    //         res.json({ error: err.message });
    //     }
    // }

    // [POST] / manga/hdFormAction
    hdFormAction(req, res, next) {
        switch (req.body.action) {
            case 'create':
                res.json(req.body);
                break;
            case 'delete':
                Products.delete({ _id: { $in: req.body.mangaIDs } })
                    .lean()
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
                break;
        }
    }
    async create(req, res, next) {
        try {
            const user = await Account.findOne({ username: req.cookies.sessionId })
            res.render('product/create', {user});
        } catch (err) {
            res.json({ error: err.message });
        }
    }

    async edit(req, res, next) {
        try {
            const user = await Account.findOne({ username: req.cookies.sessionId })

            const product = await Products.findById({ _id: req.params.id }).lean();
            res.render('product/edit', { product, user });
        } catch (error) {
            res.json({ error: err.message });
        }
    }

    // [DELETE] / manga/:id
    async destroy(req, res, next) {
        try {
            await Products.delete({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            res.json({ error: err.message });
        }
    }

    // [DELETE] / manga/:id/force
    async destroyForce(req, res, next) {
        try {
            await Products.deleteOne({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            res.json({ error: err.message });
        }
    }

    async update(req, res, next) {
        try {
            const user = await Account.findOne({ username: req.cookies.sessionId })

            await Products.updateOne({ _id: req.params.id }, req.body).lean();
            res.redirect('/me/stored/product', user);
        } catch (error) {
            res.json({ error: err.message });
        }
    }

    // [PATCH] / manga/:id/restore
    async restore(req, res, next) {
        try {
            await Products.restore({ _id: req.params.id }).lean();
            console.log(req.params.id);
            res.redirect('back');
        } catch (error) {
            res.json({ error: err.message });
        }
    }

    async store(req, res, next) {
        const product = new Products(req.body);
        await product.save().then(() => res.redirect('back'));
    }
}

module.exports = new ProductController();
