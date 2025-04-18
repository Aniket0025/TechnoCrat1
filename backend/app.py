from flask import Flask, jsonify
from flask_cors import CORS
from scraper import scrape_earthhero

app = Flask(__name__)
CORS(app)

@app.route("/api/products")
def get_products():
    products = scrape_earthhero()
    return jsonify(products)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
