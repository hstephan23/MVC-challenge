const router = require('express').Router();
const { Blogs, User } = require('../models');
const { rawAttributes } = require('../models/User');
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
        const post = postData.map((post) => post.get({ plain: true}));

        res.render('homepage', {
            post, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

