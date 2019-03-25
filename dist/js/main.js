//init speech
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Init voices array
let voices = [];


const getVoices = () => {
    voices = synth.getVoices();
    
    voices.forEach(voice => {
        // create option elem
        const option = document.createElement('option');
        //Fill the option with voice
        option.textContent = voice.name + '(' + voice.lang + ')';

        //set needed option attrib
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);

        voiceSelect.appendChild(option);
    })

}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}


// Speak
const speak = () => {
    


    //check if speaking
    if(synth.speaking){
        console.error('Already speaking..');
        return;
    }
    if(textInput.value !== ''){
        //Add background anim
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        // Get speal text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //Speak end
        speakText.onend = e => {
            console.log('Done speaking');
            body.style.background = '#141414';
        }
        // error
        speakText.onerror = e => {
            console.error('Something wrong');

        }
        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name');

        // loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });
        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // Speak
        synth.speak(speakText);


    }

}

// Event listeners
// form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// Voice select

voiceSelect.addEventListener('change', e => speak());


