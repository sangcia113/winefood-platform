const { encodePassword, decodePassword } = require('../utils/handleHashPassword');
const {
    messageApprove,
    messageApproveLeaveDay,
    messageApproveLeaveType,
    messageReject,
    messageRequestCancel,
    messageRequestEdit,
    messageRequestLeave,
} = require('../utils/handleZaloMessage');

module.exports = {
    encodePassword,
    decodePassword,
    messageApprove,
    messageApproveLeaveDay,
    messageApproveLeaveType,
    messageReject,
    messageRequestCancel,
    messageRequestEdit,
    messageRequestLeave,
};
