const express = require('express');

const router = express.Router();

const {
    iReporterBOD,
    iReporterQLSXManager,
    iReporterHCTHManager,
    iReporterChief,
    iReporterQCLeader,
    iReporterBOTLeader,
    iReporterSHILeader,
    iReporterQCMember,
    iReporterITMember,
} = require('../controllers/webhookController');

// Middleware để xử lý dữ liệu URL-encoded
router.use(express.urlencoded({ extended: true }));

// End point POST for iReporter
router.post('/ireporter/bod', iReporterBOD);

// End point POST for iReporter
router.post('/ireporter/hcth/manager', iReporterHCTHManager);

// End point POST for iReporter
router.post('/ireporter/qlsx/manager', iReporterQLSXManager);

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
