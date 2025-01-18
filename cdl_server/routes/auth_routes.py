from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db  # Import db from extensions

auth_blueprint = Blueprint("auth", __name__)


@auth_blueprint.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400

    hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256")
    user = {
        "email": data["email"],
        "password": hashed_password,
    }
    try:
        db.users.insert_one(user)
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500


@auth_blueprint.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = db.users.find_one({"email": data["email"]})
    if not user or not check_password_hash(user["password"], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401
    access_token = create_access_token(identity={"email": user["email"]})
    return jsonify({"token": access_token})
