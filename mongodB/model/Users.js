import mongoose from "mongoose";
import validator from 'validator';
import bycrypt from "bcryptjs"


const Users = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please Enter Your First Name']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password should Contain more than 6 characters']
    },

    email: {
        type: String,
        required: [true, 'Please Enter Your email '],
        unique: true,
        lowercase: [true, 'Your Email should contain only Lower case characters'],
        validate: [validator.isEmail, "Please Enter a Valid Email"]
    },
    role :{
        type : String,
        required : true,
    }
});

Users.pre('save', async function (next) {
    const salt = await bycrypt.genSalt();
    this.password = await bycrypt.hash(this.password, salt);
    next();
})


Users.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bycrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect Email");
}

const userSchme = mongoose.model('user', Users);

export default userSchme;