const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
// const autoIncrement = require('mongoose-auto-increment');

let userSchema = new Schema({

    // _id: {
    //     type: Number,
    //     required: true
    // },
    Email: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Creation_date: {
        type: Date,
        required: true
    }

});

// let connection = mongoose.createConnection("mongodb://localhost/tokenDemo", { useNewUrlParser: true, useUnifiedTopology: true });

// autoIncrement.initialize(connection);

// userSchema.plugin(autoIncrement.plugin, {
//     model: 'users', // Collection Name
//     field: '_id', // Field in Document
//     startAt: 1,
//     incrementBy: 1
// });


userSchema.statics.hashPassword = function(password){
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.Password); // this.Password in the user schema
};


module.exports = mongoose.model('users', userSchema);
