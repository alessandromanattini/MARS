import {state, recordState, gameState, exerciseState} from './state.js';
import {
    zeroAudio,
    firstAudio,
    secondAudio,
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
    startGameAudioNP,
    phrasesAudioRew,
    phrasesAudio,
    firstExerciseAudio,
    secondExerciseAudio,
    phrasesnp,
    // DOM references
    body,
    menu,
    homeButton,
    dataButton,
    aboutButton,
    menuButton,
    backHomeButtons,
    nextButtons,
    backButtons,
    intro1Rec,
    intro2Rec,
    introNP1,
    findMeButton1,
    findMeButton2,
    findMeButton3,
    findMeButton4,
    endGif,
    endNPintro,
    NPtutorial,
    nascondinoNP,
    nironPlanetButton,
    nonWordsButton,
    voiceRecognitionButton,
    skipBtnNiron,
    skipBtnTutorialFirst,
    touchImg,
    startNironGameButton,
    playT,
    recT,
    sendT,
    retryT,
    playNPT,
    sendNPT,
    retryNPT,
    sendNP1,
    sendNP2,
    sendNP3,
    sendNP4,
    sendNP5,
    sendNP6,
    lastNP,
    sendNP7,
    cardExample,
    cardButtons,
    startRecButtons,
    sendResultButtons,
    sendResultButtonsNP,
    retryButtons,
    retryButtonsNP,
    playButtons,
    playButtonsNP,
    saveButton,
    gif,
    cardsPhrases,
    SpeechRecognition,
    delayBetweenAudios,
    endNP,
    ninthAudio,
    tenthAudio,
    tutorial_np,
    tutorial_np1,
    tutorial_npEnd,
    firstExerciseRewardAudioNP,
    secondExerciseRewardAudioNP,
    thirdExerciseRewardAudioNP,
    fourthExerciseRewardAudioNP,
    fifthExerciseRewardAudioNP,
    sixthExerciseAudioNP,
    spellExerciseAudioNP,
    seventhExerciseRewardAudioNP,
    micNP,
    crashPlanetButton,
    playGifButton,
    storyAudioFilesNP
    //intro1

  } from './data.js';
  
  // 2) Import di tutte le funzioni “logiche” usate qui, da gameLogic.js
  import {
    changeScreen,
    resetGameState,
    saveInitialData,
    downloadFile,
    createFinalDataText,
    createFinalDataTextNP,
    downloadAllAsZip,
    downloadAllAsZipNP,
    startExerciseRecording,
    stopExerciseRecording,
    startExerciseRecordingNP,
    stopExerciseRecordingNP,
    saveExerciseData,
    toggleMenu,
    sendAudioToDB
  } from './gameLogic.js';
  
  // 3) Import di doRecognition (STT)
  import { doRecognition } from './STT.js';

/* 
   -------------------------------------------------------------------------------------
   EVENT LISTENERS 
   -------------------------------------------------------------------------------------
*/

// Menu
menuButton.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
});

homeButton.addEventListener('click', function () {
    //saveInitialData();
    resetGameState();
    //currentScreen = 1;
    //backButtons.forEach(button => button.style.display = 'block');
    //changeScreen('next');
    menu.style.display = 'none';
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();
    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
    exampleFinishedAudio.pause();

    // stop reward and exercise audios
    phrasesAudioRew.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    phrasesAudio.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    storyAudioFilesNP.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    changeScreen('home');
});

dataButton.addEventListener('click', function (e) {
    /*e.stopPropagation(); 
    if (gameState.exercises.length === 0 && exerciseState.recordedAudios.length === 0 && exerciseState.recordedAudiosNP.length === 0) {
        downloadFile(); 
    } else {
        // Almeno un esercizio svolto o audio registrato
        const finalData = createFinalDataText();
        if(exerciseState.recordedAudios.length > 0) {
            // Scarica lo zip con i dati
            downloadAllAsZip(finalData, exerciseState.recordedAudios);
        } else if(exerciseState.recordedAudiosNP.length > 0) {
            // Scarica lo zip con i dati
            downloadAllAsZipNP(finalData, exerciseState.recordedAudiosNP);
        }
    }*/
   alert("This button will be implemented in the future! We are waiting for further instructions.");
});

