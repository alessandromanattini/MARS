// Speech to Text module for recognizing words and comparing them with the expected phrases
/**
 * Removes punctuation from a given phrase and returns a lowercase, trimmed string.
 * @param {string} phrase - The input phrase from which punctuation and extra spaces will be removed.
 * @returns {string} - The cleaned and lowercase phrase.
 */
function removePunctuation(phrase) {
    return phrase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!]/g, "").toLowerCase().trim();
}

/**
 * Removes accents from a given phrase using Unicode normalization.
 * @param {string} phrase - The input phrase from which accents will be removed.
 * @returns {string} - The phrase without any accents.
 */
function removeAccents(phrase) {
    return phrase.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Perform speech recognition and compare the recognized words with the expected phrase.
 * This function attempts to align the spoken words with the expected words, identifying
 * extra or missing words and marking them as errors.
 *
 * @param {string} expectedPhrase - The phrase that the user is expected to say.
 * @param {SpeechRecognitionConstructor} SpeechRecognition - The SpeechRecognition constructor.
 * @param {function} callback - A callback function that receives three parameters:
 *                             (success: boolean, transcript: string, wrongWords: string[])
 *                             success: true if no errors, false otherwise
 *                             transcript: the recognized spoken phrase
 *                             wrongWords: an array of words considered incorrect or extra
 */
export function doRecognition(expectedPhrase, SpeechRecognition, callback) {
    if (!SpeechRecognition) {
        console.error("Your browser does not support SpeechRecognition.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'it-IT'; // Set to Italian, adjust as needed
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => console.log("Recognition started");
    recognition.onspeechstart = () => console.log("Speech start");
    recognition.onspeechend = () => console.log("Speech end");
    recognition.onend = () => console.log("Recognition ended");
    recognition.onerror = (e) => console.error("Recognition error:", e)

    // Pre-process the expected phrase by removing punctuation and accents
    const testPhrase = removeAccents(removePunctuation(expectedPhrase));

    recognition.start();
    console.log('Voice recognition in progress...');

    recognition.onresult = (event) => {
        // Get the recognized transcript and remove punctuation
        let transcript = removePunctuation(event.results[0][0].transcript);
        console.log("Expected:", testPhrase);
        console.log("You said:", transcript);

        const expectedWords = testPhrase.split(' ');
        const spokenWords = transcript.split(' ');

        let i = 0; // index for expectedWords
        let j = 0; // index for spokenWords
        let wrongWords = [];

        /**
         * Check if skipping the current spoken word realigns the sequence.
         * This attempts to determine if the current spoken word is an extra word.
         * 
         * @returns {boolean} true if skipping spokenWords[j] aligns with expectedWords[i], false otherwise
         */
        function canRealignIfSkipSpoken() {
            // If by skipping spokenWords[j], spokenWords[j+1] matches expectedWords[i], realignment is possible
            if ((j + 1) < spokenWords.length && spokenWords[j + 1] === expectedWords[i]) {
                return true;
            }
            return false;
        }

        /**
         * Check if skipping the current expected word realigns the sequence.
         * This tries to handle a missing expected word.
         * 
         * @returns {boolean} true if skipping expectedWords[i] aligns with spokenWords[j], false otherwise
         */
        function canRealignIfSkipExpected() {
            // If by skipping expectedWords[i], expectedWords[i+1] matches spokenWords[j], realignment is possible
            if ((i + 1) < expectedWords.length && expectedWords[i + 1] === spokenWords[j]) {
                return true;
            }
            return false;
        }

        // Main loop to align expected and spoken words
        while (i < expectedWords.length && j < spokenWords.length) {
            if (expectedWords[i] === spokenWords[j]) {
                // Words match, move to the next pair
                i++;
                j++;
            } else {
                // Words do not match
                // 1. Try skipping the current spoken word to see if we realign
                if (canRealignIfSkipSpoken()) {
                    // The spokenWords[j] is extra and considered wrong
                    wrongWords.push(spokenWords[j]);
                    j++; // Skip this spoken word and re-check alignment
                } 
                // 2. If skipping the spoken word didn't help, try skipping the expected word
                else if (canRealignIfSkipExpected()) {
                    // The expectedWords[i] was missed and is considered wrong
                    wrongWords.push(expectedWords[i]);
                    i++; // Skip this expected word to realign
                } 
                else {
                    // 3. Neither skipping spoken nor expected word helps in realignment
                    // Treat this as a substitution error: a spoken word replacing an expected word
                    wrongWords.push(spokenWords[j]);
                    i++;
                    j++;
                }
            }
        }

        // If there are leftover expected words, they were never spoken
        while (i < expectedWords.length) {
            wrongWords.push(expectedWords[i]);
            i++;
        }

        // If there are leftover spoken words, they are considered extra
        while (j < spokenWords.length) {
            wrongWords.push(spokenWords[j]);
            j++;
        }

        const success = (wrongWords.length === 0);
        
        // Invoke the callback with the results
        callback(success, transcript, wrongWords);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'network') {
            console.error("Network error: please check your connection or server settings.");
        }
        callback(false, '', []);
    };
}

/*
Example scenario with the phrase:
Expected: "Il gatto con il fiocco è grigio"
Spoken: "il gatto bello con il fiocco e grigio"

Step-by-step:
"il" matches "il"
"gatto" matches "gatto"
"bello" != "con"
    Try skipping "bello" (spoken):
    spoken[j+1] = "con" matches expected[i] = "con"? Yes!
    => "bello" is extra and wrongWords = ["bello"], j++ to align on "con"

Now "con" matches "con"
"il" matches "il"
"fiocco" matches "fiocco"
"e" != "è"
    Skipping "e"? spoken[j+1] = "grigio", expected[i] = "è", no match
    Skipping "è"? expected[i+1] = "grigio", spoken[j]="e", no match
    No realignment possible by skipping either
    => "e" is a substitution for "è" and is wrong. wrongWords.push("e")

Move to next words:
"grigio" matches "grigio"

No leftover expected or spoken words.

Final wrongWords = ["bello", "e"]
*/
