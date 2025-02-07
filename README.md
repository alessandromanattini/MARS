# MARS: A Prototype for Early Language Screening

### Authors: Alice Lenoci, Alessandro Manattini, Enrico Torres  
**Date:** $(date +'%Y-%m-%d')

## Abstract
MARS is a web application designed for early screening of **Developmental Language Disorder (DLD)** in preschool children. By integrating engaging storylines, interactive elements, and data analysis capabilities, the app provides a user-friendly and effective tool for early detection.

The app features two distinct tests:
- **FRASI**: A sentence repetition task that assesses lexical, memory, and phrasal repetition skills. A **speech-to-text algorithm** transcribes the child's spoken words and stores them in a database.
- **SILLABE**: A rhythm-based test designed to evaluate phonological and anticipatory abilities.

The collected data is stored for further processing, and an AI-powered model will be integrated in future iterations to analyze the recorded audio and assist in detecting potential signs of DLD.

---

## Technology Overview
MARS is built using:
- **Flask** for the backend server.
- **HTML, CSS, JavaScript** for the frontend.
- **Speech-to-text processing** for transcribing responses in the "FRASI" test.
- **SQLAlchemy** for database management.
- **Wiener Filter** for audio denoising.
- **Logging Module** for debugging and monitoring.

---

## Installation and Setup
To run MARS locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/alessandromanattini/MARS.git
cd MARS
```

### 2. Install Dependencies
Ensure you have Python installed. Then, run:
```bash
pip install flask flask-cors sqlalchemy soundfile numpy
```

### 3. Start the Application
Run the Flask server:
```bash
python app.py
```
Then, open your browser and navigate to:
```bash
http://127.0.0.1:5000/
```

---

## Database Structure
MARS uses an SQLite database to store:
- **Users** and their progress in different activities.
- **Exercises** and task completion records.
- **Recorded audio files** for further analysis.

The database schema includes tables such as:
- `Users`
- `Act_1`, `Act_1_Exercise`
- `Act_2`, `Act_3`, `Act_3_Tasks`
- `Audio_Files`

---

## Future Improvements
Planned enhancements include:
- Integration of an **AI-powered model** for analyzing recorded speech data.
- Enhancements to the speech-to-text system for greater accuracy.
- Improved UI/UX for a more intuitive and engaging experience.

---

## Contact
For any questions or collaborations, reach out via GitHub or email.

**Repository:** [https://github.com/alessandromanattini/MARS](https://github.com/alessandromanattini/MARS)


**Link to the report:** [https://drive.google.com/drive/folders/1_brhqwix9eZhTtPuMCXjrQ0LFFAf9Xa5?usp=share_link]