aboutButton.addEventListener('click', function (e) {
    alert("This button will be implemented in the future! We are waiting for further instructions.");
});

// Save user data button
saveButton.addEventListener('click', async () => {

    if (exerciseState.initialData !== '' || gameState.exercises.length > 0 || exerciseState.recordedAudios.length > 0 || exerciseState.recordedAudiosNP.length > 0) {
        exerciseState.initialData = '';
        gameState.exercises = [];
        exerciseState.recordedAudios = [];
        exerciseState.recordedAudiosNP = [];
    }

    const success = await saveInitialData();
    if (success) {
        changeScreen('next');
    }
});

// Navigation
nextButtons.forEach(button => {
    button.addEventListener('click', () => changeScreen('next'));
});

backButtons.forEach(button => {
    button.addEventListener('click', () => changeScreen('back'));
});

document.addEventListener('DOMContentLoaded', () => {
    touchImg.style.display = 'none';
});

// Back home buttons
backHomeButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('BackHomeButton clicked. Tornando alla schermata iniziale.');
        resetGameState(); // Opzionale, se vuoi resettare tutto
        saveInitialData();
        state.currentScreen = 1;
        //backButtons.forEach(button => button.style.display = 'block');
        menu.style.display = 'none';
        zeroAudio.pause();
        firstAudio.pause();
        secondAudio.pause();
        thirdAudio.pause();
        fourthAudio.pause();
        fifthAudio.pause();
        sixthAudio.pause();
        seventhAudio.pause();
        eighthAudio.pause();
        readyAudio.pause();
        exampleAudio.pause();
        thisIsARatAudio.pause();
        yourTurnAudio.pause();
        pressGreenAudio.pause();
        exampleFinishedAudio.pause();
        startGameAudio.pause();
        phrasesnp.forEach(audio => {
            audio.pause();
        });

        // stop reward and exercise audios
        phrasesAudioRew.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        phrasesAudio.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });

        changeScreen('home'); // Naviga alla schermata iniziale
    });
});

document.addEventListener('click', function (e) {
    if (e.target !== menuButton && e.target !== menu) {
        menu.style.display = 'none';
        homeButton.style.display = 'none';
        dataButton.style.display = 'none';
        aboutButton.style.display = 'none';
    }
});

// Story buttons
intro1Rec.addEventListener('click', function () {
    zeroAudio.pause();
    firstAudio.play();
});

intro2Rec.addEventListener('click', function () {
    zeroAudio.pause();
    firstAudio.pause();
    secondAudio.play();
});

introNP1.addEventListener('click', function () {
    zeroAudio.pause();
    firstAudio.play();
});

findMeButton1.addEventListener('click', function () {
    changeScreen('next');
});

findMeButton2.addEventListener('click', function () {
    changeScreen('next');
    thirdAudio.pause();
    fourthAudio.play();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();
    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
});

nascondinoNP.addEventListener('click', function() {
    zeroAudio.pause();
    firstAudio.pause();
    thirdAudio.play();
});

findMeButton3.addEventListener('click', function () {
    changeScreen('next');
});

findMeButton4.addEventListener('click', function () {
    changeScreen('next');
    zeroAudio.pause();
    firstAudio.pause();
    thirdAudio.pause();
    startGameAudioNP.play();
});

crashPlanetButton.addEventListener('click', function () {
    changeScreen('next');
    zeroAudio.pause();
    firstAudio.pause();
    thirdAudio.pause();
    startGameAudioNP.pause();
    gif.currentTime = 0; // riporti il cursore video all’inizio
    gif.play();          // e riparte
    crashPlanetButton.style.display = 'none';
})

endGif.addEventListener('click', function () {
    ninthAudio.play();
    gif.currentTime = 0;
});

