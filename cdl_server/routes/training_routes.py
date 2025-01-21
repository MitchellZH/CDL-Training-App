# CDL_SERVER/routes/training_routes.py
from flask import Blueprint, request, jsonify
from extensions import db
from bson.objectid import ObjectId

training_blueprint = Blueprint("training", __name__)


# Create a training module
@training_blueprint.route("/training-modules", methods=["POST"])
def create_training_module():
    data = request.get_json()
    if not data.get("title") or not data.get("content"):
        return jsonify({"error": "Title and content are required"}), 400

    new_module = {
        "title": data["title"],
        "description": data.get("description", ""),
        "content": data["content"],
        "assigned_to": [],
    }
    result = db.training_modules.insert_one(new_module)
    return (
        jsonify({"message": "Training module created", "id": str(result.inserted_id)}),
        201,
    )


# Get all training modules
@training_blueprint.route("/training-modules", methods=["GET"])
def get_training_modules():
    modules = list(db.training_modules.find())
    for module in modules:
        module["_id"] = str(module["_id"])
    return jsonify(modules)


# Get a specific training module
@training_blueprint.route("/training-modules/<id>", methods=["GET"])
def get_training_module(id):
    module = db.training_modules.find_one({"_id": ObjectId(id)})
    if not module:
        return jsonify({"error": "Module not found"}), 404
    module["_id"] = str(module["_id"])
    return jsonify(module)


# Update a training module
@training_blueprint.route("/training-modules/<id>", methods=["PUT"])
def update_training_module(id):
    data = request.get_json()
    updated_data = {
        "title": data.get("title"),
        "description": data.get("description"),
        "content": data.get("content"),
    }
    db.training_modules.update_one({"_id": ObjectId(id)}, {"$set": updated_data})
    return jsonify({"message": "Training module updated"})


# Delete a training module
@training_blueprint.route("/training-modules/<id>", methods=["DELETE"])
def delete_training_module(id):
    result = db.training_modules.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Module not found"}), 404
    return jsonify({"message": "Training module deleted"})
