const Account = require('../model/Account.js')
const Session = require('../model/Session.js')

const bcrypt = require('bcryptjs');

class AccountController {
    async handleLogin(req, res, next) {
        try {
            const account = await Account.findOne({ username: req.body.username });
            if (account) {
                const isMatch = await bcrypt.compare(req.body.password, account.password);
                if (isMatch) {
                    const sessionId = Date.now().toString();
                    const session = await new Session ({ 
                        session: sessionId,
                        session_username: account.username,
                        session_gmail: account.gmail,
                    })
                    await session.save();
                    const sessionID = await Session.findOne({ session_username: account.username });
                    res.setHeader(
                        'Set-Cookie',
                        `sessionId = ${sessionID.session_username};  max-age=3600; httpOnly; path=/`,
                    
                    ).redirect('/')
                    
                } else {
                    res.render('account/login', {message: 'Invalid username or password'})
                }
            } else {
                res.render('account/login', {message: 'Invalid username or password'})
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    }
    async login(req, res, next) {
        try {
            res.render('account/login', {message: ''})
        } catch (error) {
            res.json({ error: error.message });
        }
    }

    async logout(req, res, next) {
        try {      
            await Session.findOneAndDelete({ session_username: req.cookies.sessionId})
            res.setHeader(
                'Set-Cookie',
                `sessionId = '';  max-age=3600; httpOnly; path=/`,
            ).redirect('/');
        } catch (error) {
            res.json({ error: error.message });
        }
    }

    async register (req, res, next) {
        try {
            res.render('account/register', {message: ''})
        } catch (error) {
            res.json({ error: error.message });
        }
    }

    async addCustomer (req, res, next) {
        try {
            //const user = await Account.findById({ _id: mongoose.Types.ObjectId(req.cookies.sessionId)})   
            const gmailExists = await Account.findOne({ gmail: req.body.gmail })
            const userNameExists = await Account.findOne({ username: req.body.username })

            if (gmailExists || userNameExists) {
                return res.render('account/register', {message: 'Gmail or User Name Already exists'})
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            const account = new Account({
                username: req.body.username,
                gmail: req.body.gmail,
                password: hashPassword,
            })
            await account.save();
            res.redirect('/account/login');
        } catch (error) {
            res.json({ error: error.message });
        }
    }
    
}

module.exports = new AccountController