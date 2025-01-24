import {state, gameState, exerciseState, recordState} from './state.js';
/* 
   ------------------------------------------------------------------------.-------------
   GLOBAL VARIABLES & CONSTANTS
   -------------------------------------------------------------------------------------
   Below are all global variables and constants used throughout the game.
   No logic changes have been made, only code reorganization and added comments.
*/

// Player data and game state
//export let initialData = '';
//export let exerciseData = '';
//export let nome = '';
//export let cognome = '';
//export let cf = '';

export const totalScreens = 59; 

export const body = document.body;

//export let currentScreen = 1; 
//export let currentScreenNP = 0;
//export let gamePassed = 0; // Number of completed exercises
//export let gamePassedNP = 0; // Number of completed non-words exercises
export let retryActivated = false;
export let exercises = [];
export let recognitionInProgress = false;
export let recordedAudios = [];
export let recordedAudiosNP = [];

// Phrases for voice recognition exercises
export const cardsPhrases = [
    "Il gatto con il fiocco è grigio",
    "I gatti hanno mangiato il pesce",
    "Il latte è tirato dal cane",
    "Cosa ha bevuto il cane?",
    "Povero gatto",
    "Il cane che i gatti spingono è blu",
    "Il cane blu",
    "Il gatto lo lava",
    "I gatti bevono il latte",
    "Il gatto si lava",
    "Il cane spinto dal gatto",
    "Il cane rosso gli da il latte",
    "Chi lavano i gatti?",
    "Il cane rosso",
];

// Audio settings
export const delayBetweenAudios = 1500; 
export const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Story audio files
export const zeroAudio = new Audio('../Audio/ciao_sono_Mars.mp3');
export const firstAudio = new Audio('../Audio/facciamo_un_gioco.mp3');
export const secondAudio = new Audio('../Audio/tocca_un_pianeta.mp3');
export const thirdAudio = new Audio('../Audio/foundMe.mp3');
export const fourthAudio = new Audio('../Audio/youFoundMe.mp3');
export const fifthAudio = new Audio('../Audio/niron1.mp3');
export const sixthAudio = new Audio('../Audio/niron2.mp3');
export const seventhAudio = new Audio('../Audio/niron3.mp3');
export const eighthAudio = new Audio('../Audio/niron4.mp3');
export const ninthAudio = new Audio('../Audio/navicella_rotta.mp3');
export const tenthAudio = new Audio('../Audio/aiutami_ad_aggiustarla.mp3');

// Test audio files
export const readyAudio = new Audio('../Audio/testReady.mp3');
export const exampleAudio = new Audio('../Audio/new_tutorial.mp3');
export const thisIsARatAudio = new Audio('../Audio/pressGreen.mp3');
export const yourTurnAudio = new Audio('../Audio/yourTurn.mp3');
export const pressGreenAudio = new Audio('../Audio/pressGreen.mp3');
export const exampleFinishedAudio = new Audio('../Audio/exampleFinished.mp3');
export const startGameAudio = new Audio('../Audio/testBlueCard.mp3');
export const startGameAudioNP = new Audio('../Audio/NPbegin.mp3');
export const tutorial_np = new Audio('../Audio/tutorial_np.mp3');
export const tutorial_np1 = new Audio('../Audio/premi_verde.mp3');
export const tutorial_npEnd = new Audio('../Audio/fineTutorialNP.mp3');

