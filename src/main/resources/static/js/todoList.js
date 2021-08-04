$(document).ready(() => {
    $('.plus').click(() => {
        let today = new Date();
        $('#now_date').attr('min', today.toISOString().split('T')[0]);
    });

    let checkDate = (target) => {     //날짜가 올바른지 최종 체크
        let today = new Date();

        return today <= target
    }

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
        })
    })
});