const pool = require('./db');

exports.insertNewTask = (title, description, priority, selectedDate, status, userId) => {
    const query = `insert into to_do_tasks (task_name, description, priority, due_date, status, user_id)
    values (?, ?, ?, ?, ?, ?);`;
    return pool.query(query, [title, description, priority, selectedDate, status, userId]);
};

exports.fetchAllTask = (userId) => {
    const query = `SELECT *  FROM to_do_tasks WHERE user_id = ?;`;
    return pool.query(query, [ userId]);
}
