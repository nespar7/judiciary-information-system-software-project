const router = require('express').Router();
const Case = require('../models/Case');

// create case
router.post('/', async (req, res) => {
    const newCase = new Case(req.body);

    try {
        const savedCase = await newCase.save();
        res.status(200).json(savedCase);
    } catch (error) {
        res.status(500).send(error);
    }
})

// update case
router.put('/:id', async (req, res) => {
    try {
        const currentCase = await Case.findById(req.params.id);

        await currentCase.updateOne({ $set: req.body });
        return res.status(200).json("Updated post")
    }
    catch (error) {
        return res.status(500).json(error);
    }
})

// get case by id
router.get('/:id', async (req, res) => {
    try {
        const currentCase = await Case.findById(req.params.id)
        res.status(200).json(currentCase);
    } catch (error) {
        res.status(500).json(Case);
    }
})

// get all cases by defName/officerName/judgeName/lawyerName
router.get('/', async (req, res) => {
    const defName = req.query.defName;
    const defAddr = req.query.defAddr;
    const crimeType = req.query.crimeType;
    const crimeLoc = req.query.crimeLoc;
    const officerName = req.query.officerName;
    const status = req.query.status;
    const judgeName = req.query.judgeName;
    const lawyerName = req.query.lawyerName;

    try {
        const casesByDefName = await Case.find({ defName: defName });
        const casesByDefAddr = await Case.find({ defAddr: defAddr });
        const casesByType = await Case.find({ crimeType: crimeType });
        const casesByLoc = await Case.find({ crimeLoc: crimeLoc });
        const casesByOfficerName = await Case.find({ officerName: officerName });
        const casesByStatus = await Case.find({ status: status });
        const casesByJudgeName = await Case.find({ judgeName: judgeName });
        const casesByLawyerName = await Case.find({ lawyerName: lawyerName });
        
        const result = casesByDefName.concat(casesByDefAddr, casesByType, casesByLoc, casesByOfficerName, casesByStatus, casesByJudgeName, casesByLawyerName);

        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
})

module.exports = router;