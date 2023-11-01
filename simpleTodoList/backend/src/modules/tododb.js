const path = require('path');
const crypto = require('crypto');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(path.resolve(__dirname, '..', '..', 'data', 'tododb.sqlite3'), (err) => {
    if (err) {
        console.log(err.message);
        return null;
    }
});

function getTodos() {
    let q = 'select * from todo';
    return new Promise((resolve, reject) => {
        db.all(q, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}

function insertTodo(text) {
    let todoUUID = crypto.randomUUID();
    let q = 'insert into todo (uuid, text) values (?, ?)';
    return new Promise((resolve, reject) => {
        db.run(q, [todoUUID, text], (err) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    });
}

function deleteTodo(todoUUID) {
    let q = 'delete from todo where uuid = ?';
    return new Promise((resolve, reject) => {
        db.run(q, [todoUUID], (err) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        });
    });
}

module.exports = {
    db,
    getTodos,
    insertTodo,
    deleteTodo
};
