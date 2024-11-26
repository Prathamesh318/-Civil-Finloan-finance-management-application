const Request = require("../model/request");
exports.createRequest = async (req, res) => {
    const { mobile, email, amt, type, msg, code } = req.body;

    if (!mobile || !email || !amt || !type) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newRequest = await Request.create({ mobile, email, amt, type, msg, code });
        res.status(201).json({ message: "Request created successfully", data: newRequest });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteRequest = async (req, res) => {
    const { mobile } = req.body;

    try {
        const deletedRequest = await Request.findOneAndDelete({ mobile });
        if (!deletedRequest) return res.status(404).json({ message: "Request not found" });
        res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateRequest = async (req, res) => {
    try {
        const { mobile, service, type, remarks } = req.body; 
        if (!mobile || !service || !type || !remarks) {
            return res.status(400).json({
                success: false,
                message: "Mobile number, service, type, and remarks are required"
            });
        }
        const updatedRequest = await Request.findOneAndUpdate(
            { mobile },
            { 
                code: service, 
                type: type, 
                msg: remarks 
            },
            { new: true } 
        );

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "Request not found with the provided mobile number"
            });
        }

        res.status(200).json({
            success: true,
            message: "Request updated successfully",
            data: updatedRequest
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

