const Member = require("../model/member");
exports.createMember = async (req, res) => {
    const { mobile, email, occupation, createpassword } = req.body;

    if (!mobile || !email || !occupation || !createpassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newMember = await Member.create({ mobile, email, occupation, createpassword });
        res.status(201).json({ message: "Member created successfully", data: newMember });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteMember = async (req, res) => {
    const { mobile } = req.body;

    try {
        const deletedMember = await Member.findOneAndDelete({ mobile });
        if (!deletedMember) return res.status(404).json({ message: "Member not found" });
        res.status(200).json({ message: "Member canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updatePassword = async (req, res) => {
    try {
        const { mobile, password } = req.body; 
        if (!mobile || !password) {
            return res.status(400).json({
                success: false,
                message: "Mobile number and new password are required"
            });
        }
        const updatedUser = await Member.findOneAndUpdate(
            { mobile }, 
            { createpassword: password }, 
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found with the provided mobile number"
            });
        }
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
            data: {
                mobile: updatedUser.mobile,
                email: updatedUser.email
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
