let fillZero = (origin, count) => {
	let retval = '';
	for (let i = 0; i < count - origin.length; ++i)
		retval += '0'

	return retval + origin;
}

let checkDate = (target) => {     //날짜가 올바른지 최종 체크
	let year = target.getFullYear().toString();
	let month = (target.getMonth() + 1).toString();
	let day = target.getDate().toString();

	let today = new Date();
	let currentYear = today.getFullYear().toString();
	let currentMonth = (today.getMonth() + 1).toString();
	let currentDay = today.getDate().toString();
	return year + month + day >= currentYear + currentMonth + currentDay;
}


$(document).ready(() => {

	$('.plus').click(() => {     //현재보다 이전날짜 방지
		let today = new Date();
		$('#now_date').attr('min', today.getFullYear() + '-' + fillZero((today.getMonth() + 1).toString(), 2) + '-' + fillZero((today.getDate()).toString(), 2));
	})

	$('.submit').click(() => {
		let memo = $('#todoMemo').val();
		let date = new Date($('#now_date').val());

		if (memo === undefined) {
			alert('할일을 입력해주세요!');
			return;
		}

		if (!checkDate(date)) {
			alert('현재 날짜보다 빠릅니다');
			return;
		}

		let sendData = {memo, date};
		$.post('common/addRequest', sendData, (result) => {
			if (result.message === 'unAutherized') {
				alert('로그인 하세요');
				location.href = '/';
			} else {
				alert('등록되었습니다');
			}
		})

		//Clear Inputs;
		$('#todoMemo').val('');
		$('#now_date')[0].valueAsDate = new Date();
		$('.cancel').click();
	})
});