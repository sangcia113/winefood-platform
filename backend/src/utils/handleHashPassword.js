const bcrypt = require('bcrypt');

const encodePassword = password => {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(password, salt);
};

const decodePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = { encodePassword, decodePassword };
