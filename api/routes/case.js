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
        res.status(500).json(error);
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
    console.log(defName);

    const defNameRegex = new RegExp(defName, 'i');
    const defAddrRegex = new RegExp(defAddr, 'i');
    const crimeTypeRegex = new RegExp(crimeType, 'i');
    const crimeLocRegex = new RegExp(crimeLoc, 'i');
    const officerNameRegex = new RegExp(officerName, 'i');
    const statusRegex = new RegExp(status, 'i');
    const judgeNameRegex = new RegExp(judgeName, 'i');
    const lawyerNameRegex = new RegExp(lawyerName, 'i');

    try {
        const casesByDefName = !defName ? [] : await Case.find({ defName: {$regex: defNameRegex} });
        const casesByDefAddr = !defAddr ? [] : await Case.find({ defAddr: {$regex: defAddrRegex} });
        const casesByType = !crimeType ? [] : await Case.find({ crimeType: {$regex: crimeTypeRegex} });
        const casesByLoc = !crimeLoc ? [] : await Case.find({ crimeLoc: {$regex: crimeLocRegex} });
        const casesByOfficerName = !officerName ? [] : await Case.find({ officerName: {$regex: officerNameRegex} });
        const casesByStatus = !status ? [] : await Case.find({ status: {$regex: statusRegex} });
        const casesByJudgeName = !judgeName ? [] : await Case.find({ judgeName: {$regex: judgeNameRegex} });
        const casesByLawyerName = !lawyerName ? [] : await Case.find({ lawyerName: {$regex: lawyerNameRegex} });
        
        const result = casesByDefName.concat(casesByDefAddr, casesByType, casesByLoc, casesByOfficerName, casesByStatus, casesByJudgeName, casesByLawyerName);

        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
})

module.exports = router;