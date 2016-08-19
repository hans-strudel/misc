var buffer = '',
    focused = ''

	
function init(){
    console.log('AutoMeme loaded')

    window.onkeydown = function(e){
        if (e.keyCode === 8){ //backspace
            buffer = buffer.substring(0, buffer.length - 1)
        }
    }
    window.onkeypress = function(e){
        console.log(e, String.fromCharCode(e.charCode))
        if ((e.charCode === 32 || e.charCode === 13) && buffer.length > 0) { // space pressed & buffer has txt
            focused = document.activeElement
            conv(buffer)
            buffer = '' // reset the buffer
        } else {
            buffer += String.fromCharCode(e.charCode)
        }
    }
}

function conv(word){
    nWord = word
    oldLen = word.length

    // general rules
    if (word.substring(0,1) === 'm'){ // first letter == m
        nWord = 'meme'
    }
    if (word.substring(0,1) === 'c'){ // first letter == m
        nWord = 'cream'
    }
    if (word !== nWord && word.substr(word.length-1,1) === 's'){ 
        /*
        I use String.substr() over String.substring() simply because that is whay I am used to. My first real experience with 
        programming/scripting was on the TI-83/TI-84 calculators in my Sophmore calculus class. I spent the entire year
        teaching myself TI-BASIC, learning the ins and outs, I even contributed to the large community revolving around
        the calculator. One of my most memorable endeavors was creating a lookup for elements in the periodic table, put in
        the abbreviation, i.e. He, Na, Mg, etc. and it would return loads of info on the element. Since I wasn't able to read/write
        files on the calculator, I had to store all of the data in strings within the program, and made heavy use of the substr() command.
        TI-BASIC substr() took the starting point, and length as the two parameters, unlike most other languages which take the start point
        and end point. I became so used to it that in every project since I like to use that format, its just the way my brain was trained
        */
        nWord += 's'
    }

    if (word.indexOf('!') > -1){
        for (i=0;i<Math.random()*8;i++){ 
            nWord += ((Math.random()*10 >= 4)?'!':'1') 
        }
    }
    // specifics
    switch (word){
        case 'men':
            nWord = 'memers'
            break;
        case 'great':
            nWord = 'great meme'
            break;
        case 'new':
            nWord = 'fresh'
            break;
        case 'the':
            nWord = (Math.random()*10 >= 5)?'teh':'le'
            break;
    }

    nWord = nWord.replace(/e/gi, function(){return (Math.random()*10 >= 5)?'3':'e'})
    
    if (word !== nWord){ replace(nWord, oldLen)}
}

function replace(nWord, oldLen){
    curr = focused.value
    console.log(curr)
    focused.value = curr.substr(0, curr.length - (oldLen)) + nWord
}
window.addEventListener('load', init, false)