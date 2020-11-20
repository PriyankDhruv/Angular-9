let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let createError = require('http-errors');

let dbConfig = require('./config/db');
const employeeRoute = require('./routes/employee.route');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected Successfully');
},
error => {
    console.log('Database failed to connect' + error);
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/EmployeeApp')));
app.use('/', express.static(path.join(__dirname, 'dist/EmployeeApp')));
app.use('/api', employeeRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server connected to port: ' + port);
});

app.use((_req, _res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if(!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(err.message);
});