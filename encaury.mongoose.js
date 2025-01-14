const mongoose = require('mongoose');

const UserEnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Fixed typo
    },
    phone: {
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type: String,
        required: true, // Fixed typo
        unique: true,
    },
    address: {
        type:String,
        required:true,
    },
    message: {
        type: String,
        required: true, // Fixed typo
    },
});

// Proper export
const Enquiry = mongoose.model('Enquiry', UserEnquirySchema);
module.exports = Enquiry; // or use `export default Enquiry` if using ES modules
