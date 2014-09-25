var mysql = require('mysql');

function DBConnection(opts) {
    if (!(this instanceof DBConnection))
    {
        return new DBConnection(opts);
    }
    
    this.connection = mysql.createConnection({
        host: opts.host,
        user: opts.user,
        password: opts.password,
        database: opts.databaseName
    });
    this.studentList = {"studentName": "test data"};
}

module.exports = {
    connection: DBConnection
};
