import WavEncoder, { encode } from './lib/index.js';
import { setCurrentScreenNP,setId, zeroAudio, firstAudio, secondAudio, startGameAudioNP, ninthAudio, tenthAudio, phrasesnp, crashPlanetButton } from './data.js';
import { state, recordState, gameState, exerciseState, updateState, getState } from './state.js';

import {
    // Variabili globali
    totalScreens,
    backgrounds,
    backgroundsNonWords,
    // Array e DOM references
    screens,
    nextButtons,
    backButtons,
    backHomeButtons,
    playButtons,
    cardButtons,
    skipBtnNiron,
    skipBtnTutorialFirst,
    recT,
    sendT,
    playT,
    playNPT,
    sendNPT,
    startRecButtons,
    sendResultButtons,
    sendResultButtonsNP,
    retryButtons,
    nironPlanetButton,
    menu,
    homeButton,
    dataButton,
    // Audio
    phrasesAudio,
    phrasesAudioRew,
    touchImg,
    startNironGameButton,
    thirdAudio,
    fourthAudio,
    fifthAudio,
    sixthAudio,
    seventhAudio,
    eighthAudio,
    readyAudio,
    exampleAudio,
    thisIsARatAudio,
    yourTurnAudio,
    pressGreenAudio,
    exampleFinishedAudio,
    startGameAudio,
    storyAudioFilesNP
} from './data.js';

/* 
   -------------------------------------------------------------------------------------
   FUNCTIONS 
   -------------------------------------------------------------------------------------
*/

/**
 * Create visible clickable areas on the planet map in screen 6.
 */
export function createVisibleAreas() {
    const map = document.querySelector('map[name="planetMap"]');
    const areas = map.getElementsByTagName('area');
    const container = document.getElementById('screen6');

    // Remove existing areas
    const existingAreas = container.querySelectorAll('.planet-area');
    existingAreas.forEach(area => area.remove());

    Array.from(areas).forEach(area => {
        const coords = area.coords.split(',');
        const x = parseFloat(coords[0]);
        const y = parseFloat(coords[1]);
        const radius = parseFloat(coords[2]);

        const div = document.createElement('div');
        div.className = 'planet-area';
        div.style.position = 'absolute';
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.style.width = `${radius * 2}px`;
        div.style.height = `${radius * 2}px`;
        div.style.borderRadius = '50%';
        div.style.zIndex = '1000';
        div.style.transform = 'translate(-50%, -50%)';

        // When clicked, move to next screen and play audio
        div.addEventListener('click', () => {
            changeScreen('next');
            zeroAudio.pause();
            firstAudio.pause();
            secondAudio.pause();
            thirdAudio.play();
        });

        container.appendChild(div);
    });
}

/**
 * Handle screen transitions. Hide current screen and show the next one based on direction.
 * @param {string} direction - 'next', 'back', or 'skipTo56', or 'home'
 */
export function changeScreen(direction) {
    const state = getState();
    screens.forEach(screen => screen.style.display = 'none');
    stopAllAudio();
    console.log(`changeScreen called with direction: ${direction}, currentScreen: ${state.currentScreen}`);
    

    if (direction === 'next' && state.currentScreen < totalScreens) { 
        updateState({ currentScreen: state.currentScreen + 1 }); 
        //updateState({ currentScreenNP: state.currentScreenNP + 1 });
    } else if (direction === 'back' && state.currentScreen > 1) { 
        updateState({ currentScreen: state.currentScreen - 1 });
    } else if (direction === 'skipTo40') { 
        updateState({ currentScreen: 41 });
        updateState({ currentScreenNP: 1 });
        console.log(`Skipped to currentScreen = ${state.currentScreen}, currentScreenNP = ${state.currentScreenNP}`);
        console.log(`NP counter updated: ${state.currentScreenNP}`);
    } else if (direction === 'home') {
        updateState({ currentScreen: 1 });
        screens.forEach(screen => screen.style.display = 'none');
        screens[0].style.display = 'flex'; 
        updateButtonsVisibility(); // update button visibility
    }

    if (state.currentScreen >= 41) {
        // Non-words section
        if (state.currentScreenNP < backgroundsNonWords.length) {
            updateState({ currentScreenNP: state.currentScreenNP + 1 });
            changeBackground(backgroundsNonWords[state.currentScreenNP - 1]);
        } else {
            console.warn("No background for currentScreenNP:", state.currentScreenNP);
        }
        console.log(`Non-words section: currentScreenNP = ${state.currentScreenNP-1}`);
    } else {
        //currentScreenNP = 0;
        setCurrentScreenNP(0);
        changeBackground(backgrounds[state.currentScreen - 1]);
    }

    if (state.currentScreen >= 41) {
        if (state.currentScreenNP <= backgroundsNonWords.length) {
            document.getElementById(`np${state.currentScreenNP-1}`).style.display = 'flex';
        } else {
            console.warn("No screen available for currentScreenNP:", state.currentScreenNP);
        }
    } else {
        screens[state.currentScreen - 1].style.display = 'flex';
    }

    if (state.currentScreen === 6) {
        const image = document.getElementById('startGameImage');
        if (image) {
            image.style.display = 'block';
            image.style.opacity = '1';
        }
        console.log("we are playing :  ", exerciseState.gameID)
        startImageTimer();
        document.body.useMap = "#planetMap";
        createVisibleAreas();
    } else {
        document.body.useMap = "";
    }

    if(state.currentScreen === 9) {
        nironPlanetButton.style.display = 'block';
    } else {
        nironPlanetButton.style.display = 'none';
    }

    updateButtonsVisibility();
}

