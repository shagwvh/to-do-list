const pool = require('./db');

exports.insertNewTask = (title, description, priority, selectedDate, status, userId) => {
    const query = `insert into to_do_tasks (task_name, description, priority, due_date, status, user_id)
    values (?, ?, ?, ?, ?, ?);`;
    return pool.query(query, [title, description, priority, selectedDate, status, userId]);
};

exports.deleteTask = (taskId) => {
    const query = `UPDATE to_do_tasks SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?;`;
    return pool.query(query, [taskId]);
};

exports.fetchAllTask = (userId) => {
    const query = `SELECT  id, task_name as title, description, priority, date_format(due_date,'%D %M %Y') as dueDate, status  FROM to_do_tasks WHERE user_id = ? and deleted_at is null;`;
    return pool.query(query, [ userId]);
}
