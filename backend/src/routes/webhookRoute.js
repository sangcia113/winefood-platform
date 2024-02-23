const router = require('express').Router();

const {
    iReporterBOD,
    iReporterManager,
    iReporterChief,
    iReporterQCLeader,
    iReporterBOTLeader,
    iReporterSHILeader,
    iReporterQCMember,
    iReporterITMember,
} = require('../controllers/webhookController');

// End point POST for iReporter
router.post('/ireporter/bod', iReporterBOD);

// End point POST for iReporter
router.post('/ireporter/manager', iReporterManager);

// End point POST for iReporter
router.post('/ireporter/chief', iReporterChief);

// End point POST for iReporter
router.post('/ireporter/qc/leader', iReporterQCLeader);

// End point POST for iReporter
router.post('/ireporter/qc/member', iReporterQCMember);

// End point POST for iReporter
router.post('/ireporter/bot/leader', iReporterBOTLeader);

// End point POST for iReporter
router.post('/ireporter/shi/leader', iReporterSHILeader);

// End point POST for iReporter
router.post('/ireporter/it/member', iReporterITMember);

module.exports = router;
