const mic_btn = document.querySelector('#mic');
const playback = document.querySelector('.playback');

// Aggiunta: Riferimenti ai campi input per nome e cognome
const nomeInput = document.querySelector('#nome');
const cognomeInput = document.querySelector('#cognome');

mic_btn.addEventListener('click', ToggleMic);

let can_record = false;
let is_recording = false;

let recorder = null;

let file_id = 0;

let chunks = [];

function SetupAudio() {
    console.log("Setup");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                audio: true
            })
            .then(SetupStream)
            .catch(err => {
                console.error(err)
            });
    }
}
SetupAudio();

import { exerciseState } from "./state";

function SetupStream(stream) {
    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = e => {
        chunks.push(e.data);
    };

    recorder.onstop = async e => {
        const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });

        // Prendi nome e cognome dagli input
        const nome = nomeInput.value || "Anonimo"; // Default se il campo è vuoto
        const cognome = cognomeInput.value || "Sconosciuto";

        // Crea il FormData
        const formData = new FormData();
        formData.append("id", file_id.toString());
        formData.append("nome", nome);
        formData.append("cognome", cognome);
        formData.append("audio", blob, `audio_${file_id}.wav`);

        const url = "http://localhost:5500/";
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
            console.error(error.message);
        }

        console.log("Audio inviato con successo");

        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        playback.src = audioURL;
        file_id++;
    };

    can_record = true;
}

function ToggleMic() {
    if (!can_record) return;

    is_recording = !is_recording;

    if (is_recording) {
        recorder.start();
        mic_btn.classList.add("is_recording");
    } else {
        recorder.stop();
        mic_btn.classList.remove("is_recording");
    }
}