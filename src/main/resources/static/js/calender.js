/*let dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];*/
let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let calendarNumberObjectList = []; //array that save all number object in calendar

$(document).ready(() => {
    let monthField = $('#current-year-month');
    let currentYear = 0;
    let currentMonth = 0;
    let startPos = 0;

    let calendarNumberColumn;
    calendarNumberColumn = $('.col1').children();
    for (let i = 0; i < calendarNumberColumn.length; ++i) {
        calendarNumberObjectList.push(calendarNumberColumn[i]);
    }
    calendarNumberColumn = $('.col2').children();
    for (let i = 0; i < calendarNumberColumn.length; ++i) {
        calendarNumberObjectList.push(calendarNumberColumn[i]);
    }
    calendarNumberColumn = $('.col3').children();
    for (let i = 0; i < calendarNumberColumn.length; ++i) {
        calendarNumberObjectList.push(calendarNumberColumn[i]);
    }
    calendarNumberColumn = $('.col4').children();
    for (let i = 0; i < calendarNumberColumn.length; ++i) {
        calendarNumberObjectList.push(calendarNumberColumn[i]);
    }
    calendarNumberColumn = $('.col5').children();
    for (let i = 0; i < calendarNumberColumn.length; ++i) {
        calendarNumberObjectList.push(calendarNumberColumn[i]);
    }
    calendarNumberColumn = $('.col6').children();
    for (let i = 0; i < calendarNumberColumn.length; ++i) {
        calendarNumberObjectList.push(calendarNumberColumn[i]);
    }

    let initCalendar = () => {
        for (let i = 0; i < calendarNumberObjectList.length; ++i) {
            $(calendarNumberObjectList[i]).text('');
        }
    }

    let getDaysOfYearMonth = (year, month) => {
        if (year < 1582) {	//prev gregorius
            return year % 4 === 0 ? leapYear[month] : notLeapYear[month];
        } else {
            return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? leapYear[month] : notLeapYear[month];
        }
    }

    let convertMonthString = (month) => {
        return "00".substr(0, 2 - String(month).length) + String(month);
    }

    let makeToDaysCalendar = () => {
        initCalendar();
        let todayDate = new Date();
        currentMonth = todayDate.getMonth();
        currentYear = todayDate.getFullYear();
        $(monthField).text(currentYear + "-" + convertMonthString(currentMonth + 1));
        startPos = ((todayDate.getDay() + 7) - (todayDate.getDate() % 7) + 1) % 7;

        let printLength = getDaysOfYearMonth(currentYear, currentMonth);  //한달에 며칠인가?
        for (let i = startPos; i < startPos + printLength; ++i) {
            $(calendarNumberObjectList[i]).text(i - startPos + 1);
        }
    }

    let setNextMonthCalendar = () => {
        initCalendar();
        startPos = (startPos + notLeapYear[currentMonth]) % 7;

        if (currentMonth === 11) {
            currentYear += 1;
        }

        currentMonth = currentMonth + 1 > 11 ? 0 : currentMonth + 1;
        $(monthField).text(currentYear + "-" + convertMonthString(currentMonth + 1));

        let printLength = getDaysOfYearMonth(currentYear, currentMonth);  //한달에 며칠인가?
        for (let i = startPos; i < startPos + printLength; ++i) {
            $(calendarNumberObjectList[i]).text(i - startPos + 1);
        }
    }

    let setPrevMonthCalendar = () => {
        initCalendar();

        if (currentMonth === 0) {
            currentYear -= 1;
        }

        currentMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1;
        $(monthField).text(currentYear + "-" + convertMonthString(currentMonth + 1));
        startPos = (startPos - (notLeapYear[currentMonth] % 7) + 7) % 7;

        let printLength = getDaysOfYearMonth(currentYear, currentMonth);  //한달에 며칠인가?
        for (let i = startPos; i < startPos + printLength; ++i) {
            $(calendarNumberObjectList[i]).text(i - startPos + 1);
        }
    }

    $('#next').on('click', setNextMonthCalendar);
    $('#prev').on('click', setPrevMonthCalendar);


    makeToDaysCalendar();
});