// Recognition game exercises audio
export const firstExerciseAudio = new Audio('../Audio/Game/game0.mp3');
export const firstExerciseRewardAudio = new Audio('../Audio/Game/game0Reward.mp3');
export const secondExerciseAudio = new Audio('../Audio/Game/game1.mp3');
export const secondExerciseRewardAudio = new Audio('../Audio/Game/game1Reward.mp3');
export const thirdExerciseAudio = new Audio('../Audio/Game/game2.mp3');
export const thirdExerciseRewardAudio = new Audio('../Audio/Game/game2Reward.mp3');
export const fouthExerciseAudio = new Audio('../Audio/Game/game3.mp3');
export const fourthExerciseRewardAudio = new Audio('../Audio/Game/game3Reward.mp3');
export const fifthExerciseAudio = new Audio('../Audio/Game/game4.mp3');
export const fifthExerciseRewardAudio = new Audio('../Audio/Game/game4Reward.mp3');
export const sixthExerciseAudio = new Audio('../Audio/Game/game5.mp3');
export const sixthExerciseRewardAudio = new Audio('../Audio/Game/game5Reward.mp3');
export const seventhExerciseAudio = new Audio('../Audio/Game/game6.mp3');
export const seventhExerciseRewardAudio = new Audio('../Audio/Game/game6Reward.mp3');
export const eigthExerciseAudio = new Audio('../Audio/Game/game7.mp3');
export const eightExerciseRewardAudio = new Audio('../Audio/Game/game7Reward.mp3');
export const ninthExerciseAudio = new Audio('../Audio/Game/game8.mp3');
export const ninthExerciseRewardAudio = new Audio('../Audio/Game/game8Reward.mp3');
export const tenthExerciseAudio = new Audio('../Audio/Game/game9.mp3');
export const tenthExerciseRewardAudio = new Audio('../Audio/Game/game9Reward.mp3');
export const eleventhExerciseAudio = new Audio('../Audio/Game/game10.mp3');
export const eleventhExerciseRewardAudio = new Audio('../Audio/Game/game10Reward.mp3');
export const twelfthExerciseAudio = new Audio('../Audio/Game/game11.mp3');
export const twelfthExerciseRewardAudio = new Audio('../Audio/Game/game10Reward.mp3');
export const thirteenthExerciseAudio = new Audio('../Audio/Game/game12.mp3');
export const thirteenthExerciseRewardAudio = new Audio('../Audio/Game/game10Reward.mp3');
export const fourteenthExerciseAudio = new Audio('../Audio/Game/game13.mp3');
export const fourtheenthExerciseRewardAudio = new Audio('../Audio/Game/game13Reward.mp3');

// Non-words audio
export const firstExerciseAudioNP = new Audio('../Audio/Game/npaudio2.mp3');
export const firstExerciseRewardAudioNP = new Audio('../Audio/Game/reward_np_1.mp3');
export const secondExerciseAudioNP = new Audio('../Audio/Game/npaudio3.mp3');
export const secondExerciseRewardAudioNP = new Audio('../Audio/Game/reward_np_2.mp3');
export const thirdExcerciseAudioNP = new Audio('../Audio/Game/npaudio4.mp3');
export const thirdExerciseRewardAudioNP = new Audio('../Audio/Game/reward_np_3.mp3');
export const fourthExerciseAudioNP = new Audio('../Audio/Game/npaudio5.mp3');
export const fourthExerciseRewardAudioNP = new Audio('../Audio/Game/reward_np_4.mp3');
export const fifthExerciseAudioNP = new Audio('../Audio/Game/npaudio6.mp3');
export const fifthExerciseRewardAudioNP = new Audio('../Audio/Game/reward_np_5.mp3');
export const sixthExerciseAudioNP = new Audio('../Audio/Game/npaudio7.mp3');
export const sixthExerciseRewardAudioNP = new Audio('../Audio/Game/reward_np_6.mp3');
export const spellExerciseAudioNP = new Audio('../Audio/Game/formula_magica.mp3');
export const seventhExerciseAudioNP = new Audio('../Audio/Game/npaudio1.mp3');
export const seventhExerciseRewardAudioNP = new Audio('../Audio/Game/end_np.mp3');

// Arrays of audio references
export const phrasesAudio = [
    firstExerciseAudio, secondExerciseAudio, thirdExerciseAudio, fouthExerciseAudio,
    fifthExerciseAudio, sixthExerciseAudio, seventhExerciseAudio, eigthExerciseAudio,
    ninthExerciseAudio, tenthExerciseAudio, eleventhExerciseAudio, twelfthExerciseAudio,
    thirteenthExerciseAudio, fourteenthExerciseAudio
];

export const phrasesAudioRew = [
    firstExerciseRewardAudio, secondExerciseRewardAudio, thirdExerciseRewardAudio, fourthExerciseRewardAudio,
    fifthExerciseRewardAudio, sixthExerciseRewardAudio, seventhExerciseRewardAudio, eightExerciseRewardAudio,
    ninthExerciseRewardAudio, tenthExerciseRewardAudio, eleventhExerciseRewardAudio, twelfthExerciseRewardAudio,
    thirteenthExerciseRewardAudio, fourtheenthExerciseRewardAudio
];

