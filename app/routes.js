var db = require('./models/database.js');
var dbCreds = require('./models/credentials.json');

var dbo = new db.connection(dbCreds);

module.exports = function(app) {
    app.get('/api/students', function(req, res) {
        dbo.connection.query('select * from Students', function(err, rows, fields) {
            if (err)
            {
                throw err;
            }

            if (rows.length > 0) {
                res.json(rows);
            }
        });
    });

    app.post('/api/students', function(req, res) {
        dbo.createStudent(req.body.studentName);
    });

    app.delete('/api/students/:studentName', function(req, res) {
        dbo.deleteStudent(req.params.studentName);
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
