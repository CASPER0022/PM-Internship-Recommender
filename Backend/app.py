from flask import Flask, request, jsonify
import PyPDF2, re, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend access

@app.route("/")   # root route
def home():
    return "Hello, Flask is working!"

# Load internships dataset
with open("internships.json", "r") as f:
    internships = json.load(f)

# Extract text from uploaded PDF CV
def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + " "
    return text

# Extract simple keywords
def extract_keywords(text):
    words = re.findall(r'\b\w+\b', text.lower())
    return set(words)

# Recommend internships based on keyword overlap
def recommend_internships(cv_keywords):
    results = []
    for internship in internships:
        required = set([s.lower() for s in internship["skills"]])
        if required:  # avoid divide by zero
            match_score = len(cv_keywords & required) / len(required)
        else:
            match_score = 0
        # Include match score in the result
        internship_with_score = internship.copy()
        internship_with_score["matchScore"] = match_score
        results.append((internship_with_score, match_score))
    results.sort(key=lambda x: x[1], reverse=True)
    return [i[0] for i in results[:5]]

@app.route("/recommend", methods=["POST"])
def recommend():
    file = request.files["cv"]
    text = extract_text_from_pdf(file)
    keywords = extract_keywords(text)
    recs = recommend_internships(keywords)
    return jsonify(recs)

@app.route("/internships", methods=["GET"])
def get_internships():
    """Endpoint to get all available internships for browsing"""
    return jsonify(internships)

if __name__ == "__main__":
    app.run(debug=True)
