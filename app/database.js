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

DBConnection.prototype.createStudent = function (studentName) {
    var queryString = 'insert into ' + this.connection.config.database + '.Students (studentName) values (' + this.connection.escape(studentName) + ')';
    this.connection.query(queryString, function(err, rows, fields) {
        //if (err) throw err;
    });
}

DBConnection.prototype.updateStudent = function (currentStudentName, newStudentName) {
    var queryString = 'update ' + this.connection.config.database + '.Students set studentName = "' + this.connection.escape(newStudentName) + '"' + ' where studentName = ' + this.connection.escape(currentStudentName);
    this.connection.query(queryString, function(err, rows, fields) {
        //if (err) throw err;
    });
}

module.exports = {
    connection: DBConnection
};
