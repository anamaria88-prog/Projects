const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const words = ['banana', 'portocala', 'medicament', 'apa', 'vara', 'ghiocel', 
				'randunica', 'ana', 'marius', 'maria'];
const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

let placeholder = generatePlaceholder(randomWord);

const $section = $('.main');

let tries = 6;


$('.main').on('click', '.item', function(){

	if ($(this).attr('data-checked') === 'true') {
		return false;
	}

	const letter = $(this).attr('data-value');

	checkLetter(letter, this);

	$(this).attr('data-checked', true);

})


letters.forEach(function(letter) {

	const $span = $('<button />', {
		'html': letter,
		'class': 'item',
		'data-value': letter.toUpperCase()
	})

	$section.append($span);
})

function checkLetter(letter, element) {

	let matchFound = false;
	const userWinnerLetter = [];
	if (randomWord.includes(letter)) {
		
		$(element).addClass('goodLetter');
		const indexes = findAllIndexes(randomWord, letter);
		
		placeholder = placeholder.split('');

		indexes.forEach(index => {

			placeholder[index] = letter;
			
		})
	
		placeholder = placeholder.join('');

		$('.placeholder').text(placeholder);
	
		matchFound = true;
	

	} else {

		$(element).addClass('wrongLetter');

		tries--;

 		if (tries === 5) {
 			$('.triesLeft').css('color', 'green');
 			$('.triesLeft').text('5 lives');
 		}

 		if (tries === 4)  {
 			$('.triesLeft').css('color', 'orange');
 			$('.triesLeft').text('4 lives');
 		}

 		if (tries === 3) {
 			$('.triesLeft').css('color', 'orange');
 			$('.triesLeft').text('3 lives');
 		}

 		if (tries === 2 )  {
 			$('.triesLeft').css('color', 'red');
 			$('.triesLeft').text('2 lives');
 			
 		}

 		if (tries === 1) {
 			$('.triesLeft').css('color', 'red');
 			$('.triesLeft').text('1 lives');
 		}

 		if (tries === 0 ) {
 			generatePopover('<strong> YOU  &nbsp  LOSE ! </strong>');
 		}
	}


	$('.placeholder').each(function() { 
		if(placeholder === randomWord) {
			generatePopover('<strong> YOU  &nbsp  WIN ! </strong>');
		}
	})
	
}

function generatePlaceholder(word) {

	let placeholder = "";

	for (let i = 0 ; i < word.length; i++) {
		placeholder = placeholder + '_';
	}
	$('.placeholder').text(placeholder);

	return placeholder;
}

function findAllIndexes(str, letter) {
	let indexes = [];

	for (let i = 0 ; i < str.length; i++) {
        if (str[i] === letter) 
     	   indexes.push(i);
     }
    return indexes;
}

function generatePopover(text) {

	const $cover = $('<div />', {
		class: 'cover',
	})

	const $popoverItem = $('<div />', {
		html: '<p>' + text + '</p>',
		class: 'popover-item',
	})

	const $replayBtn = $('<div />', {
		text: 'Play again',
		class: 'replay',
	})

	$popoverItem.append($replayBtn);

	$cover.append($popoverItem);

	$replayBtn.click(function() {
		closePopover();
		location.reload();
	})


	$('body').append($cover);
 }
 


function closePopover() {
	$('.cover').remove();
}