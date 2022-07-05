const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    defName: {
        type: String,
        required: true
    },
    defAddr: {
        type: String,
        required: true
    },
    crimeType: {
        type: String,
        required: true
    },
    crimeDate: Date,
    crimeLoc: {
        type: String,
        required: true
    },
    officerName: {
        type: String,
        required: true
    },
    arrestDate: Date,
    judgeName: String,
    lawyerName: String,
    startDate: Date,
    endDate: Date,
    status: {
        type: String,
        default: "pending"
    },
    summary: String,
    lawyersWithAccess: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Case', caseSchema);