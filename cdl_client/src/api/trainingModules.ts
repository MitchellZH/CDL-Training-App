import axios from "./axios";

const API_URL = "/training";

export const createTrainingModule = async (module: {
  title: string;
  description?: string;
  content: string;
}) => {
  const response = await axios.post(`${API_URL}/training-modules`, module);
  return response.data;
};

export const getTrainingModules = async () => {
  const response = await axios.get(`${API_URL}/training-modules`);
  return response.data;
};

export const getTrainingModule = async (id: string) => {
  const response = await axios.get(`${API_URL}/training-modules/${id}`);
  return response.data;
};

export const updateTrainingModule = async (id: string, updatedData: unknown) => {
  const response = await axios.put(
    `${API_URL}/training-modules/${id}`,
    updatedData
  );
  return response.data;
};

export const deleteTrainingModule = async (id: string) => {
  const response = await axios.delete(`${API_URL}/training-modules/${id}`);
  return response.data;
};
