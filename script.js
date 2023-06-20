
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// diasble/enable button
function toggleButton(){
    button.disabled = !button.disabled;
}


// Passing joke text to VoiceRSS API 
function tellJoke(joke){
    VoiceRSS.speech({
        key: 'dce016f2d1a64e88a89101fbe6c0efb4',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });

}

// Get jokes from API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Dark';
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        tellJoke(joke);
        // togle button
        toggleButton();
    } catch (error) {
        console.log('oh shit', error);
    }
}
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);
