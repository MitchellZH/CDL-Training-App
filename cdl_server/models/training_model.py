from bson import ObjectId

class TrainingModule:
    def __init__(self, title, description, content, assigned_to=None):
        self.title = title
        self.description = description
        self.content = content
        self.assigned_to = assigned_to or []  # List of user IDs (students)

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "content": self.content,
            "assigned_to": self.assigned_to,
        }

    @staticmethod
    def from_dict(data):
        return TrainingModule(
            title=data["title"],
            description=data["description"],
            content=data["content"],
            assigned_to=data.get("assigned_to", []),
        )
