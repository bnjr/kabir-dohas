from flask import Flask, jsonify
from flask_cors import CORS
# from db.kabir_dohas import dohas
from airtable import Airtable
import os
import random

app = Flask(__name__)
CORS(app, origins=["https://bnjr.github.io"])

AIRTABLE_API_KEY = os.environ.get("AIRTABLE_API_KEY")
AIRTABLE_BASE_ID = os.environ.get("AIRTABLE_BASE_ID")
AIRTABLE_TABLE_NAME = "Dohas"

airtable = Airtable(AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, api_key=AIRTABLE_API_KEY)

@app.route("/doha", methods=["GET"])
def get_doha():
    records = airtable.get_all()
    selected_record = random.choice(records)
    selected_doha = selected_record["fields"]
    return jsonify(selected_doha)

if __name__ == "__main__":
    app.run()