endNPintro.addEventListener('click', function () {
    ninthAudio.pause();
    tenthAudio.play();
});

NPtutorial.addEventListener('click', function () {
    ninthAudio.pause();
    tenthAudio.pause();
    tutorial_np.play();
});

fourthAudio.addEventListener('ended', function () {
    console.log('fourthAudio ended');
});

nironPlanetButton.addEventListener('click', function () {
    changeScreen('next');
    fourthAudio.pause();
    fifthAudio.play();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();
    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
    nironPlanetButton.style.display = 'none';
});

// setting gameID
voiceRecognitionButton.addEventListener('click', () => {
    console.log('Voice recognition button clicked --> setting gameID = 1');
    exerciseState.gameID = 1;
    changeScreen('next');
    zeroAudio.play();
});

nonWordsButton.addEventListener('click', () => {
    console.log('NonWords button clicked --> setting gameID = 2');
    exerciseState.gameID = 2;
    changeScreen('skipTo40');
    zeroAudio.play();
});


fifthAudio.addEventListener('ended', function () {
    setTimeout(function () {
        sixthAudio.play();
    }, delayBetweenAudios);
    zeroAudio.pause();
    firstAudio.pause();
    secondAudio.pause();
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();
    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
});

sixthAudio.addEventListener('ended', function () {
    setTimeout(function () {
        seventhAudio.play();
    }, delayBetweenAudios);
    zeroAudio.pause();
    firstAudio.pause();
    secondAudio.pause();
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    eighthAudio.pause();    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
});

seventhAudio.addEventListener('ended', function () {
    eighthAudio.play();
    touchImg.style.display = 'block';
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
});

eighthAudio.addEventListener('ended', function () {
    console.log('eightAudio ended. Mostro touchImg.');
    touchImg.style.display = 'block';
    startNironGameButton.style.display = 'block';
});


/*touchImg.addEventListener('click', function () {
    console.log('touchImg clicked. Procedo alla schermata successiva.');
    changeScreen('next');
});*/

skipBtnNiron.addEventListener('click', function () {
    eighthAudio.play();
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    seventhAudio.pause();
    sixthAudio.pause();    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();

    touchImg.style.display = 'block';
    startNironGameButton.style.display = 'block';
    skipBtnNiron.style.display = 'none';
});

startNironGameButton.addEventListener('click', function () {
    changeScreen('next');    
    eighthAudio.pause();
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    seventhAudio.pause();
    sixthAudio.pause();
    readyAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
    exampleAudio.play();
});


readyAudio.addEventListener('ended', function () {
    setTimeout(function () {
        exampleAudio.play();
        changeScreen('next');
        sendAudioButton.style.display = 'none';
    }, delayBetweenAudios);
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();
    readyAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
    startGameAudio.pause();
});

exampleAudio.addEventListener('play', function () {
    body.classList.add('hide-cursor');
    playT.style.cursor = 'wait';
});

exampleAudio.addEventListener('ended', function () {
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();    
    readyAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
    startGameAudio.pause();
    body.classList.remove('hide-cursor');
    playT.style.cursor = 'pointer';
});

thisIsARatAudio.addEventListener('play', function () {
    body.classList.add('hide-cursor');
    playT.style.cursor = 'wait';
    recT.style.cursor = 'wait';
    retryT.style.cursor = 'wait';
});

playT.addEventListener('click', function(){
    //recT.style.display = 'block';
    //sendT.style.display = 'block';
    playT.style.display = 'none';
    zeroAudio.pause();
    firstAudio.pause();
    secondAudio.pause();
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();    
    readyAudio.pause();
    thisIsARatAudio.play();
    playT.style.cursor = 'wait';
    recT.style.display = 'block';
    thisIsARatAudio.addEventListener('ended', function () {
        sendT.style.display = 'block';
        body.classList.remove('hide-cursor');
        recT.style.cursor = 'auto';
        retryT.style.cursor = 'pointer';
        sendT.style.cursor = 'pointer';
    });
    yourTurnAudio.pause();
    pressGreenAudio.pause();
    exampleAudio.pause();
    startGameAudio.pause();
});

