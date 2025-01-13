import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, Boolean, LargeBinary, String
from sqlalchemy.orm import declarative_base, scoped_session, sessionmaker
from datetime import datetime
from wiener_filter import wiener_filter
import soundfile as sf
import numpy as np
import logging

# Configurazione del logging
logging.basicConfig(level=logging.DEBUG)

# Configurazione del database SQLite con check_same_thread=False
DATABASE_URL = "sqlite:///audio_files.db"
engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})

# Configurazione di scoped_session per garantire sessioni thread-safe
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)

# Definizione del modello SQLAlchemy
Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'

    id    = Column(Integer, primary_key=True)
    act_1 = Column(Boolean, nullable=False, default=False)
    act_2 = Column(Boolean, nullable=False, default=False)
    act_3 = Column(Boolean, nullable=False, default=False)

class Act_1(Base):
    __tablename__ = 'act_1'

    id = Column(Integer, primary_key=True, autoincrement=False)
    ex_1 = Column(Boolean, nullable=False, default=False)
    ex_2 = Column(Boolean, nullable=False, default=False)
    ex_3 = Column(Boolean, nullable=False, default=False)
    ex_4 = Column(Boolean, nullable=False, default=False)
    ex_5 = Column(Boolean, nullable=False, default=False)
    ex_6 = Column(Boolean, nullable=False, default=False)
    ex_7 = Column(Boolean, nullable=False, default=False)
    ex_8 = Column(Boolean, nullable=False, default=False)
    ex_9 = Column(Boolean, nullable=False, default=False)
    ex_10 = Column(Boolean, nullable=False, default=False)
    ex_11 = Column(Boolean, nullable=False, default=False)
    ex_12 = Column(Boolean, nullable=False, default=False)
    ex_13 = Column(Boolean, nullable=False, default=False)
    ex_14 = Column(Boolean, nullable=False, default=False)

class Act_1_Exercise(Base):
    __tablename__ = 'act_1_exercise'

    id_child = Column(Integer, primary_key=True, autoincrement=False)
    id_ex    = Column(Integer, primary_key=True, autoincrement=False)
    task_1   = Column(Boolean, nullable=False, default=False)
    task_2   = Column(Boolean, nullable=False, default=False)
    trasc   = Column(String, nullable=True)

class Act_2(Base):
    __tablename__ = 'act_2'

    id      = Column(Integer, primary_key=True, autoincrement=False)
    task_1  = Column(Boolean, nullable=False, default=False)
    task_2  = Column(Boolean, nullable=False, default=False)
    task_3  = Column(Boolean, nullable=False, default=False)
    task_4  = Column(Boolean, nullable=False, default=False)
    task_5  = Column(Boolean, nullable=False, default=False)
    task_6  = Column(Boolean, nullable=False, default=False)
    task_7  = Column(Boolean, nullable=False, default=False)

class Act_3(Base):
    __tablename__ = 'act_3'

    id = Column(Integer, primary_key=True, autoincrement=False)
    # TODO: Aspettiamo notize dalla professoressa

class Act_3_Tasks(Base):
    __tablename__ = 'act_3_tasks'

    id_child = Column(Integer, primary_key=True, autoincrement=False)
    id_ex    = Column(Integer, primary_key=True, autoincrement=False)
    # TODO: Waiting for the worms!

class Audio_Files(Base):
    __tablename__ = 'audio_files'

    id_child     = Column(Integer, primary_key=True, autoincrement=False)
    id_act       = Column(Integer, primary_key=True, autoincrement=False)
    id_ex        = Column(Integer, primary_key=True, autoincrement=False)
    id_task      = Column(Integer, primary_key=True, autoincrement=False)

    wav_clean    = Column(LargeBinary, nullable=False)
    wav_filtered = Column(LargeBinary, nullable=True)

# Creazione della tabella (solo se non esistono)
Base.metadata.create_all(engine)

# Inizializzazione dell'app Flask
app = Flask(__name__, static_folder='static')

# Configurazione di CORS per permettere entrambe le origini
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5501", "http://127.0.0.1:5501"]
    }
})

# Funzione per convertire oggetti SQLAlchemy in dizionari
def to_dict(obj):
    return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}

@app.teardown_appcontext
def remove_session(exception=None):
    Session.remove()

