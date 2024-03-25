function calculateDaysBetweenDates(begin, end) {
    const beginDate = new Date(begin);
    const endDate = new Date(end);
    const timeDiff = endDate - beginDate;
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    // //test
    // console.log(calculateDaysBetweenDates('2021-01-01', '2021-01-10')); // 9
    // console.log(calculateDaysBetweenDates('2021-01-01', '2021-01-01')); // 0