playNPT.addEventListener('click', function(){
    playNPT.style.display = 'none';
    ninthAudio.pause();
    tenthAudio.pause();
    tutorial_np.pause();
    tutorial_np1.play();
    tutorial_np1.addEventListener('ended', function () {
        sendNPT.style.display = 'block';
    });
});

/*thisIsARatAudio.addEventListener('ended', function () {
    setTimeout(function () {
        yourTurnAudio.play();
    }, delayBetweenAudios);
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    pressGreenAudio.pause();
});*/

yourTurnAudio.addEventListener('ended', function () {
    setTimeout(function () {
        pressGreenAudio.play();
    }, delayBetweenAudios);
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    startGameAudio.pause();
    
});

pressGreenAudio.addEventListener('ended', function () { 
    sendT.style.display = 'block';
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
});

sendT.addEventListener('click', function () {
    console.log('Audio inviato e pulsante cliccato');
    exampleFinishedAudio.play();
});

exampleFinishedAudio.addEventListener('ended', function () {
    changeScreen('next');
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();    
    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
    startGameAudio.play();
});

skipBtnTutorialFirst.addEventListener('click', function () {
    console.log('skipTut clicked');
    exampleFinishedAudio.play();
    sendT.style.display = 'block';
    thirdAudio.pause();
    fourthAudio.pause();
    fifthAudio.pause();
    sixthAudio.pause();
    seventhAudio.pause();
    eighthAudio.pause();    
    readyAudio.pause();
    exampleAudio.pause();
    thisIsARatAudio.pause();
    yourTurnAudio.pause();
    pressGreenAudio.pause();
    skipBtnTutorialFirst.style.display = 'none';
});

cardExample.addEventListener('click', function () {
    changeScreen('next');
});

// Exercises audio ended
firstExerciseAudio.addEventListener('ended', function () {
    startRecButtons[gameState.gamePassed].style.display = 'block';
});

secondExerciseAudio.addEventListener('ended', function () {
    startRecButtons[gameState.gamePassed].style.display = 'block';
});

cardButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
        phrasesAudio[index].play();
        button.style.display = 'none';
        phrasesAudioRew[index].pause();
        changeScreen('next');
    });
});


phrasesAudio[gameState.gamePassed].addEventListener('ended', function () {
    startRecButtons[gameState.gamePassed].style.display = 'block';
});

// Recognition start buttons
/*startRecButtons.forEach((button, index) => {
    button.addEventListener("click", async () => {
        sendResultButtons[index].style.display = 'none';

        // The recording begins
        await startExerciseRecording(index + 1);

        doRecognition(cardsPhrases[index], SpeechRecognition, async (recognitionSuccess, spokenPhrase, wrongWords) => {
            const expectedPhrase = cardsPhrases[index];
            //const wrongWords = getWrongWords(expectedPhrase, spokenPhrase);

            // After the end of the recognition, the recording stops
            const audioBlob = await stopExerciseRecording();
            // Save the blob
            recordedAudios.push({ name: `audioEsercizio${index + 1}.webm`, blob: audioBlob });

            sendResultButtons[index].style.display = 'block';
            saveExerciseData(index + 1, expectedPhrase, spokenPhrase, wrongWords);
        });
    });
});*/


