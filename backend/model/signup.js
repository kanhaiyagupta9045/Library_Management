const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Userschema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    psw_repeat: {
        type: String,
    },
})
// Userschema.pre("save", async(next)=> {
//     console.log("kkg");
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password,10);
//         console.log("hii");
//     }
//     next();
// })
// Userschema.pre("save", async(next)=> {
//     console.log("kkg");
//     if (this.isModified("psw_repeats")) {
//         this.psw_repeats = await bcrypt.hash(this.psw_repeats,10);
//         console.log("hii");
//     }
//     next();
// })
const User = mongoose.model('User', Userschema);
module.exports = User;
