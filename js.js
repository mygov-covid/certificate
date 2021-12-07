function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function regenerateId() {
	localStorage.setItem('random_ihi','')
	localStorage.setItem('doc_number','')
	localStorage.setItem('valid_from','')
	localStorage.setItem('date-received','')
	generateId()
}

function generateId() {
	// 16 Digit healthcare
	var random_ihi = window.localStorage.getItem('random_ihi')
	if (random_ihi == null || random_ihi == '') { 
		var random_ihi = (((Math.random() * 1e+16).toString()).replace(/(.{4})/g,"$1 ")).substring(0,20) 
		window.localStorage.setItem('random_ihi',random_ihi)
	}
    $('#individual_healthcare')[0].text = window.localStorage.getItem('random_ihi')

	
	// 12 Digit document number
	var doc_number = window.localStorage.getItem('doc_number')
	if (doc_number == null || doc_number == '') { 
		var doc_number = (((Math.random() * 1e+12).toString()).replace(/(.{4})/g,"$1 ")).substring(0,14)
		window.localStorage.setItem('doc_number',doc_number)
	}
    $('#document_number')[0].text = doc_number


	// Full name (First name, middle name 1st letter, last name)
	var full_name = window.localStorage.getItem('fullname')
	if (full_name == null || full_name == '') { 
		var full_name = 'FIRST_NAME M LAST_NAME'
		window.localStorage.setItem('fullname',full_name)
	}
    $('#fullname')[0].text = window.localStorage.getItem('fullname')


	var options = {month: 'short', day: 'numeric' ,year:'numeric'};
	var date_of_birth
	if (window.localStorage.getItem('date_of_birth') === null || window.localStorage.getItem('date_of_birth') === '') {
		date_of_birth = randomDate(new Date(2002, 0, 1), new Date(2005, 0, 1)).toLocaleString('en-AU',options)
		window.localStorage.setItem('date_of_birth',date_of_birth)
	} else {
		date_of_birth = window.localStorage.getItem('date_of_birth')
	}
	$('#dob')[0].text = date_of_birth.toLocaleString('en-AU',options)

	var valid_from
	if (window.localStorage.getItem('valid_from') === null || window.localStorage.getItem('valid_from') === '') {
		valid_from = randomDate(new Date(2021, 10, 1), new Date(2021, 10, 31)).toLocaleString('en-AU',options)
		window.localStorage.setItem('valid_from',valid_from)
	} else {
		valid_from = window.localStorage.getItem('valid_from')
	}
	$('#valid_from')[0].text = valid_from

	var date_received
	if (window.localStorage.getItem('date-received') === null || window.localStorage.getItem('date-received') === '') {
		var last_dose = parseInt(window.localStorage.getItem('valid_from').split(' ')[0])
		console.log(last_dose)
		date_received = randomDate(new Date(2021, 9, 20 - last_dose), new Date(2021, 9, 25 - last_dose)).toLocaleString('en-AU',options)
		window.localStorage.setItem('date-received',date_received)
	} else {
		date_received = window.localStorage.getItem('date-received')
	}
	$('#date-received')[0].text = date_received + ', ' + valid_from

}


window.addEventListener('DOMContentLoaded', (event) => {
	generateId()
	console.log($('#main-info')[0].offsetHeight)
	$('#background')[0].style.top = $('#main-info')[0].offsetHeight + 30 + 'px'

	$('#dob')[0].addEventListener('input', (input) => {
		var title = $('#title_dob')[0]
		var target = input.target
		console.log(target.text.split(' ').length)
		if (target.text.split(' ').length < 3 || target.text.split(' ')[1].length > 4) {
			title.text = 'INCORRECT FORMAT (DayNumber AbbreviatedMonth Year)'
			target.classList.add('incorrect-format')
		} else {
			title.text = 'Date of birth'
			target.classList.remove('incorrect-format')
		}

		window.localStorage.setItem('date_of_birth',target.text)
	})

	$('#fullname')[0].addEventListener('input', (input) => {
		var title = $('#title_name')[0]
		var target = input.target
		console.log(target.text.split(' ').length)
		if (target.text.split(' ').length < 2) {
			title.text = 'INCORRECT FORMAT (FIRST_NAME LAST_NAME)'
			target.classList.add('incorrect-format')
		} else {
			title.text = 'Name'
			target.classList.remove('incorrect-format')
		}

		
		window.localStorage.setItem('fullname',$('#fullname')[0].text.toUpperCase())
	})

});

window.addEventListener('resize', (event) => {
	$('#background')[0].style.top = $('#main-info')[0].offsetHeight + 30 + 'px'
});