/**
 * Update the visibility of next/back buttons depending on the current screen.
 */
export function updateButtonsVisibility() {
    nextButtons.forEach(button => button.style.display = 'none');
    backButtons.forEach(button => button.style.display = 'none');
    backHomeButtons.forEach(button => button.style.display = 'none');

    let currentScreenElement;
    if (state.currentScreen >= 56) {
        // We are in the NP screens, so the current element is np${currentScreenNP-1} 
         
        currentScreenElement = document.getElementById(`np${state.currentScreenNP - 1}`);
    } else {
        // We are in normal screens, so the current element is screens[currentScreen-1]
        currentScreenElement = screens[state.currentScreen - 1];
    }

    const nextButton = currentScreenElement ? currentScreenElement.querySelector('.next-button') : null;
    const backButton = currentScreenElement ? currentScreenElement.querySelector('.back-button') : null;
    const backHomeBtn = currentScreenElement ? currentScreenElement.querySelector('.backHomeButton') : null;

    if (nextButton) {
        nextButton.style.display = 'block';
    }
    if (backButton) {
        backButton.style.display = 'block';
    }
    if (backHomeBtn) {
        backHomeBtn.style.display = 'block';
    }
}

/**
 * Change the background image for the current screen.
 * @param {string} imagePath - The background image path
 */
export function changeBackground(imagePath) {
    document.body.style.backgroundImage = `url('${imagePath}')`;
}

/**
 * Toggle the top-right menu visibility.
 */
export function toggleMenu() {
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        homeButton.style.display = 'block';
        dataButton.style.display = 'block';
        aboutButton.style.display = 'block';
    } else {
        menu.style.display = 'none';
        homeButton.style.display = 'none';
        dataButton.style.display = 'none';
        aboutButton.style.display = 'none';
    }
}

/**
 * Hide the start game image after it fades out.
 */
export function hideStartGameImage() {
    const image = document.getElementById('startGameImage');
    if (image) {
        image.style.opacity = '0';
        setTimeout(() => {
            image.style.display = 'none';
        }, 1000);
    }
}

/**
 * Start a timer to hide the startGameImage after some seconds.
 */
export function startImageTimer() {
    setTimeout(hideStartGameImage, 3000);
}

/**
 * Reset screen buttons after finishing an exercise.
 * @param {number} index - Index of the exercise
 */
export function resetFinalScreenButtons(index) {
    startRecButtons[index].style.display = 'none';
    sendResultButtons[index].style.display = 'none';
    maskAnswerDivs[index].style.display = 'none';
}

/**
 * Reset the entire game state, clearing data and resetting UI.
 */