export const phrasesnp = [firstExerciseAudioNP, secondExerciseAudioNP, thirdExcerciseAudioNP, fourthExerciseAudioNP,
    fifthExerciseAudioNP, sixthExerciseAudioNP, seventhExerciseAudioNP
];

export const storyAudioFilesNP = [
    zeroAudio, firstAudio, secondAudio, thirdAudio, fourthAudio, fifthAudio, sixthAudio,
    seventhAudio, eighthAudio, ninthAudio, tenthAudio, tutorial_np, tutorial_np1, tutorial_npEnd
];

// DOM elements
export const gif = document.getElementById('gifMars');
export const backHomeButtons = document.querySelectorAll('.backHomeButton');
export const menu = document.getElementById('menu');
export const menuButton = document.getElementById('menuButton');
export const homeButton = document.getElementById('homeButton');
export const dataButton = document.getElementById('dataButton');
export const aboutButton = document.getElementById('aboutButton');
export const saveButton = document.getElementById('savingButton');
export const intro1Rec = document.getElementById('intro1');
export const intro2Rec = document.getElementById('intro2');
export const introNP1 = document.getElementById('introNP1');
export const findMeButton1 = document.getElementById('firstPos');
export const findMeButton2 = document.getElementById('secondPos');
export const nironPlanetButton = document.getElementById('NironPlanet');
export const startNironGameButton = document.getElementById('startNironGame');
export const nonWordsButton = document.getElementById('nonParoleButton'); 
export const voiceRecognitionButton = document.getElementById('voiceRecognitionButton');
export const nextButtons = document.querySelectorAll('.next-button');
export const backButtons = document.querySelectorAll('.back-button');
export const skipBtnNiron = document.getElementById('skipBtn');
export const skipBtnTutorialFirst = document.getElementById('skipBtnTutorial');
export const screens = document.querySelectorAll('.screen');
export const touchImg = document.getElementById('touchNiron');
export const cardExample = document.getElementById('CardGameEx');
export const nascondinoNP = document.getElementById('nascondino');
export const findMeButton3 = document.getElementById('thirdPos');
export const findMeButton4 = document.getElementById('fourthPos');
export const crashPlanetButton = document.getElementById('CrashPlanet');
export const endGif = document.getElementById('endGif');
export const endNPintro = document.getElementById('startNPGame');
export const NPtutorial = document.getElementById('NPTutorial');
export const playGifButton = document.getElementById('playGifButton');


export const playT = document.getElementById('playTutorial');
export const recT = document.getElementById('recTutorial');
export const sendT = document.getElementById('sendTutorial');
export const retryT = document.getElementById('retryT');

export const endNP = document.getElementById('NPend');
export const playNPT = document.getElementById('playNP0');
export const sendNPT = document.getElementById('sendResultNP0');
export const retryNPT = document.getElementById('retryNP0');

// Buttons arrays
export const startRecButtons = [
    document.getElementById('startRecognition'),
    document.getElementById('startRecognition1'),
    document.getElementById('startRecognition2'),
    document.getElementById('startRecognition3'),
    document.getElementById('startRecognition4'),
    document.getElementById('startRecognition5'),
    document.getElementById('startRecognition6'),
    document.getElementById('startRecognition7'),
    document.getElementById('startRecognition8'),
    document.getElementById('startRecognition9'),
    document.getElementById('startRecognition10'),
    document.getElementById('startRecognition11'),
    document.getElementById('startRecognition12'),
    document.getElementById('startRecognition13')
];

export const maskAnswerDivs = [
    document.getElementById('mask'),
    document.getElementById('mask1'),
    document.getElementById('mask2'),
    document.getElementById('mask3'),
    document.getElementById('mask4'),
    document.getElementById('mask5'),
    document.getElementById('mask6'),
    document.getElementById('mask7'),
    document.getElementById('mask8'),
    document.getElementById('mask9'),
    document.getElementById('mask10'),
    document.getElementById('mask11'),
    document.getElementById('mask12'),
    document.getElementById('mask13')
];

export const maskAnswerDivsNP = [
    document.getElementById('maskNP1'),
    document.getElementById('maskNP2'),
    document.getElementById('maskNP3'),
    document.getElementById('maskNP4'),
    document.getElementById('maskNP5'),
    document.getElementById('maskNP6'),
    document.getElementById('maskNP7')
];

