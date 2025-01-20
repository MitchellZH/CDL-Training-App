from extensions import db


def add_default_role():
    try:
        # Update all users missing the 'role' field with a default role of "student"
        result = db.users.update_many(
            {"role": {"$exists": False}},  # Find users without the 'role' field
            {"$set": {"role": "student"}},  # Add the 'role' field with value "student"
        )
        print(f"Updated {result.modified_count} user(s) with default role.")
    except Exception as e:
        print(f"Error updating users: {e}")


if __name__ == "__main__":
    # add_default_role()
    print(list(db.users.find({}, {"email": 1, "role": 1})))