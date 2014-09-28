var db = require('./database.js');
var dbCreds = require('./credentials.json');
var path = require('path');

var dbo = new db.connection(dbCreds);

var getStudents = function(res) {
    dbo.connection.query('select * from Students order by studentName', function(err, rows, fields) {
        if (rows.length > 0) {
            res.json(rows);
        }
        else {
            res.json([]);
        }
    });
};

module.exports = function(app) {
    app.get('/api/students', function(req, res) {
        getStudents(res);
    });

    app.post('/api/students/:studentName', function(req, res) {
        var queryString = 'insert into ' + dbo.connection.config.database + '.Students (studentName) values (' + dbo.connection.escape(req.params.studentName) + ')';
        dbo.connection.query(queryString, function(err, rows, fields) {
            getStudents(res);
        });
    });

    app.delete('/api/students/:studentID', function(req, res) {
        var queryString = 'delete from ' + dbo.connection.config.database + '.Students where studentID = ' + dbo.connection.escape(req.params.studentID);
        dbo.connection.query(queryString, function(err, rows, fields) {
            getStudents(res);
        });

    });

    app.put('/api/students/:studentID/:newStudentName', function(req, res) {
        var queryString = 'update ' + dbo.connection.config.database + '.Students set studentName = ' + dbo.connection.escape(req.params.newStudentName) + ' where studentID = '+ dbo.connection.escape(req.params.studentID);
        dbo.connection.query(queryString, function(err, rows, fields) {
            getStudents(res);
        });
    });
};
