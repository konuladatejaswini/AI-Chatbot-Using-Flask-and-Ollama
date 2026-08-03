from flask import Flask,render_template,request,jsonify
import ollama
app = Flask(__name__)
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]

    try:
        response = ollama.chat(
            model="llama3.2:1b",
            messages=[
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )

        bot_reply = response["message"]["content"]

    except Exception as e:
        bot_reply = f"Error: {str(e)}"

    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)