export const sendResultButtons = [
    document.getElementById('sendResult'),
    document.getElementById('sendResult1'),
    document.getElementById('sendResult2'),
    document.getElementById('sendResult3'),
    document.getElementById('sendResult4'),
    document.getElementById('sendResult5'),
    document.getElementById('sendResult6'),
    document.getElementById('sendResult7'),
    document.getElementById('sendResult8'),
    document.getElementById('sendResult9'),
    document.getElementById('sendResult10'),
    document.getElementById('sendResult11'),
    document.getElementById('sendResult12'),
    document.getElementById('sendResult13')
];

export const sendResultButtonsNP = [
    document.getElementById('sendResultNP1'),
    document.getElementById('sendResultNP2'),
    document.getElementById('sendResultNP3'),
    document.getElementById('sendResultNP4'),
    document.getElementById('sendResultNP5'),
    document.getElementById('sendResultNP6'),
    document.getElementById('sendResultNP7')
];

export const sendNP1 = document.getElementById('sendResultNP1');
export const sendNP2 = document.getElementById('sendResultNP2');
export const sendNP3 = document.getElementById('sendResultNP3');
export const sendNP4 = document.getElementById('sendResultNP4');
export const sendNP5 = document.getElementById('sendResultNP5');
export const sendNP6 = document.getElementById('sendResultNP6');
export const lastNP = document.getElementById('spell');
export const sendNP7 = document.getElementById('sendResultNP7');

export const retryButtons = [
    document.getElementById('retry'),
    document.getElementById('retry1'),
    document.getElementById('retry2'),
    document.getElementById('retry3'),
    document.getElementById('retry4'),
    document.getElementById('retry5'),
    document.getElementById('retry6'),
    document.getElementById('retry7'),
    document.getElementById('retry8'),
    document.getElementById('retry9'),
    document.getElementById('retry10'),
    document.getElementById('retry11'),
    document.getElementById('retry12'),
    document.getElementById('retry13')
];

export const retryButtonsNP = [
    document.getElementById('retryNP1'),
    document.getElementById('retryNP2'),
    document.getElementById('retryNP3'),
    document.getElementById('retryNP4'),
    document.getElementById('retryNP5'),
    document.getElementById('retryNP6'),
    document.getElementById('retryNP7')
];

export const playButtons = [
    document.getElementById('play'),
    document.getElementById('play1'),
    document.getElementById('play2'),
    document.getElementById('play3'),
    document.getElementById('play4'),
    document.getElementById('play5'),
    document.getElementById('play6'),
    document.getElementById('play7'),
    document.getElementById('play8'),
    document.getElementById('play9'),
    document.getElementById('play10'),
    document.getElementById('play11'),
    document.getElementById('play12'),
    document.getElementById('play13')
];

export const playButtonsNP = [
    document.getElementById('playNP1'),
    document.getElementById('playNP2'),
    document.getElementById('playNP3'),
    document.getElementById('playNP4'),
    document.getElementById('playNP5'),
    document.getElementById('playNP6'),
    document.getElementById('playNP7')
];

export const cardButtons = [
    document.getElementById('CardGame1'),
    document.getElementById('CardGame2'),
    document.getElementById('CardGame3'),
    document.getElementById('CardGame4'),
    document.getElementById('CardGame5'),
    document.getElementById('CardGame6'),
    document.getElementById('CardGame7'),
    document.getElementById('CardGame8'),
    document.getElementById('CardGame9'),
    document.getElementById('CardGame10'),
    document.getElementById('CardGame11'),
    document.getElementById('CardGame12'),
    document.getElementById('CardGame13')
];

export const micNP = [
    document.getElementById('micNP1'),
    document.getElementById('micNP2'),
    document.getElementById('micNP3'),
    document.getElementById('micNP4'),
    document.getElementById('micNP5'),
    document.getElementById('micNP6'),
    document.getElementById('micNP7')
];

// Initial visibility settings (unchanged)
startNironGameButton.style.display = 'none';
recT.style.display = 'none';
sendT.style.display = 'none';

sendNPT.style.display = 'none';

startRecButtons.forEach(button => {   
    button.disabled = true; 
    button.style.display = 'none';
    button.style.cursor = 'default'; 
});

micNP.forEach(button => {
    button.disabled = true;
    button.style.display = 'none';
    button.style.cursor = 'default';
});
 
