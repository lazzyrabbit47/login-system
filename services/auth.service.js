const argon2 = require('argon2')
const User = require('../models/user');

exports.Login = async function (email, password) {
    const user = await User.findOne({
        email: email
    });
    if (user && await argon2.verify(user.hashedPassword, password)) {
        return 'Login in Successful'        
    } else {
        return 'User or password is wrong'
    }
}

exports.Register = async function (username, email, password) {
    const user = await User.findOne({
        email: email
    });
    if (user) {
        console.log('User already exists \n' + user)
        return user
    } else {
        const hashedPassword = await argon2.hash(password);
        const newUser = await new User({
            username: username,
            email: email,
            hashedPassword: hashedPassword
        })
        const user = await newUser.save()
        console.log('New User Added \n' + user)
        return user
    }
}