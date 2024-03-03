from flask import Flask, render_template, url_for, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from datetime import datetime
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
app.config["SECRET_KEY"] = os.urandom(24)
app.config["UPLOAD_FOLDER"] = "static/images"
db = SQLAlchemy(app)


class Mail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    date_sent = db.Column(db.DateTime, default=datetime.utcnow)
    filename = db.Column(db.String(300))  # new column to store the filename

    def __repr__(self):
        return "<SentMail %r>" % self.id


with app.app_context():
    db.create_all()


@app.route("/", methods=["POST", "GET"])
def index():
    emails = Mail.query.order_by(Mail.date_sent).all()
    return render_template("index.html", emails=emails)


@app.route("/send_email", methods=["POST"])
def send_email():
    message = request.form["message"]
    file = request.files["file"]
    filename = secure_filename(file.filename) if file else None

    if file:
        # Save the file to the upload folder
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    new_message = Mail(content=message, filename=filename)

    try:
        db.session.add(new_message)
        db.session.commit()
        flash("Email stored successfully")
        return redirect(url_for("index"))
    except:
        flash("There was an issue storing the email")
        return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
