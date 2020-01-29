    var dayList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var leapYear=[31,29,31,30,31,30,31,31,30,31,30,31];
    var notLeapYear=[31,28,31,30,31,30,31,31,30,31,30,31];
    
    var today = new Date();
    var first = new Date(today.getFullYear(), today.getMonth(),1);
    let numbers=[];

$(document).ready(()=>{
    let monthField = $('#current-year-month');
    let year=0;
    let currentMonth=0;
    let firstDay=0;       //오늘의 첫 날(요일)
    
    let objects = $('.col1').children();
    for(let i=0;i<objects.length;++i)
        numbers.push(objects[i]);
    objects = $('.col2').children();
    for(let i=0;i<objects.length;++i)
        numbers.push(objects[i]);
    objects = $('.col3').children();
    for(let i=0;i<objects.length;++i)
        numbers.push(objects[i]);
    objects = $('.col4').children();
    for(let i=0;i<objects.length;++i)
        numbers.push(objects[i]);
    objects = $('.col5').children();
    for(let i=0;i<objects.length;++i)
        numbers.push(objects[i]);
    objects = $('.col6').children();
    for(let i=0;i<objects.length;++i)
        numbers.push(objects[i]);

    let clearCalander=()=>{
        for(let i=0;i<numbers.length;++i)
            $(numbers[i]).text('');
    }

    let GetGregoriusConvert = (year,month)=>{
        
        if(year < 1582) {//prev gregorius
            return year%4===0 ? leapYear[month] : notLeapYear[month];
        }else{
            return ((year%4 === 0 && year%100 !== 0) || year%400 === 0 ) ? leapYear[month] : notLeapYear[month];
        }
    }

    let makeToDaysCalander = ()=>{
        clearCalander();
        let date = new Date();
        currentMonth = date.getMonth();
        year = date.getFullYear();
        $(monthField).text(year+ "-" +(currentMonth + 1));
        firstDay = ((date.getDay() + 7) - (date.getDate()%7) + 1) % 7;

        let printLength = GetGregoriusConvert(year,currentMonth);  //한달에 며칠인가?
        for(let i=firstDay;i<firstDay+printLength;++i){
            $(numbers[i]).text(i - firstDay + 1);
        }
    }

    let next = ()=>{
        clearCalander();
        firstDay = (firstDay + notLeapYear[currentMonth])%7;

        if(currentMonth === 11){
            year += 1;
        }

        currentMonth = currentMonth + 1 > 11 ? 0 :  currentMonth + 1;
        $(monthField).text(year+ "-" +(currentMonth + 1));
        
        let printLength = GetGregoriusConvert(year,currentMonth);  //한달에 며칠인가?
        for(let i = firstDay;i < firstDay+printLength;++i){
            $(numbers[i]).text(i - firstDay + 1);
        }
    }

    let prev = ()=>{
        clearCalander();
        
        if(currentMonth === 0){
            year -= 1;
        }

        currentMonth =  currentMonth - 1 < 0 ? 11 : currentMonth - 1;
        $(monthField).text(year+ "-" +(currentMonth + 1));
        firstDay = (firstDay - (notLeapYear[currentMonth] % 7) + 7) % 7;

        let printLength = GetGregoriusConvert(year,currentMonth);  //한달에 며칠인가?
        for(let i=firstDay;i<firstDay+printLength;++i){
            $(numbers[i]).text(i - firstDay + 1);
        }
    }
    
    $('#next').on('click',next);
    $('#prev').on('click',prev);
    
    
    makeToDaysCalander();
});