export function resetGameState() {
    exerciseState.initialData = '';
    exerciseState.exerciseData = '';
    exerciseState.id = '';
    state.currentScreen = 1;
    state.currentScreenNP = 0;
    gameState.gamePassed = 0;
    gameState.gamePassedNP = 0;
    gameState.exercises = [];
    exerciseState.retryActivated = false;
    exerciseState.recognitionInProgress = false;

    startRecButtons.forEach(button => button.style.display = 'none');
    sendResultButtons.forEach(button => button.style.display = 'none');
    retryButtons.forEach(button => button.style.display = 'none');
    playButtons.forEach(button => button.style.display = 'block');
    cardButtons.forEach(button => button.style.display = 'block');

    menu.style.display = 'none';
    homeButton.style.display = 'none';
    dataButton.style.display = 'none';
    aboutButton.style.display = 'none';
    crashPlanetButton.style.display = 'block';
    

    nextButtons.forEach(button => button.style.display = 'none');
    backButtons.forEach(button => button.style.display = 'none');

    playT.style.display = 'block'; // Torna visibile come all’inizio
    recT.style.display = 'none';
    sendT.style.display = 'none';

    playNPT.style.display = 'block'; // Torna visibile come all’inizio
    sendNPT.style.display = 'none';


    //resetAudioList(phrasesAudio);

    skipBtnNiron.style.display = 'block';
    skipBtnTutorialFirst.style.display = 'block';
    touchImg.style.display = 'none';
    startNironGameButton.style.display = 'none';

    // Reset all audios
    phrasesAudio.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.load();
    });

    phrasesAudioRew.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.load();
    });

    phrasesnp.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.load();
    });

    storyAudioFilesNP.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.load();
    });

    const allAudio = [
        zeroAudio, firstAudio, secondAudio, thirdAudio, fourthAudio, fifthAudio, sixthAudio, seventhAudio, eighthAudio,
        readyAudio, exampleAudio, thisIsARatAudio, yourTurnAudio, pressGreenAudio,
        exampleFinishedAudio, startGameAudio, startGameAudioNP, ninthAudio, tenthAudio
    ];

    allAudio.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.load();
    });

    updateButtonsVisibility();
}

/**
 * Save initial user data (name, surname, class).
 */
// gameLogic.js

export async function saveInitialData() {
    const idInput = document.getElementById('id');
    console.log("Input ID:", idInput);
    const id = idInput ? idInput.value.trim() : '';
    console.log("Valore ID:", id);

    if (!id) {
        alert("Error: ID field mandatory!");
        console.error("ID is undefined or null.");
        return false; 
    }

    if(id < 0){
        alert("Error : ID should not be negative!");
        console.error("ID is undefined or null.");
        return false; 
    }

    // Save id to DB
    const formData = new FormData();
    formData.append("id", id);
    console.log("ID to Db:", id.toString());

    const url = "http://localhost:5500/user";
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const responseJson = await response.json();
        console.log(responseJson);
    } catch (error) {
        alert("Errore durante il salvataggio dei dati. Riprova.");
        console.error(error.message);
        return false; // Indica che il salvataggio non è riuscito
    }

    setId(id);
    exerciseState.initialData = `ID: ${id}\n\n`;
    console.log("Dati salvati:", exerciseState.initialData);

    return true; // Indica che il salvataggio è riuscito
}




/**
 * Save exercise data for later download.
 */
export function saveExerciseData(exerciseNumber, expectedPhrase, spokenPhrase, wrongWords) {
    const existingExerciseIndex = gameState.exercises.findIndex(ex => ex.exerciseNumber === exerciseNumber);
    const exerciseData = { exerciseNumber, expectedPhrase, spokenPhrase, wrongWords };

    if (existingExerciseIndex !== -1) {
        gameState.exercises[existingExerciseIndex] = exerciseData;
    } else {
        gameState.exercises.push(exerciseData);
    }
}

/**
 * Download a text file with all collected data.
 */
