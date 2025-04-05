import React, { useState, useEffect, useRef } from 'react';
import { getModels, deleteModel, editModelName } from '../utils/api/model';
import Pages from '../components/styled/Pages';
import ModelItem from '../components/page-comps/Models-Page/ModelItem';

const ModelsPage = () => {
  const firstRun = useRef(true);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
    } else {
      fetchAllModels();
    }
  }, []);

  const fetchAllModels = async () => {
    setLoading(true);
    try {
      const data = await getModels();
      setModels(data);
    } catch (error) {
      console.error('Error fetching models:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteModel(id); // Panggil API delete
      setModels((prevModels) => prevModels.filter((model) => model.id !== id));
    } catch (error) {
      console.error('Error deleting model:', error);
    }
  };

  const handleRename = async (id, newName) => {
    try {
      await editModelName(id, newName);

      // Update state dengan cara yang benar agar React mendeteksi perubahan
      setModels((prevModels) => {
        return prevModels.map((model) => (model.id === id ? { ...model, name: newName } : model));
      });
    } catch (error) {
      console.error('Error updating model name:', error);
    }
  };

  return (
    <Pages>
      <h2>Saved Models</h2>
      {loading ? (
        <p>Loading models...</p>
      ) : models.length > 0 ? (
        <div>
          {models.map((model) => (
            <ModelItem
              key={model.id}
              model={model}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          ))}
        </div>
      ) : (
        <p>No models available.</p>
      )}
    </Pages>
  );
};

export default ModelsPage;
