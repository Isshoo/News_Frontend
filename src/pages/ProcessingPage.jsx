import React, { useState, useEffect, useRef } from 'react';
import { splitDataset, trainModel } from '../utils/api/process';
import { fetchPreprocessedDataset } from '../utils/api/preprocess';
import Pages from '../components/styled/Pages';
import DatasetInfo from '../components/page-comps/DataCollecting-Page/DatasetInfo';
import ParameterSelection from '../components/page-comps/Processing-Page/ParameterSelection';
import TrainButton from '../components/page-comps/Processing-Page/TrainButton';

const ProcessingPage = () => {
  const firstRun = useRef(true);
  const [name, setName] = useState('');
  const [totalData, setTotalData] = useState(0);
  const [topicCounts, setTopicCounts] = useState({});
  const [nNeighbors, setNNeighbors] = useState(0);
  const [splitSize, setSplitSize] = useState(0);
  const [trainSize, setTrainSize] = useState(0);
  const [testSize, setTestSize] = useState(0);
  const [trainPerTopic, setTrainPerTopic] = useState({});
  const [testPerTopic, setTestPerTopic] = useState({});
  const [loading, setLoading] = useState(false);

  const rawDatasetId = localStorage.getItem('selectedDataset');
  const preprocessedDatasetId = localStorage.getItem('preprocessed_dataset_id');
  const modelId = localStorage.getItem('modelId') || ''; // Store modelId after training

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (preprocessedDatasetId) {
      fetchDatasetInfo(preprocessedDatasetId);
    }
  }, [preprocessedDatasetId]);

  const fetchDatasetInfo = async (preprocessedDatasetId) => {
    try {
      const response = await fetchPreprocessedDataset(preprocessedDatasetId, 1, 10);
      setTotalData(response.total_data);
      setTopicCounts(response.topic_counts);
    } catch (error) {
      console.error('Error fetching dataset info:', error);
    }
  };

  const handleSplitChange = async (newSplitSize) => {
    setSplitSize(newSplitSize);
    setLoading(true);
    setTrainSize(0);
    setTestSize(0);
    setTrainPerTopic({});
    setTestPerTopic({});
    const response = await splitDataset(rawDatasetId, preprocessedDatasetId, newSplitSize);
    if (!response.error) {
      const { train_size, test_size } = response;
      setTrainSize(train_size);
      setTestSize(test_size);
      const { train_per_topic, test_per_topic } = response;
      setTrainPerTopic(train_per_topic);
      setTestPerTopic(test_per_topic);
    }
    setLoading(false);
  };

  const handleTrain = async () => {
    const response = await trainModel(
      rawDatasetId,
      preprocessedDatasetId,
      name,
      splitSize,
      nNeighbors
    );
    if (!response.error) {
      localStorage.setItem('modelId', response.id); // Save modelId after training
      alert('Training completed successfully!');
      return response;
    }
    console.error('Error training model:', response.error);
    return response;
  };

  return (
    <Pages>
      <h2>Processing</h2>
      <DatasetInfo totalData={totalData || 0} topicCounts={topicCounts || {}} loading={loading} />
      <ParameterSelection
        splitSize={splitSize}
        handleSplitChange={handleSplitChange}
        trainSize={trainSize || 0}
        testSize={testSize || 0}
        trainPerTopic={trainPerTopic || {}}
        testPerTopic={testPerTopic || {}}
        nNeighbors={nNeighbors}
        setNNeighbors={setNNeighbors}
        loading={loading}
      />
      <label>
        Nama Model:
        <input type='text' value={name || ''} onChange={(e) => setName(e.target.value)} />
      </label>
      <TrainButton handleTrain={handleTrain} />
    </Pages>
  );
};

export default ProcessingPage;