@app.route('/user', methods=["POST"])
def query_user_id():
    session = Session()
    try:
        # Getting the user_id from the request
        user_id = request.form.get("id")
        if not user_id:
            return jsonify({"error": "ID not provided"}), 400
        
        # Searching for the user in the database
        user = session.query(Users).filter(Users.id == user_id).first()
        
        if user is None:
            new_user = Users(id=user_id, act_1=False, act_2=False, act_3=False)
            session.add(new_user)
            session.commit()

            print("SUCCESS: nuovo utente creato con ID =", user_id)
            return jsonify({
                "act_1":        False,
                "act_1_ex" :    [],
                "act_2":        False,
                "act_2_tasks" : [],
                # TODO: "act_3": user.act_3 e ex
            }), 200
        else :
            print("DEBUG ==> Utente già presente nel DB, ID =", user_id)
        
        # Create a list of all the exercises done in act_1
        act1 = session.query(Act_1).filter(Act_1.id == user_id).all() if user.act_1 else []
        act2 = session.query(Act_2).filter(Act_2.id == user_id).all() if user.act_2 else []

        # Converti i risultati in dizionari per JSON serialization
        act1_data = [to_dict(act) for act in act1]
        act2_data = [to_dict(act) for act in act2]

        return jsonify({
            "act_1":        user.act_1,
            "act_1_ex" :    act1_data, # Returning all the exercises done in act_1 as True or False
            "act_2":        user.act_2,
            "act_2_tasks" : act2_data, # Returning all the tasks done in act_2 as True or False
            # TODO: "act_3": user.act_3 e ex
        })
    except Exception as e:
        session.rollback()
        print(f"Errore: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    finally:
        session.close()



@app.route('/audio', methods=["POST"])
def audio():
    session = Session()
    try:
        # Recupera i dati dal form
        user_id = request.form.get("id")
        act = request.form.get("act")
        ex = request.form.get("ex")  # Solo per act_1
        task = request.form.get("task")
        trasc = request.form.get("trasc")  # Solo per act_1
        audio_file = request.files.get("audio")

        print(f"==> [DEBUG] user_id={user_id}, act={act}, ex={ex}, task={task}, trasc={trasc}")

        if not user_id or not act or not task or not audio_file:
            return jsonify({"error": "Missing required fields"}), 400

        # Converti i dati in interi dove necessario
        user_id = int(user_id)
        act = int(act)
        ex = int(ex) if ex else None
        task = int(task)
        trasc = str(trasc) if trasc else None

        #print_table_content(session, Act_1_Exercise, user_id)

        if act == 1:  # Solo per `act_1`
            if not trasc or trasc.strip() == "":
                print(f"[WARNING] 'trasc' è vuoto o non fornito per user_id={user_id}, ex={ex}, task={task}.")
            else:
                print(f"[DEBUG] 'trasc' ricevuto correttamente: {trasc}")

        # Controlla la validità di act
        if act not in [1, 2]:
            return jsonify({"error": f"Invalid activity: {act}"}), 400

        # Gestione per act_1 (riconoscimento)
        if act == 1:
            if not ex or ex < 1 or ex > 14:
                return jsonify({"error": f"Invalid exercise for act_1: {ex}"}), 400

            # Aggiorna act_1 in Users
            session.query(Users).filter(Users.id == user_id).update({Users.act_1: True})

            # Aggiorna o crea l'esercizio in Act_1
            ex_attr = f"ex_{ex}"
            if hasattr(Act_1, ex_attr):
                session.query(Act_1).filter(Act_1.id == user_id).update({ex_attr: True})
            else:
                session.add(Act_1(id=user_id, **{ex_attr: True}))

            # Aggiorna o crea il task in Act_1_Exercise
            task_attr = f"task_{task}"
            if hasattr(Act_1_Exercise, task_attr):
                session.query(Act_1_Exercise).filter(
                    Act_1_Exercise.id_child == user_id, Act_1_Exercise.id_ex == ex
                ).update({task_attr: True, Act_1_Exercise.trasc: trasc})
            else:
                session.add(Act_1_Exercise(
                    id_child=user_id, id_ex=ex, **{task_attr: True}, trasc=trasc
                ))

        # Gestione per act_2 (sillabe)
        elif act == 2:
            if task < 1 or task > 7:
                return jsonify({"error": f"Invalid task for act_2: {task}"}), 400

            # Aggiorna act_2 in Users
            session.query(Users).filter(Users.id == user_id).update({Users.act_2: True})

            # Aggiorna o crea il task in Act_2
            task_attr = f"task_{task}"
            if hasattr(Act_2, task_attr):
                session.query(Act_2).filter(Act_2.id == user_id).update({task_attr: True})
            else:
                session.add(Act_2(id=user_id, **{task_attr: True}))

        # Salva il file audio
        audio_blob = audio_file.read()
        existing_audio = session.query(Audio_Files).filter_by(
            id_child=user_id, id_act=act, id_ex=ex, id_task=task
        ).first()

        if existing_audio:
            existing_audio.wav_clean = audio_blob
            print(f"[DEBUG] Aggiornamento audio esistente per user_id={user_id}, act={act}, ex={ex}, task={task}")
        else:
            session.add(Audio_Files(
                id_child=user_id, id_act=act, id_ex=ex, id_task=task,
                wav_clean=audio_blob, wav_filtered=None
            ))

        print(f"[DEBUG] Nuovo file audio aggiunto per user_id={user_id}, act={act}, ex={ex}, task={task}, trasc={trasc}")
        save_audio_to_filesystem(user_id, act, ex, task, audio_blob)
        # Commit delle modifiche
        session.commit()
        return jsonify({"status": "success"}), 200

    except Exception as e:
        session.rollback()
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    finally:
        session.close()


@app.route('/final', methods=["POST"])
def return_audio_file():
    session = Session()

    #print_table_content(session, Act_1_Exercise, 6075)

    try:
        # Get the user_id from the request
        user_id = request.form.get("id")
        if not user_id:
            return jsonify({"error": "ID not provided"}), 400

        try:
            user_id = int(user_id)
        except ValueError:
            return jsonify({"error": "Invalid user ID"}), 400

        # Recupera tutti i file audio per act_1 e act_2
        act1_ex_tasks = session.query(Audio_Files).filter(Audio_Files.id_child == user_id, Audio_Files.id_act == 1).all()
        act2_tasks = session.query(Audio_Files).filter(Audio_Files.id_child == user_id, Audio_Files.id_act == 2).all()
        # TODO: Recuperare act3

        # Converti gli oggetti in dizionari
        act1_ex_tasks_data = [to_dict(audio) for audio in act1_ex_tasks]
        act2_tasks_data = [to_dict(audio) for audio in act2_tasks]

        return jsonify({
            "act1_ex_tasks": act1_ex_tasks_data,
            "act2_tasks": act2_tasks_data,
            # TODO: aggiungi act3
        })
    except Exception as e:
        print(f"Errore: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    finally:
        session.close()

def to_dict(obj):
    return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}

def print_table_content(session, table, user_id):
    print(f"[DEBUG] --------------Contenuto della tabella {table.__tablename__} per user_id={user_id}--------------")
    rows = session.query(table).filter(table.id_child == user_id).all()
    for row in rows:
        print(to_dict(row))

def save_audio_to_filesystem(user_id, act, ex, task, audio_blob):
    """
    Salva il file audio nel filesystem organizzato per utente, attività, esercizio e task.
    """
    try:
        # Definisci il percorso base
        base_dir = os.path.join(app.root_path, 'audio_files', f'user_{user_id}')
        act_dir = os.path.join(base_dir, f'act_{act}')
        exercise_dir = os.path.join(act_dir, f'exercise_{ex}' if ex else 'task')

        # Crea le directory se non esistono
        os.makedirs(exercise_dir, exist_ok=True)

        # Definisci il nome del file
        filename = f'ID_{user_id}_ex{ex}.wav'

        # Percorso completo del file
        file_path = os.path.join(exercise_dir, filename)

        # Salva il file
        with open(file_path, 'wb') as f:
            f.write(audio_blob)

        print(f"[DEBUG] Audio salvato su filesystem: {file_path}")
    except Exception as e:
        print(f"[ERROR] Errore nel salvare l'audio su filesystem: {e}")

@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

@app.route('/Graphic/<path:filename>')
def serve_graphic(filename):
    # Se “Graphic” sta in “Mars_AUI/Graphic”
    return send_from_directory(os.path.join(app.root_path, 'Graphic'), filename)

@app.route('/Audio/<path:filename>')
def serve_audio(filename):
    # Se “Audio” sta in “Mars_AUI/Audio”
    return send_from_directory(os.path.join(app.root_path, 'Audio'), filename)



if __name__ == "__main__":
    app.run("localhost", 5501, debug=True)