// Send result buttons for recognition exercises
// Send result buttons for recognition exercises
sendResultButtons.forEach((button, index) => {
    button.addEventListener('click', async () => {
        console.log(`SendResult clicked for exercise ${index + 1}`);

        // 1) Stop del riconoscimento vocale (SpeechRecognition) se esiste
        if (window.recognition && typeof window.recognition.stop === 'function') {
            window.recognition.stop();
        }

        // 2) Stop della registrazione microfono, recupero Blob, lo aggiungo a recordedAudios
        let audioBlob;
        if (typeof stopExerciseRecording === 'function') {
            audioBlob = await stopExerciseRecording();  // stopExerciseRecording() è la tua funzione
            exerciseState.recordedAudios.push({
                name: `audioEsercizio${index + 1}.webm`,
                blob: audioBlob
            });
        }

        // 3) Nascondo i pulsanti di invio e "startRec" (estetico)
        sendResultButtons[index].style.display = 'none';
        startRecButtons[index].style.display = 'none';

        // 4) Faccio partire l’audio di ricompensa
        phrasesAudioRew[index].play();

        // 5) Aggiorno contatore e passo allo screen successivo
        gameState.gamePassed++;
        changeScreen('next');
        console.log(`Esercizio completato: ${gameState.gamePassed} su ${cardsPhrases.length}`);

        // 6) Invia l'audio e 'trasc' se Act=1
        const activity = exerciseState.gameID;
        const exerciseNumber = index + 1;
        const taskNumber = 1;
        const trasc = exerciseState.lastTransc; 
        console.log("[DEBUG] Trascrizione inviata al server:", trasc);
        if (activity === 1) {
            await sendAudioToDB(audioBlob, activity, exerciseNumber, taskNumber, trasc);
        } else if (activity === 2) {
            await sendAudioToDB(audioBlob, activity, exerciseNumber, taskNumber, ''); // Passa una stringa vuota per Act=2
        }

        // 7) Se è l’ultimo esercizio, scarica i file
        if (gameState.gamePassed === cardButtons.length+1) {  // Modifica in base al numero totale di esercizi
            console.log("Tutti gli esercizi completati. Scaricamento del file...");
            const finalData = createFinalDataText();
            await downloadAllAsZip(finalData, exerciseState.recordedAudios);
        }
    });
});


// Non-words send result
sendResultButtonsNP.forEach((button, index) => {
    button.addEventListener('click', async () => {
        gameState.gamePassedNP++;
        console.log(`SendResult clicked for NP exercise ${index + 1}`);
        changeScreen('next');
        if (typeof stopExerciseRecordingNP === 'function') {
            const audioBlob = await stopExerciseRecordingNP();
            exerciseState.recordedAudiosNP.push({
                name: `audioEsercizioNP${index + 1}.webm`,
                blob: audioBlob
            });
        }
        sendResultButtonsNP[index].style.display = 'none';
        console.log(`Updated gamePassedNP: ${gameState.gamePassedNP}`);

        if (gameState.gamePassedNP === 7) {
            console.log('Tutti i 7 esercizi NP completati! Scarico i file...');
            const finalData = createFinalDataTextNP(); 
            await downloadAllAsZipNP(finalData, exerciseState.recordedAudiosNP);
        }

        // Log dello stato prima di cambiare schermo
        console.log(`Before changeScreen: currentScreen = ${state.currentScreen}, currentScreenNP = ${state.currentScreenNP}`);
    });
});

sendNP1.addEventListener('click', function () {
    firstExerciseRewardAudioNP.play();
});

sendNP2.addEventListener('click', function () {
    secondExerciseRewardAudioNP.play();
});

sendNP3.addEventListener('click', function () {
    thirdExerciseRewardAudioNP.play();
});

sendNP4.addEventListener('click', function () {
    fourthExerciseRewardAudioNP.play();
});

sendNP5.addEventListener('click', function () {
    fifthExerciseRewardAudioNP.play();
});

sendNP6.addEventListener('click', function () {
    sixthExerciseRewardAudioNP.play();
});

lastNP.addEventListener('click', function () {
    sixthExerciseAudioNP.pause();
    spellExerciseAudioNP.play();
});

sendNP7.addEventListener('click', function () {
    seventhExerciseRewardAudioNP.play();
});

