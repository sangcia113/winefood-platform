const { encodePassword, decodePassword } = require('../utils/handleHashPassword');
const {
    messageApproveCancelLeave,
    messageApproveLeaveDay,
    messageApproveLeaveType,
    messageLeaderAproval,
    messageLeaderReject,
    messageManagerApproval,
    messageManagerReject,
    messageRequestCancel,
    messageRequestEdit,
    messageRequestLeave,
    messageWebhookIReporter,
} = require('../utils/handleZaloMessage');

module.exports = {
    encodePassword,
    decodePassword,
    messageApproveCancelLeave,
    messageApproveLeaveDay,
    messageApproveLeaveType,
    messageLeaderAproval,
    messageLeaderReject,
    messageManagerApproval,
    messageManagerReject,
    messageRequestCancel,
    messageRequestEdit,
    messageRequestLeave,
    messageWebhookIReporter,
};
