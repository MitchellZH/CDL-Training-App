from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db  # Import db from extensions

auth_blueprint = Blueprint("auth", __name__)


@auth_blueprint.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    # Validate input
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400

    # Check if the user already exists
    if db.users.find_one({"email": data["email"]}):
        return jsonify({"error": "Email already registered"}), 409

    # Hash the password
    hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256")

    # Default role assignment
    user = {
        "email": data["email"],
        "password": hashed_password,
        "role": "student",  # Default role for all new users
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

    # Find the user by email
    user = db.users.find_one({"email": data["email"]})

    # Validate user and password
    if not user or not check_password_hash(user["password"], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    # Include the role in the JWT token
    access_token = create_access_token(
        identity={"email": user["email"], "role": user.get("role")}
    )
    return jsonify({"token": access_token})