export function downloadFile() {
    const fileName = `${exerciseState.id}.txt`;

    console.log("Nome del file:", fileName); 

    let finalData = exerciseState.initialData;
    gameState.exercises.forEach(ex => {
        finalData += `Esercizio ${ex.exerciseNumber}\n`;
        finalData += `Frase da dire: ${ex.expectedPhrase}\n`;
        finalData += `Frase pronunciata: ${ex.spokenPhrase}\n`;
        finalData += `Parole sbagliate: ${ex.wrongWords.join(', ')}\n\n`;
    });

    const finalBlob = new Blob([finalData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(finalBlob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


/**
 * Compare expected and spoken phrases to find wrong words. --> not used anymore, but it's great to have it here!
 */
export function getWrongWords(expectedPhrase, spokenPhrase) {
    const expectedWords = expectedPhrase.toLowerCase().split(' ');
    const spokenWords = spokenPhrase.toLowerCase().split(' ');
    const wrongWords = [];

    for (let i = 0; i < expectedWords.length; i++) {
        if (spokenWords[i] !== expectedWords[i]) {
            wrongWords.push(spokenWords[i]);
        }
    }
    return wrongWords;
}

/**
 * Show start recognition button after exercise audio ends.
 */
export function showStartRecognition() {
    startRecButtons[gamePassed].style.display = 'block';
}

/**
 * Stop all exercise audio and remove listeners.
 */
export function stopAllAudio() {
    phrasesAudio.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.removeEventListener('ended', showStartRecognition);
    });
}

/**
 * Start microphone recording.
 */
export function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            recordState.mediaRecorder = new MediaRecorder(stream);
            recordState.mediaRecorder.start();
            recordState.audioChunks = [];
            mediaRecorder.ondataavailable = event => {
                recordState.audioChunks.push(event.data);
            };
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
        });
}

/**
 * Stop recording and show all send result buttons (original logic for recognition).
 */
export function stopRecording() {
    recordState.mediaRecorder.stop();
    recordState.mediaRecorder.onstop = () => {
        recordState.audioChunks = [];
        sendResultButtons.forEach(button => button.style.display = 'block');
        sendResultButtonsNP.forEach(button => button.style.display = 'block');
    };
}

/**
 * Stop recording for non-words and show only the related send result button.
 * @param {number} npIndex - Index of the non-words exercise
 */
export function stopRecordingNP(npIndex) {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            sendResultButtonsNP[npIndex].style.display = 'block';
        };
    }
}

/**
 * Start recording of the audio.
 * @param {number} exNumber 
 */
export async function startExerciseRecording(exNumber) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordState.mediaRecorder = new MediaRecorder(stream);
    recordState.audioChunks = [];
    recordState.mediaRecorder.ondataavailable = event => {
        recordState.audioChunks.push(event.data);
    };
    recordState.mediaRecorder.start();
}

/**
 * Stop recording of the audio and return the audio blob.
 */
export async function stopExerciseRecording() {
    return new Promise(resolve => {
        recordState.mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(recordState.audioChunks, { type: 'audio/webm' });
            recordState.audioChunks = [];
            const gameID = exerciseState.gameID;
            const exerciseNumber = gameState.gamePassed + 1;
            const taskNumber = 1;
            const trasc = gameState.exercises.find(ex => ex.exerciseNumber === exerciseNumber)?.spokenPhrase || '';
            //const task = 1;
            //const exercise = gameState.gamePassed;
            //await sendAudioToDB(audioBlob, gameID, exerciseNumber, taskNumber, trasc);
            resolve(audioBlob);
        };
        recordState.mediaRecorder.stop();
    });
}

/**
 * Create the final .txt file with all collected data.
 */
export function createFinalDataText() {
    let finalData = exerciseState.initialData;
    gameState.exercises.forEach(ex => {
        finalData += `Esercizio ${ex.exerciseNumber}\n`;
        finalData += `Frase da dire: ${ex.expectedPhrase}\n`;
        finalData += `Frase pronunciata: ${ex.spokenPhrase}\n`;
        finalData += `Parole sbagliate: ${ex.wrongWords.join(', ')}\n\n`;
    });
    return finalData;
}

export async function downloadAllAsZip(finalData, recordedAudios) {
    console.log("ID:", exerciseState.id);

    const zip = new JSZip();
    const fileName = `${exerciseState.id}_risultati.zip`;
    console.log("Nome del file ZIP:", fileName);

    // Aggiungi il file testo al file ZIP
    zip.file(`${exerciseState.id}.txt`, finalData);

    // Aggiungi i file audio al file ZIP
    for (let audio of recordedAudios) {
        const wavBlob = await convertWebmToWav(audio.blob);
        const arrayBuffer = await wavBlob.arrayBuffer();
        const wavFileName = audio.name.replace('.webm', '.wav');
        zip.file(wavFileName, arrayBuffer);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, fileName);
}



export async function startExerciseRecordingNP(exNumber) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recordState.mediaRecorder = new MediaRecorder(stream);
    recordState.audioChunks = [];
    recordState.mediaRecorder.ondataavailable = event => {
        recordState.audioChunks.push(event.data);
    };
    recordState.mediaRecorder.start();
}

