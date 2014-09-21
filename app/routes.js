var db = require('./models/database.js');
var dbCreds = require('./models/credentials.json');

var dbo = new db.connection(dbCreds);

module.exports = function(app) {
    app.get('/api/students', function(req, res) {
        // get the students
    });

    app.post('/api/students', function(req, res) {
        // create a student and send back the all the students after creation
    });

    app.delete('/api/students/:student_id', function(req, res) {
        // delete a given student based on the ID
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
