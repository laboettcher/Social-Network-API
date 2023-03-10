// Create date suffix function
const addDateSuffix = date => {
    let dateStr = date.toString();

    // Need last character of the date string to add suffix
    const lastChar = dateStr.charAt(dateStr.length -1);

    // If statement for firST, secoND, thiRD, etc.
    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    return dateStr;
};

module.exports = (
    // Create function for formatting timestamp
    timeStamp,
    { monthLength = 'short', dateSuffix = true } = {}
) => {
    let months;

    // Abbreviated month vs. full month name
    if (monthLength === 'short') {
        months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        };
    } else {
        months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        };
    }

    // Create date constructor to return current month
    const dateObj = new Date(timeStamp);
    const formattedMonth = months[dateObj.getMonth()];

    // Get and add current day of the month
    let dayOfMonth;

    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
        dayOfMonth = dateObj.getDate();
    }

    // Get and add present year
    const year = dateObj.getFullYear();

    // Get and add time of the day (hour and minutes)
    let hour;

    if (dateObj.getHours > 12) {
        hour = Math.floor(dateObj.getHours() / 2);
    } else {
        hour = dateObj.getHours();
    }

    if (hour === 0) {
        hour = 12;
    }

    const minutes = dateObj.getMinutes();

    // Add Am or PM based on hour of the day
    let periodOfDay;

    if (dateObj.getHours() >= 12) {
        periodOfDay = 'PM';
    } else {
        periodOfDay = 'AM';
    }

    // Format month, day, year, hour + minutes, and AM/PM together
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    // Return formatted date and time
    return formattedTimeStamp;
};