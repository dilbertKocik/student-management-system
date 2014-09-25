var db = require('./database.js');
var dbCreds = require('./credentials.json');

var dbo = new db.connection(dbCreds);

module.exports = function(app) {
    app.get('/api/students', function(req, res) {
        dbo.connection.query('select * from Students', function(err, rows, fields) {
            if (rows.length > 0) {
                res.json(rows);
            }
        });
    });

    app.post('/api/students/:studentName', function(req, res) {
        var queryString = 'insert into ' + dbo.connection.config.database + '.Students (studentName) values (' + dbo.connection.escape(req.params.studentName) + ')';
        dbo.connection.query(queryString, function(err, rows, fields) {
            dbo.connection.query('select * from Students', function(err, rows, fields) {
                if (rows.length > 0) {
                    res.json(rows);
                }
            });
        });
    });

    app.delete('/api/students/:studentName', function(req, res) {
        var queryString = 'delete from ' + dbo.connection.config.database + '.Students where studentName = ' + dbo.connection.escape(req.params.studentName);
        dbo.connection.query(queryString, function(err, rows, fields) {
            dbo.connection.query('select * from Students', function(err, rows, fields) {
                if (rows.length > 0) {
                    res.json(rows);
                }
            });
        });

    });

    app.put('/api/students/:currentStudentName/:newStudentName', function(req, res) {
        var queryString = 'update ' + dbo.connection.config.database + '.Students set studentName = ' + dbo.connection.escape(req.params.newStudentName) + ' where studentName = '+ dbo.connection.escape(req.params.currentStudentName);
        dbo.connection.query(queryString, function(err, rows, fields) {
            dbo.connection.query('select * from Students', function(err, rows, fields) {
                if (rows.length > 0) {
                    res.json(rows);
                }
            });
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