export async function stopExerciseRecordingNP() {
    return new Promise(resolve => {
        recordState.mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(recordState.audioChunks, { type: 'audio/webm' });
            recordState.audioChunks = [];
            const gameID = exerciseState.gameID;
            const exerciseNumber = gameState.gamePassedNP + 1;
            const taskNumber = 1;
            //const task = 1;
            //const exercise = gameState.gamePassed;
            await sendAudioToDB(audioBlob, gameID, exerciseNumber, taskNumber);
            resolve(audioBlob);
        };
        recordState.mediaRecorder.stop();
    });
}

export function createFinalDataTextNP() {
    let finalData = exerciseState.initialData;
    gameState.exercises.forEach(ex => {
        finalData += `Esercizio ${ex.exerciseNumber}\n`;
        finalData += `Frase da dire: ${ex.expectedPhrase}\n`;
        finalData += `Frase pronunciata: ${ex.spokenPhrase}\n`;
        finalData += `Parole sbagliate: ${ex.wrongWords.join(', ')}\n\n`;
    });
    return finalData;
}


export async function downloadAllAsZipNP(finalData, recordedAudiosNP) {
    console.log("ID:", exerciseState.id);
    const zip = new JSZip();
    const fileName = `${exerciseState.id}_risultati_NP.zip`;
    console.log("Nome del file ZIP:", fileName);

    // Aggiungi il file testo al file ZIP
    zip.file(`${exerciseState.id}.txt`, finalData);
  
    for (let audio of recordedAudiosNP) {
      const wavBlob = await convertWebmToWav(audio.blob);
      const arrayBuffer = await wavBlob.arrayBuffer();
      const wavFileName = audio.name.replace('.webm', '.wav');
      zip.file(wavFileName, arrayBuffer);
    }
  
    const content = await zip.generateAsync({type:"blob"});
    //saveAs(content, `${nome}_${cognome}_${id}_risultati_NP.zip`);
    saveAs(content, fileName);
}

async function convertWebmToWav(webmBlob) {
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const wavBuffer = await WavEncoder.encode({
        sampleRate: audioBuffer.sampleRate,
        channelData: Array.from({ length: audioBuffer.numberOfChannels }, (_, i) =>
            audioBuffer.getChannelData(i)
        ),
    });

    return new Blob([wavBuffer], { type: 'audio/wav' });
}

/**
 * Show the start button for the next exercise.
 * @param {number} index 
 */
export function showDisabledStartButton(index) {
    startRecButtons[index].disabled = true;
    startRecButtons[index].style.display = 'block'; 
  }
  
/**
* Hide the start button for the next exercise.
* @param {number} index
*/
export function hideDisabledStartButton(index) {
    startRecButtons[index].style.display = 'none';
}

// gameLogic.js

/**
 * Send audio to the backend database.
 * @param {Blob} audioBlob - The audio data blob.
 * @param {number} activity - The Act number (1 or 2).
 * @param {number} exercise - The Exercise number.
 * @param {number} task - The Task number.
 * @param {string} trasc - The transcription (only for Act=1).
 */
export async function sendAudioToDB(audioBlob, activity, exercise, task, trasc) {
    console.log("[DEBUG] Sending audio to DB:", {
        audioBlob,
        activity,
        exercise,
        task,
        trasc,
    });
    const wavBlob = await convertWebmToWav(audioBlob); // Conversione in WAV
    const userId = exerciseState.id; // Presuppone che l'ID utente sia già salvato in exerciseState

    const formData = new FormData();
    formData.append('id', userId);
    formData.append('act', activity);
    formData.append('ex', exercise);
    formData.append('task', task);
    
    if (activity === 1) { // Solo per Act=1
        formData.append('trasc', trasc);  // Aggiungi questo campo
    }
    
    formData.append('audio', wavBlob, `audio`);

    const url = "http://127.0.0.1:5500/audio";
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error uploading audio: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Audio uploaded successfully:', responseData);
    } catch (error) {
        console.error('Failed to upload audio:', error);
    }
}


export async function updateTranscription(exerciseNumber, taskNumber, realTransc) {
    const userId = exerciseState.id;
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('act', 1);           // ad es. act=1
    formData.append('ex', exerciseNumber);
    formData.append('task', taskNumber);
    formData.append('trasc', realTransc);
  
    await fetch("http://127.0.0.1:5500/audioUpdate", {
      method: 'POST', 
      body: formData
    });
  }
  
