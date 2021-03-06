from __main__ import app
# import json # use json.dumps(...) to serialize python objects
from flask import request, jsonify
import spacy
from nlp import find_links

nlp = spacy.load("en_core_web_sm")


@app.route('/pos', methods=['GET'])
def pos():
    sentence = request.args['sentence']
    # print('Print logs', flush=True) # another way to print logs
    app.logger.info(sentence)  # or use request.get_json for json data in fetch
    doc = nlp(sentence)
    return jsonify(status=True, message="success", data=doc.to_json())


@app.route('/test', methods=['GET'])
def test():
    return jsonify(status=True, message="success", data="Hello from KORI backend!")


@app.route('/discover-links', methods=['POST'])
def discover_links():
    data = request.get_json()
    links = find_links(data['charts'], data['text'],
                       data['sentenceOffset'], data['blockKey'])
    # app.logger.info(links)
    return jsonify(status=True, message='success', data=links)
