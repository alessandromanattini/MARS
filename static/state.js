// state.js

export const state = {
    currentScreen: 1,
    currentScreenNP: 0,
};

export const gameState = {
    gamePassed: 0,
    gamePassedNP: 0,
    exercises: []
};

export const exerciseState = {
    initialData: '',
    exerciseData: '',
    nome: '',
    cognome: '',
    id: '',
    gameID : 1,
    recordedAudios: [],
    recordedAudiosNP: [],
    recognitionInProgress: false,
    retryActivated: false,
    lastTransc: '',
};

export const recordState = {
    mediaRecorder: null,
    audioChunks: [],
};
    

// Getter e setter
export function getState() {
    return state;
}

export function updateState(updates) {
    Object.assign(state, updates);
}
