const express = require('express');

let Employee = require('../models/employee');

const employeeRoute = express.Router();
employeeRoute.route('/create').post((req, res, next) => {
    Employee.create(req.body, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

employeeRoute.route('/').get((_req, res, next) => {
    Employee.find((error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

employeeRoute.route('/read/:id').get((req, res, next) => {
    Employee.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

employeeRoute.route('/update/:id').put((req, res, next) => {
    Employee.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
            console.log('Data updated Successfully');
        }
    });
});

employeeRoute.route('/delete/:id').delete((req, res, next) => {
    Employee.findByIdAndRemove(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    });
});

module.exports = employeeRoute;