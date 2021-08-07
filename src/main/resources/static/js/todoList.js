$(document).ready(() => {
    let getTodoListTotalCount = (date) => {
        $.ajax('/todoList/count', {
            method: 'GET',
            data: {inquireBaseDate: date}
        }).done((res) => {
            $('#todoList').attr('start', 1);
            $('#todoList').attr('current', 1);
            $('#todoList').attr('end', Math.ceil(res.result / 5));
            $('#prevButton').hide()
            $('#nextButton').show()
            getTodoList(date, 1);
        });
    }

    let getTodoList = (date, page) => {
        $('#prevButton').show();
        $('#nextButton').show();

        if (page === 1) {
            $('#prevButton').hide();
        }

        if (page == $('#todoList').attr('end')) {
            $('#nextButton').hide();
        }

        $('#todoList').attr('current', page);

        $.ajax('/todoList/list', {
            method: 'GET',
            data: {page: page, inquireBaseDate: date}
        }).done((res) => {
            $('#todoList').empty()
            res.result.forEach((data) => {
                $('#todoList').append(makeTodoTemplate(data))
            })
        });
    }

    let makeTodoTemplate = (data) => {
        let diffDate = data.dayDiff < 0 ? '기간지남' : `D-<b>${data.dayDiff}</b>`;
        return `<li> 
                    <div class="content">
                        <span class="dday">${diffDate}</span> 
                        <p class="title">${data.task}</p>
                        <button class="delect">삭제</button>
                    </div>
                </li>`;
    }


    document.getElementById('now_date').valueAsDate = new Date();

    $('.plus').click(function () {
        let today = new Date();
        $('#now_date').attr('min', today.toISOString().split('T')[0]);

        $("section").addClass("popupDown");
        $("section").removeClass("popupUp");
        $(".plus").addClass("hide");
        $(".cancel").addClass("show");
    });

    $(".cancel").click(function () {
            $("section").toggleClass("popupDown");
            $("section").toggleClass("popupUp");
            $(".plus").removeClass("hide");
            $(".cancel").removeClass("show");
        }
    );

    // 특정 날을 달력에서 클릭하면 다른 날 클릭 비활성화
    $(".calendar-body tr td").click(function () {
            if ($(this).text().length === 0) {
                return;
            }
            $(this).addClass("dayClick");
            $(this).siblings().removeClass("dayClick");
            $(this).parent().siblings().children().removeClass("dayClick");

            let clickedDate = $('#current-year-month').text() + '-' + $('.dayClick').text().padStart(2, 0);

            getTodoListTotalCount(clickedDate);
        }
    );

    let checkDate = (target) => {     //날짜가 올바른지 최종 체크
        let today = new Date();

        return today <= target
    }

    $('#prevButton').click(() => {
        let currentPage = $('#todoList').attr('current') * 1;
        let clickedDate = $('#current-year-month').text() + '-' + $('.dayClick').text().padStart(2, 0);

        getTodoList(clickedDate, currentPage - 1);
    });

    $('#nextButton').click(() => {
        let currentPage = $('#todoList').attr('current') * 1;
        let clickedDate = $('#current-year-month').text() + '-' + $('.dayClick').text().padStart(2, 0);

        getTodoList(clickedDate, currentPage + 1);
    });

    $('.submit').click((event) => {
        event.preventDefault();

        let task = $('#todoMemo').val();
        let date = new Date($('#now_date').val());

        if (task === undefined || task.length === 0) {
            alert('할일을 입력해주세요!');
            return;
        }

        if (!checkDate(date)) {
            alert('현재 날짜보다 빠릅니다');
            return;
        }

        let token = $("meta[name='_csrf']").attr("content");
        let header = $("meta[name='_csrf_header']").attr("content");

        let sendData = {task: task, endDate: date.toISOString().split('T')[0]};
        $.ajax('/todoList/add', {
            method: 'PUT',
            data: sendData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token);
            },
        }).done((res) => {
            if (res.result) {
                alert('등록되었습니다');

                $('#todoMemo').val('');
                $('#now_date').valueAsDate = new Date();
                $('.cancel').click();
            } else {
                alert('등록에 실패했습니다.');
            }
        }).fail(() => {
            alert('통신에 오류가 발생했습니다.');
        });
    });
});