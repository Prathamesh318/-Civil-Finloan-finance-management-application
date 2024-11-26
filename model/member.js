const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    mobile: { 
        type: Number,
         required: [true,"Mobile Number Must Be present"]
         },
    email: { 
        type: String,
         required: [true,'Email Must Be Prsent'] },
    occupation: { 
        type: String, 
        required: true },
    createpassword: { 
        type: String, 
        required: true }
});

module.exports = mongoose.model("Member", memberSchema);