sendResultButtons.forEach(button => button.style.display = 'none');
playButtons.forEach(button => button.style.display = 'block');
maskAnswerDivsNP.forEach(div => div.style.display = 'none');
sendResultButtonsNP.forEach(button => button.style.display = 'none');
playButtonsNP.forEach(button => button.style.display = 'block');

// Background arrays
export const backgrounds = [
    '../Graphic/Homepage_12.jpg','../Graphic/cleanBackground2.jpg','../Graphic/cleanBackground2.jpg',
    '../Graphic/secondScreen.jpg','../Graphic/secondScreen2.jpg','../Graphic/cleanBackground.jpg',
    '../Graphic/riconoscimento/Nascondino1.jpg','../Graphic/riconoscimento/Nascondino2.jpg','../Graphic/cleanBackground2.jpg',
    '../Graphic/riconoscimento/Niron_1.jpg','../Graphic/riconoscimento/example1.jpg', '../Graphic/riconoscimento/testCard1.jpg', '../Graphic/riconoscimento/RA1.jpg',
    '../Graphic/riconoscimento/RA_Award.jpg','../Graphic/riconoscimento/RB1.jpg','../Graphic/riconoscimento/RB_Award.jpg','../Graphic/riconoscimento/RC1.jpg','../Graphic/riconoscimento/RC_Award.jpg',
    '../Graphic/riconoscimento/RD1.jpg','../Graphic/riconoscimento/RD_Award.jpg','../Graphic/riconoscimento/RE1.jpg',
    '../Graphic/riconoscimento/RE_Award.jpg','../Graphic/riconoscimento/RF1.jpg','../Graphic/riconoscimento/RF_Award.jpg',
    '../Graphic/riconoscimento/RG1.jpg','../Graphic//riconoscimento/RG_Award.jpg','../Graphic/riconoscimento/RH1.jpg','../Graphic/riconoscimento/RH_Award.jpg',
    '../Graphic/riconoscimento/RI1.jpg','../Graphic/riconoscimento/RI_Award.jpg','../Graphic/riconoscimento/RJ1.jpg',
    '../Graphic/riconoscimento/RJ_Award.jpg','../Graphic/riconoscimento/RK1.jpg','../Graphic/riconoscimento/RK_Award.jpg',
    '../Graphic/riconoscimento/RM1.jpg','../Graphic/riconoscimento/RM_Award.jpg','../Graphic/riconoscimento/RN1.jpg','../Graphic/riconoscimento/RN_Award.jpg',
    '../Graphic/riconoscimento/RL1.jpg','../Graphic/riconoscimento/RL_Award.jpg',
];

export const backgroundsNonWords = [
    '../Graphic/sillabe/blanc.png','../Graphic/secondScreen.jpg','../Graphic/secondScreen2.jpg',
    '../Graphic/sillabe/Nascondino1np.jpg','../Graphic/sillabe/Nascondino2np.jpg', '../Graphic/sillabe/NPbegin.jpg',
    '../Graphic/sillabe/blanc.png','../Graphic/sillabe/crash1.png','../Graphic/sillabe/crash2.png','../Graphic/sillabe/tutorialNP.png',
    '../Graphic/sillabe/backNP.png','../Graphic/sillabe/rocket1.png','../Graphic/sillabe/backNP.png','../Graphic/sillabe/rocket2.png',
    '../Graphic/sillabe/backNP.png','../Graphic/sillabe/rocket3.png','../Graphic/sillabe/backNP.png','../Graphic/sillabe/rocket4.png',
    '../Graphic/sillabe/backNP.png','../Graphic/sillabe/rocket5.png','../Graphic/sillabe/backNP.png','../Graphic/sillabe/rocket6A.png',
    '../Graphic/sillabe/rocket6B.png','../Graphic/sillabe/backNP.png','../Graphic/sillabe/completeNP.png',
];

// Media Recorder variables
//export let mediaRecorder;
//export let audioChunks = [];

export function setCurrentScreenNP(value) {
    state.currentScreenNP = value; 
}

export function getCurrentScreen() {
    return state.currentScreen;
}

export function incrementCurrentScreen() {
    state.currentScreen++;
}


export function incrementGamePassed() {
    gameState.gamePassed++;
}

export function incrementGamePassedNP() {
    gameState.gamePassedNP++;
}


export function getId() { return exerciseState.id; }
export function setId(value) { exerciseState.id = value; return value;}