// Play buttons for recognition exercises
playButtons.forEach((button, index) => {
    button.addEventListener('click', async function () {
      console.log('play button clicked');
      
      // Nascondo il pulsante Play
      playButtons[index].style.display = 'none';
      
      // Avvio l'audio dell’esercizio
      phrasesAudio[index].play();
  
      // Metto in pausa l’audio di reward, se stava suonando
      phrasesAudioRew[index].pause();
  
      // Quando l'audio finisce, faccio partire la registrazione e lo STT
      phrasesAudio[index].addEventListener('ended', async function onAudioEnded() {
        // Rimuovo l'eventListener per evitare chiamate multiple se l’audio viene riascoltato
        phrasesAudio[index].removeEventListener('ended', onAudioEnded);
  
        // Mostro il pulsante di startRec come disabilitato (solo grafica)
        startRecButtons[index].style.display = 'block';
        startRecButtons[index].disabled = true;
  
        // Mostro il pulsante di invio: l’utente potrà cliccarlo quando vuole
        sendResultButtons[index].style.display = 'block';
  
        // Avvia speech recognition (STT)
        doRecognition(cardsPhrases[index], SpeechRecognition, async (recognitionSuccess, spokenPhrase, wrongWords) => {
            const expectedPhrase = cardsPhrases[index];
            const trasc = spokenPhrase; // Definisci 'trasc' correttamente
            saveExerciseData(index + 1, expectedPhrase, spokenPhrase, wrongWords);
            console.log("STT terminato, pronto per l'invio");  
            exerciseState.lastTransc = trasc; // Salva 'trasc' nello stato   
            console.log("[DEBUG] Trascrizione STT:", spokenPhrase);
            console.log("[DEBUG] Stato aggiornato, lastTransc:", exerciseState.lastTransc);  
        });
        

  
        // Avvia la registrazione microfono per salvare l’audio .webm
        await startExerciseRecording(index + 1);
      }, { once: true });
    });
  });
  

// Play buttons for non-words
playButtonsNP.forEach((button, index) => {
    button.addEventListener('click', async () => {
        console.log('Play button NP clicked for the NP exercise:', index);
        playButtonsNP[index].style.display = 'none';
        tutorial_npEnd.pause();
        firstExerciseRewardAudioNP.pause();
        secondExerciseRewardAudioNP.pause();
        thirdExerciseRewardAudioNP.pause();
        fourthExerciseRewardAudioNP.pause();
        fifthExerciseRewardAudioNP.pause();
        sixthExerciseAudioNP.pause();
        spellExerciseAudioNP.pause();
        phrasesnp[index].play();
        console.log('Playing audio NP:', index);
        // Avvio la registrazione NP
        await startExerciseRecordingNP(index + 1);

        // Quando finisce l'audio NP, fermo la registrazione
        // Devo usare una callback async per usare await dentro
        phrasesnp[index].addEventListener('ended', async () => {
            const audioBlob = await stopExerciseRecordingNP();
            exerciseState.recordedAudiosNP.push({ name: `audioEsercizioNP${index + 1}.webm`, blob: audioBlob });
            sendResultButtonsNP[index].style.display = 'block';
        }, { once: true });
    });
});

retryT.addEventListener('click', function () {
    recT.style.display = 'none';
    sendT.style.display = 'none';    
    
    thisIsARatAudio.play();
    thisIsARatAudio.addEventListener('ended', function () {
        recT.style.display = 'block';
        sendT.style.display = 'block';
    });

});

sendNPT.addEventListener('click', async () => {
    changeScreen('next');
    sendNPT.style.display = 'none';
    tutorial_npEnd.play();
});


retryNPT.addEventListener('click', function () {
    sendNPT.style.display = 'none';
    
    tutorial_np1.play();
    tutorial_np1.addEventListener('ended', function () {
        sendT.style.display = 'block';
    });
});

// Retry buttons NP
retryButtonsNP.forEach((button, index) => {
    button.addEventListener('click', async () => {
        console.log('Retry button NP clicked for the NP exercise:', index);
        sendResultButtonsNP.forEach(btn => btn.style.display = 'none');
        phrasesnp[index].play();

        await startExerciseRecordingNP(index + 1);

        phrasesnp[index].addEventListener('ended', async () => {
            const audioBlob = await stopExerciseRecordingNP();
            exerciseState.recordedAudiosNP.push({ name: `audioEsercizioNP${index + 1}.webm`, blob: audioBlob });
            sendResultButtonsNP[index].style.display = 'block';
        }, { once: true });
    });
});


