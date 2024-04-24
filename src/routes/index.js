const homeRoutes = require('./home')
const purchaseRoute = require('./purchase')
const SearchRoute = require('./search')
const MeRouter = require('./me')
const ProductRouter = require('./products')
const AccountRouter = require('./account')

function route(app) {
    app.use('/account', AccountRouter);
    app.use('/me', MeRouter);
    app.use('/product', ProductRouter);
    app.use('/purchase', purchaseRoute);
    app.use('/search', SearchRoute);
    app.use('/', homeRoutes);
}

module.exports = route