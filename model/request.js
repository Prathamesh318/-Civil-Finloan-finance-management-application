const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    mobile: { type: Number,
         required: [true,"Mobile Number Should Be Present"],
        unique:true,
        },
    email: { type: String, 
        required: [true,"Email is mandatroy"] ,
        unique:true
    },
    amt: {
         type: Number,
         required: true
         },
    type: { 
        type: String, 
        required: true 
    },
    msg: { 
        type: String
     },
    code: { 
        type: String 
    }
});

module.exports = mongoose.model("Request", requestSchema);
