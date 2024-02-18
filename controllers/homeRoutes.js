const router = require('express').Router();
const { Blogs, User } = require('../models');
const withAuth = require('../utils/auth');

// route that displays all the posts 
router.get('/', async (req, res) => {
    try {
        const postData = await Blogs.findAll({
            include: [{
                model: User,
                attributes: ['name']
            },],
        });
        const posts = postData.map((post) => post.get({ plain: true}));
        
        res.render('homepage', {
            posts, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req,res) => {
    try {
        const postsData = await Blogs.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        const post = postsData.get({ plain: true });

        res.render('post', {
            ...post, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blogs }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user, 
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        req.redirect('login');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        req.redirect('login');
        return;
    }

    res.render('signup');
})

module.exports = router;

