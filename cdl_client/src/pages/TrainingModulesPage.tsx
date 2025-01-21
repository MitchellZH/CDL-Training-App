import React, { useEffect, useState } from "react";
import {
  createTrainingModule,
  getTrainingModules,
  updateTrainingModule,
  deleteTrainingModule,
} from "../api/trainingModules";

interface TrainingModule {
  _id: string;
  title: string;
  description?: string;
  content: string;
}

const TrainingModulesPage: React.FC = () => {
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [newModule, setNewModule] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [editingModule, setEditingModule] = useState<TrainingModule | null>(
    null
  );

  // Fetch modules on page load
  useEffect(() => {
    const fetchModules = async () => {
      const data = await getTrainingModules();
      setModules(data);
    };
    fetchModules();
  }, []);

  // Handle form submission for adding/updating modules
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingModule) {
      await updateTrainingModule(editingModule._id, newModule);
    } else {
      await createTrainingModule(newModule);
    }
    setNewModule({ title: "", description: "", content: "" });
    setEditingModule(null);
    const data = await getTrainingModules();
    setModules(data);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    await deleteTrainingModule(id);
    const data = await getTrainingModules();
    setModules(data);
  };

  // Handle edit
  const handleEdit = (module: TrainingModule) => {
    setEditingModule(module);
    setNewModule({
      title: module.title,
      description: module.description ?? "",
      content: module.content,
    });
  };

  return (
    <div>
      <h1>Training Modules</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newModule.title}
          onChange={(e) =>
            setNewModule({ ...newModule, title: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Description"
          value={newModule.description}
          onChange={(e) =>
            setNewModule({ ...newModule, description: e.target.value })
          }
        />
        <textarea
          placeholder="Content"
          value={newModule.content}
          onChange={(e) =>
            setNewModule({ ...newModule, content: e.target.value })
          }
          required
        />
        <button type="submit">
          {editingModule ? "Update Module" : "Add Module"}
        </button>
      </form>
      <ul>
        {modules.map((module) => (
          <li key={module._id}>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <button onClick={() => handleEdit(module)}>Edit</button>
            <button onClick={() => handleDelete(module._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingModulesPage;
