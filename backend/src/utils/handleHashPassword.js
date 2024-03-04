const bcrypt = require('bcrypt');

const encodePassword = password => {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(password, salt);
};

const decodePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { encodePassword, decodePassword };
