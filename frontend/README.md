### FLOW LEAVE REQUEST

-> Employee gửi phép -> Leader

-> Leader phê duyệt -> Manager

        -> Manager phê duyệt -> Employee

        -> Manager từ chối -> Employee

-> Leader từ chối - > Employee

### FLOW CANCEL LEAVE REQUEST

-> Employee gửi yêu cầu -> Manager

\*\*\* Condition:

-   deleteRequest === null || managerApprovedDelete === 1

### FLOW LEADER APPROVAL LEAVE REQUEST

-> Employee gửi phép -> Leader

\*\*\* Condition:

-   leaderApproved !== 1

### FLOW LEADER NOT APPROVAL LEAVE REQUEST

-> Employee gửi phép -> Leader

\*\*\* Condition:

-   leaderApproved !== 0 && managerApproved !== 1

-   leaderApproved !== 0 && managerApproved !== 0

### FLOW MANAGER APPROVAL LEAVE REQUEST

-> Employee gửi phép -> Manager

\*\*\* Condition:

-   managerApproved !== 1

### FLOW MANAGER NOT APPROVAL LEAVE REQUEST

-> Employee gửi phép -> Manager

\*\*\* Condition:

-   managerApproved !== 0

### FLOW MANAGER APPROVAL LEAVE TYPE

-> Employee gửi yêu cầu -> Manager

\*\*\* Condition:

-   managerApproved === 1 && managerApprovedLeaveType !== 1

### FLOW MANAGER APPROVAL LEAVE DAY

-> Employee gửi yêu cầu -> Manager

\*\*\* Condition:

-   managerApproved === 1 && managerApprovedLeaveDay !== 1
