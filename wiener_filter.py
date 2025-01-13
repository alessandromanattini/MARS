import numpy as np
import librosa
import librosa.display
import matplotlib.pyplot as plt 
from scipy.signal import stft, istft

def wiener_filter(audio, noise, sr, frame_size=1024, hop_size=512):
    # Calcolo della STFT per segnale audio e rumore
    _, _, S_audio = stft(audio, fs=sr, nperseg=frame_size, noverlap=hop_size)
    _, _, S_noise = stft(noise, fs=sr, nperseg=frame_size, noverlap=hop_size)

    # Stima della potenza del segnale audio e del rumore
    power_audio = np.abs(S_audio)**2
    power_noise = np.abs(S_noise)**2

    # Calcolo del filtro di Wiener
    H = power_audio / (power_audio + power_noise + 1e-8) # 1e-8 è un valore piccolo per evitare divisioni per zero
    
    # Applicazione il filtro
    S_filtered = H * S_audio

    # Ricostruzione del segnale filtrato nel dominio del tempo
    _, audio_filtered = istft(S_filtered, fs=sr, nperseg=frame_size, noverlap=hop_size)

    return audio_filtered