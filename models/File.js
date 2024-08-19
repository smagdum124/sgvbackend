const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    Roll_No: String,
    Enroll_No: String,
    Course_Code: String,
    Regular_Private: String,
    Name: String,
    Year_sem: String,
    Father_name: String,
    Course_Duration: String,
    Institute_Name: String,
    Exam_Type: String,

    // Subject One
    Subject_One: String,
    Subject_Code_One: String,
    Maximum_Marks_One: Number,
    Minimum_Pass_Marks_One: Number,
    Obtained_Marks_One: Number,

    // Subject Two
    Subject_Two: String,
    Subject_Code_Two: String,
    Maximum_Marks_Two: Number,
    Minimum_Pass_Marks_Two: Number,
    Obtained_Marks_Two: Number,

    // Subject Three
    Subject_Three: String,
    Subject_Code_Three: String,
    Maximum_Marks_Three: Number,
    Minimum_Pass_Marks_Three: Number,
    Obtained_Marks_Three: Number,

    // Subject Four
    Subject_Four: String,
    Subject_Code_Four: String,
    Maximum_Marks_Four: Number,
    Minimum_Pass_Marks_Four: Number,
    Obtained_Marks_Four: Number,

    // Subject Five
    Subject_Five: String,
    Subject_Code_Five: String,
    Maximum_Marks_Five: Number,
    Minimum_Pass_Marks_Five: Number,
    Obtained_Marks_Five: Number,

    // Subject Six
    Subject_Six: String,
    Subject_Code_Six: String,
    Maximum_Marks_Six: Number,
    Minimum_Pass_Marks_Six: Number,
    Obtained_Marks_Six: Number,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
