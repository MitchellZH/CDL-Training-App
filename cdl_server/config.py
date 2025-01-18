from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env
SECRET_KEY = os.getenv("SECRET_KEY", "fallback_key_for_dev")
MONGO_URI = os.getenv("MONGO_URI")
DEBUG = True
