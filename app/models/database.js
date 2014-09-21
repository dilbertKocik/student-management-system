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
}

DBConnection.prototype.getStudents = function () {
    this.connection.connect();

    this.connection.query('select * from Students', function(err, rows, fields) {
        if (err)
        {
            throw err;
        }

        for (var i in rows)
        {
            console.log('Student Name: ' + rows[i].studentName);
        }
    });

    this.connection.end();
}

DBConnection.prototype.createStudent = function (studentName) {
    this.connection.connect();

    this.connection.query(('insert into' + this.connection.database + '.Students (studentName) VALUES ("'
            + studentName + '")'), function(err, rows, fields) {
        if (err) throw err;
    });

    this.connection.end();
}

DBConnection.prototype.deleteStudent = function (studentName) {
    this.connection.connect();

    this.connection.query(('delete from ' + this.connection.database + '.Students where studentName = "'
            + studentName + '"'), function(err, rows, fields) {
        if (err) throw err;
    });

    this.connection.end();
}

DBConnection.prototype.updateStudent = function (currentStudentName, newStudentName) {
    this.connection.connect();

    this.connection.query(('update ' + this.connection.database + '.Students set studentName = "'
            + newStudentName + '" where studentName = "' + currentStudentName + '"'), function(err, rows, fields) {
        if (err) throw err;
    });

    this.connection.end();
}


module.exports = {
    connection: DBConnection
};
