from flask import Flask, jsonify
from flask_cors import CORS
from db.kabir_dohas import dohas
import random

app = Flask(__name__)
CORS(app, origins=["https://bnjr.github.io"])

@app.route("/doha", methods=["GET"])
def get_doha():
    selected_doha = random.choice(dohas)
    return jsonify(selected_doha)

if __name__ == "__main__":
    app.run()
