import dayjs from 'dayjs';

const checkDate = (startDate, endDate) => {
    if (dayjs(endDate).isBefore(dayjs(startDate))) return false;

    if (
        startDate.hour() < 7 ||
        (startDate.hour() === 7 && startDate.minute() < 30) ||
        endDate.hour() > 16 ||
        (endDate.hour() === 16 && endDate.minute() > 30)
    )
        return false;

    return true;
};

export default checkDate;
