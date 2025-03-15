const fromText = document.querySelector('#fromText');
const toText = document.querySelector('#toText');
const langOption = document.querySelectorAll('select');

if (typeof language !== 'undefined') {
    langOption.forEach((get, con) => {
        for (let countryCode in language) {
            let selected = '';
            if (con === 0 && countryCode === "en-GB") {
                selected = 'selected';
            } else if (con === 1 && countryCode === "hi-IN") {
                selected = 'selected';
            }
            let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
            get.insertAdjacentHTML('beforeend', option);
        }
    });
}

function getVoiceByLang(lang) {
    const voices = speechSynthesis.getVoices();
    return voices.find(voice => voice.lang === lang) || null;
}

fromText.addEventListener('input', translateText);
langOption[1].addEventListener('change', translateText); // Re-translate when "To Language" changes

function translateText() {
    let content = fromText.value;
    let fromContent = langOption[0].value;
    let transContent = langOption[1].value;

    if (!content.trim()) {
        toText.value = "";
        return;
    }

    let transLink = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(content)}&langpair=${fromContent}|${transContent}`;

    fetch(transLink)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText || "Translation unavailable";
        })
        .catch(error => console.error("Unable to Fetch data.", error));
}



// -----------------------------------Copy Text Section-------------------------------------------------------------
document.querySelector('.transfer').addEventListener('click', () => {
    [fromText.value, toText.value] = [toText.value, fromText.value];
    [langOption[0].value, langOption[1].value] = [langOption[1].value, langOption[0].value];
});

document.querySelector('.copy_text').addEventListener('click', () => {
    if (toText.value.trim()) {
        navigator.clipboard.writeText(toText.value);
    }
});


// ----------------------------------Speech Recognized ---------------------------------------------------------------
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    let recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    function updateRecognitionLang() {
        recognition.lang = langOption[0].value;
    }

    langOption[0].addEventListener('change', () => {
        updateRecognitionLang();
        recognition.abort(); // Reset recognition to apply new language
    });

    document.querySelector('.listen').addEventListener('click', () => {
        updateRecognitionLang(); // Ensure the latest selected language is used
        fromText.placeholder = 'Listening ...';
        fromText.value = '';
        recognition.start();
    });

    recognition.onresult = (event) => {
        fromText.value = event.results[0][0].transcript;
        fromText.placeholder = 'Enter Text';

        // Trigger translation automatically after speech recognition
        fromText.dispatchEvent(new Event('input'));
    };

    recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        fromText.placeholder = 'Enter Text';
    };

    updateRecognitionLang();
} else {
    console.log("Speech Recognition not supported in this browser.");
}

// --------------------------------------------- Speech ---------------------------------------------------------------

        //--------------flash message-------------------------------
function showFlashMessage(message, type = "error") {
    let flashMessage = document.createElement("div");
    flashMessage.textContent = message;
    flashMessage.style.position = "fixed";
    flashMessage.style.top = "20px";
    flashMessage.style.left = "50%";
    flashMessage.style.transform = "translateX(-50%)";
    flashMessage.style.padding = "10px 20px";
    flashMessage.style.borderRadius = "5px";
    flashMessage.style.background = type === "error" ? "#ff4d4d" : "#4CAF50";
    flashMessage.style.color = "#fff";
    flashMessage.style.fontSize = "16px";
    flashMessage.style.zIndex = "1000";
    document.body.appendChild(flashMessage);

    setTimeout(() => {
        flashMessage.remove();
    }, 3000);
}
         //-------------------------End flash ----------------------------


document.querySelector('.speak').addEventListener('click', () => {
    if (!fromText.value.trim()) return;

    let speech = new SpeechSynthesisUtterance(fromText.value);
    let voice = getVoiceByLang(langOption[0].value);
    
    if (voice) {
        speech.voice = voice;
    } else {
        showFlashMessage("Selected language not supported for speech.");
        return;
    }

    speech.lang = langOption[0].value;
    speechSynthesis.speak(speech);
});

document.querySelector('.tospeak').addEventListener('click', () => {
    if (!toText.value.trim()) return;

    let speech = new SpeechSynthesisUtterance(toText.value);
    let voice = getVoiceByLang(langOption[1].value);
    
    if (voice) {
        speech.voice = voice;
    } else {
        showFlashMessage("Selected language not supported for speech.");
        return;
    }

    speech.lang = langOption[1].value;
    speechSynthesis.speak(speech);
});

// Ensure voices are loaded before using speech synthesis
speechSynthesis.onvoiceschanged = () => {
    getVoiceByLang(langOption[0].value);
    getVoiceByLang(langOption[1].value);
};
