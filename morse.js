//morsecode
/*
If the duration of a dot is taken to be one unit then that of a dash is three units. 
The space between the components of one character is one unit, between characters is three units 
and between words seven units. To indicate that a mistake has been made and for the receiver 
to delete the last word, send ........ (eight dots).
*/
var morseTable = {
	'a': '.-',
	'b': '-...',
	'c': '-.-.',
	'd': '-..',
	'e': '.',
	'f': '..-.',
	'g': '--.',
	'h': '....',
	'i': '..',
	'j': '.---',
	'k': '-.-',
	'l': '.-..',
	'm': '--',
	'n': '-.',
	'o': '---',
	'p': '.--.',
	'q': '--.-',
	'r': '.-.',
	's': '...',
	't': '-',
	'u': '..-',
	'v': '...-',
	'w': '.--',
	'x': '-..-',
	'y': '-.--',
	'z': '--..'
}

var sp = 1250,   // ms between beeps
	start = 250  // start time in ms
function beep(){
	console.log('\u0007') // rings the terminal bell
}
function morse(str){
	for (i = 0;i<str.length;i++){
		start+=sp
		switch (str[i]){
			case '-':
				setTimeout(beep, start)
				setTimeout(beep, start)
				break;
			case '.':
				setTimeout(beep, start)
				break;
			default:
				//convert char to morse equivalent
				console.log(4)
				str = str.replace(str[i], morseTable[str[i]])
				i-- // reeval the char since it has been changed
				start-=sp // account for lost time
				break;
		}
	}
}
morse(process.argv[2] || 'trolled mate')