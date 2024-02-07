const User = require('./User');
const Blogs = require('./Blogs');

// one to many connection
User.hasMany(Blogs, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// belongs to 
Blogs.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blogs }