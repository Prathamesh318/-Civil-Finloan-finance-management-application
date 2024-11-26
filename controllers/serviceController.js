// const Service = require("../model/service");
// const Service=require("../model/service");
const Request=require("../model/request")
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getServiceByType = async (req, res) => {
    try {
        const { type } = req.params;
        const service = await Service.findOne({ type });

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({
            success: true,
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.createServiceRequest = async (req, res) => {
    try {
        const { mobile, email, amt, type, msg, code } = req.body;

        if (!mobile || !email || !amt || !type || !msg || !code) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const newRequest = await Request.create({
            mobile,
            email,
            amt,
            type,
            msg,
            code,
        });
        res.status(201).json({
            success: true,
            message: `Request for ${type} has been created successfully.`,
            data: newRequest
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.calculateEMI = async (req, res) => {
    try {
        const { amt, tenure, type } = req.body; 
        if (!amt || !tenure || !type) {
            return res.status(400).json({
                success: false,
                message: "All fields (amt, tenure, type) are required"
            });
        }
        const interestRates = {
            "Personal Loan": 12,
            "Home Loan": 8,
            "Education Loan": 10,
            "Car Loan": 9,
            "MI Loan": 11
        };
        const annualRate = interestRates[type];
        if (!annualRate) {
            return res.status(404).json({
                success: false,
                message: "Loan type not found"
            });
        }
        const monthlyRate = annualRate / 12 / 100; 
        const emi = (amt * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                    (Math.pow(1 + monthlyRate, tenure) - 1);

        res.status(200).json({
            success: true,
            message: "EMI calculated successfully",
            data: {
                loanType: type,
                loanAmount: amt,
                tenure: tenure,
                interestRate: annualRate,
                emi: emi.toFixed(2)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
