from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configurazione del database SQLite
DATABASE_URL = "sqlite:///audio_files.db"
engine = create_engine(DATABASE_URL, echo=True)
Session = sessionmaker(bind=engine)
session = Session()

# Definizione del modello SQLAlchemy per i metadati del file audio
Base = declarative_base()

class AudioFile(Base):
    __tablename__ = 'audio_files'
    
    id = Column(String, primary_key=True, autoincrement=True)
    file_id = Column(String, nullable=False)
    nome = Column(String, nullable=False)
    cognome = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

# Creazione della tabella
Base.metadata.create_all(engine)

@app.route("/audio/<id>", methods=["GET"])
def get_audio_file(id):
    try:
        # Recupera i dati dal database
        audio_file = session.query(AudioFile).filter_by(id=id).first()
        if not audio_file:
            return jsonify({"error": "File not found"}), 404

        # Ritorna i dati come JSON
        return jsonify({
            "id": audio_file.id,
            "file_id": audio_file.file_id,
            "nome": audio_file.nome,
            "cognome": audio_file.cognome,
            "timestamp": audio_file.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        }), 200
    except Exception as e:
        print(f"Errore: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    app.run("localhost", 5500, debug=True)
