const express = require('express');
const multer = require('multer');
const Admission = require('../models/Admission');
const router = express.Router();

// Setup storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Dynamic import for nanoid in an async function
async function getCustomAlphabet() {
    const { customAlphabet } = await import('nanoid');
    return customAlphabet;
}

router.post('/onlineAdmission', upload.fields([
    { name: 'studentImage', maxCount: 1 },
    { name: 'studentSignature', maxCount: 1 },
    { name: 'document', maxCount: 1 }
]), async (req, res) => {
    try {
        const customAlphabet = await getCustomAlphabet(); // Import inside async function
        const generateAckNumber = customAlphabet('1234567890', 6);
        
        // Generate a unique acknowledgment number with "sgv" prefix
        const newAckNumber = `sgv${generateAckNumber()}`;

        const {
            subject, studentName, fatherName, motherName, DOB, category, gender,
            mobileNumber, email, address, pinCode, state, adhaar, qualification,
            collageCode, studyMode, examMode
        } = req.body;

        const newAdmission = new Admission({
            acknowledgmentNumber: newAckNumber, // Save the generated acknowledgment number
            subject, studentName, fatherName, motherName, DOB, category, gender,
            mobileNumber, email, address, pinCode, state, adhaar, qualification,
            collageCode, studyMode, examMode,
            studentImage: req.files.studentImage[0].path,
            studentSignature: req.files.studentSignature[0].path,
            document: req.files.document[0].path
        });

        const savedAdmission = await newAdmission.save();
        res.status(201).json(savedAdmission);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET route to fetch all admissions
router.get('/admissions', async (req, res) => {
    try {
        // Fetch admissions and exclude the `__v` field
        const admissions = await Admission.find({}, '-__v');
        res.status(200).json(admissions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// GET route to fetch a specific admission by ID
router.get('/admission/:id', async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);
        if (!admission) {
            return res.status(404).json({ msg: 'Admission not found' });
        }
        res.json(admission);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