// Retry buttons for recognition
retryButtons.forEach((button, index) => {
    button.addEventListener('click', async function () {
      // Rimuovo eventuale esercizio salvato (se c'era) per rifarlo
      const exerciseNumber = index + 1;
      gameState.exercises = gameState.exercises.filter(ex => ex.exerciseNumber !== exerciseNumber);
  
      // Nascondo i pulsanti di registrazione e invio (eventuali rimasugli)
      startRecButtons[index].style.display = 'none';
      sendResultButtons[index].style.display = 'none';
  
      // Faccio ripartire l'audio dell’esercizio
      phrasesAudio[index].play();
  
      // Quando l'audio finisce, avvio la registrazione e lo STT
      phrasesAudio[index].addEventListener('ended', async function onAudioEndedRetry() {
        // Rimuovo l'event listener, così non si riattiva ad ogni retry
        phrasesAudio[index].removeEventListener('ended', onAudioEndedRetry);
  
        // Mostro il pulsante startRec come disabilitato (solo grafica)
        startRecButtons[index].style.display = 'block';
        startRecButtons[index].disabled = true;
  
        // Mostro il pulsante di invio
        sendResultButtons[index].style.display = 'block';
  
        // Avvio lo SpeechRecognition (STT)
        doRecognition(cardsPhrases[index], SpeechRecognition, (recognitionSuccess, spokenPhrase, wrongWords) => {
          const expectedPhrase = cardsPhrases[index];
          saveExerciseData(exerciseNumber, expectedPhrase, spokenPhrase, wrongWords);
          

          // Se vuoi riprodurre animazioni o log basati sul risultato:
          /*if (recognitionSuccess) {
            console.log("Corretto");
            // playGreenAnimation(index); // se vuoi mostrare animazione “verde”
            // Salvo i risultati
            saveExerciseData(exerciseNumber, expectedPhrase, spokenPhrase, wrongWords);
          } else {
            console.log("Errato");
            // playRedAnimation(index); // se vuoi mostrare animazione “rossa”
          }*/

        });
  
        // Avvio la registrazione microfono per salvare l'audio (webm)
        await startExerciseRecording(exerciseNumber);
      }, { once: true });
    });
  });
  


// NP gif ended
gif.addEventListener('ended', function(){
    gif.style.display = 'block';
});

// Update button visibility on DOMContentLoaded if needed
document.addEventListener('DOMContentLoaded', () => {
    if (state.currentScreen === 6) {
        createVisibleAreas();
    }
});

endNP.addEventListener('click', function () {
    changeScreen('home');
    seventhExerciseRewardAudioNP.pause();
    resetGameState();
});

export const npIntervals = [
    [
        { start: 0, end: 15.3, show: false },
        { start: 15.3, end: 26,   show: true },
        { start: 25, end: 43.3,   show: false },
        { start: 43.3, end: 54.7, show: true },
        { start: 54.7, end: 56, show: false },
    ], 
    [
        { start: 0, end: 13.7, show: false },
        { start: 13.7, end: 23.8, show: true },
        { start: 23.8, end: 38.7,   show: false },
        { start: 38.7, end: 48.5, show: true },
        { start: 48.5, end: 50, show: false },
    ],
    [
        { start: 0, end: 15, show: false },
        { start: 15, end: 26.3, show: true },
        { start: 26.3, end: 43,   show: false },
        { start: 43, end: 53.2, show: true },
        { start: 53.2, end: 55, show: false },
    ],
    [
        { start: 0, end: 15.5, show: false },
        { start: 15.5, end: 25.5, show: true },
        { start: 25.5, end: 42,   show: false },
        { start: 42, end: 51, show: true },
        { start: 51, end: 55, show: false },
    ],
    [
        { start: 0, end: 15.8, show: false },
        { start: 15.8, end: 27, show: true },
        { start: 27, end: 43.5,   show: false },
        { start: 43.5, end: 54.5, show: true },
        { start: 54.5, end: 57, show: false },
    ],
    [
        { start: 0, end: 15.5, show: false },
        { start: 15.5, end: 26.5, show: true },
        { start: 26.5, end: 43.6,   show: false },
        { start: 43.6, end: 54.5, show: true },
        { start: 54.5, end: 57, show: false },
    ],
    [
        {start: 0, end: 60, show: true}
    ]
];



