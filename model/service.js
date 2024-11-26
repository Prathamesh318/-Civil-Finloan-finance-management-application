const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    type: { type: String, 
        required: [true,"Type Must Be Present"]
     },
    code: { type: String,
         required: [true,"Code Must Be present"] 
        },
    description: { type: String, 
        required: [true,"Descripton Must Be Present"]
     },
    imgUrl: { 
        type: String 
    },
    detail: { 
        type: Array }
});

module.exports = mongoose.model("Service", serviceSchema);
