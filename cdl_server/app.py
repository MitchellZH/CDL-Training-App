from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.auth_routes import auth_blueprint
from routes.training_routes import training_blueprint
from config import SECRET_KEY
from extensions import db # Import db from extensions

app = Flask(__name__)
app.config["SECRET_KEY"] = SECRET_KEY
CORS(app)

# Initialize JWT Manager
jwt = JWTManager(app)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Register blueprints
app.register_blueprint(auth_blueprint, url_prefix="/api/auth")
app.register_blueprint(training_blueprint, url_prefix="/api/training")

if __name__ == "__main__":
    app.run(debug=True)
