const pool = require('./db');

exports.insertTask = (userName) => {
    const query = 'select id as userId , name, email, password from users where user_name = ?';
    return pool.query(query, [userName]);
};