playButtonsNP[0].addEventListener('click', async () => {
    console.log('Play button NP cliccato per esercizio 1');
    
    // Avvia audio
    phrasesnp[0].play();
  
    // Aggiungo listener timeupdate, se non l’hai già aggiunto
    phrasesnp[0].addEventListener('timeupdate', () => {
      handleNPTimeUpdate(0, npIntervals[0], phrasesnp, micNP);
    });
});

playButtonsNP[1].addEventListener('click', async () => {
    console.log('Play button NP cliccato per esercizio 2');
    
    // Avvia audio
    phrasesnp[1].play();
  
    // Aggiungo listener timeupdate, se non l’hai già aggiunto
    phrasesnp[1].addEventListener('timeupdate', () => {
      handleNPTimeUpdate(1, npIntervals[1], phrasesnp, micNP);
    });
});

playButtonsNP[2].addEventListener('click', async () => {
    console.log('Play button NP cliccato per esercizio 3');
    
    // Avvia audio
    phrasesnp[2].play();
  
    // Aggiungo listener timeupdate, se non l’hai già aggiunto
    phrasesnp[2].addEventListener('timeupdate', () => {
      handleNPTimeUpdate(2, npIntervals[2], phrasesnp, micNP);
    });
});

playButtonsNP[3].addEventListener('click', async () => {
    console.log('Play button NP cliccato per esercizio 4');
    
    // Avvia audio
    phrasesnp[3].play();
  
    // Aggiungo listener timeupdate, se non l’hai già aggiunto
    phrasesnp[3].addEventListener('timeupdate', () => {
      handleNPTimeUpdate(3, npIntervals[3], phrasesnp, micNP);
    });
});

playButtonsNP[4].addEventListener('click', async () => {
    console.log('Play button NP cliccato per esercizio 5');
    
    // Avvia audio
    phrasesnp[4].play();
  
    // Aggiungo listener timeupdate, se non l’hai già aggiunto
    phrasesnp[4].addEventListener('timeupdate', () => {
      handleNPTimeUpdate(4, npIntervals[4], phrasesnp, micNP);
    });
});

playButtonsNP[5].addEventListener('click', async () => {
    console.log('Play button NP cliccato per esercizio 6');
    
    // Avvia audio
    phrasesnp[5].play();
  
    // Aggiungo listener timeupdate, se non l’hai già aggiunto
    phrasesnp[5].addEventListener('timeupdate', () => {
      handleNPTimeUpdate(5, npIntervals[5], phrasesnp, micNP);
    });
});

playButtonsNP[6].addEventListener('click', async () => {
    micNP[6].style.display = 'block';
});


function handleNPTimeUpdate(exerciseIndex, intervals, audioArray, micArray) {
    const currentTime = audioArray[exerciseIndex].currentTime;
    // Verifichiamo in quale intervallo di tempo ci troviamo.
    for (const interval of intervals) {
      if (currentTime >= interval.start && currentTime < interval.end) {
        // Se siamo in un intervallo che richiede show=true, mostriamo il bottone
        // Se show=false, lo nascondiamo
        micArray[exerciseIndex].style.display = interval.show ? 'block' : 'none';
        return; 
      }
    }
    // Se il currentTime supera l’ultimo end, decidi cosa fare, per esempio:
    micArray[exerciseIndex].style.display = 'none';
  }

// play gif button
/*playGifButton.addEventListener('click', function() {
    gif.currentTime = 0;
    gif.play();
});*/