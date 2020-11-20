const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Employee = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    brand: {
        type: String
    },
    designation: {
        type: String
    },
    doj: {
        type: Date
    },
    phoneNumber: {
        type: Number
    }
});

module.exports = mongoose.model('Employee', Employee);