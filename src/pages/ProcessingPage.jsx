import React, { useState, useEffect } from 'react';
import { splitDataset, trainModel } from '../utils/api/process';
import { fetchPreprocessedDatasetInfo } from '../utils/api/preprocess';
import Pages from '../components/styled/Pages';
import DatasetInfo from '../components/page-comps/DataCollecting-Page/DatasetInfo';
import ParameterSelection from '../components/page-comps/Processing-Page/ParameterSelection';
import TrainButton from '../components/page-comps/Processing-Page/TrainButton';

const ProcessingPage = () => {
  const [totalData, setTotalData] = useState(0);
  const [topicCounts, setTopicCounts] = useState({});
  const [nNeighbors, setNNeighbors] = useState(0);
  const [splitSize, setSplitSize] = useState(0);
  const [trainSize, setTrainSize] = useState(0);
  const [testSize, setTestSize] = useState(0);
  const [trainPerTopic, setTrainPerTopic] = useState({});
  const [testPerTopic, setTestPerTopic] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDatasetInfo();
  }, []);

  const fetchDatasetInfo = async () => {
    try {
      const response = await fetchPreprocessedDatasetInfo();
      setTotalData(response.totalData);
      setTopicCounts(response.topicCounts);
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
    const response = await splitDataset(newSplitSize);
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
    const response = await trainModel(splitSize, nNeighbors);
    if (!response.error) {
      alert('Training completed successfully!');
      return response;
    }
    console.error('Error training model:', response.error);
    return response;
  };

  return (
    <Pages>
      <h2>Processing</h2>
      <DatasetInfo totalData={totalData} topicCounts={topicCounts} />
      <ParameterSelection
        splitSize={splitSize}
        handleSplitChange={handleSplitChange}
        trainSize={trainSize}
        testSize={testSize}
        trainPerTopic={trainPerTopic}
        testPerTopic={testPerTopic}
        nNeighbors={nNeighbors}
        setNNeighbors={setNNeighbors}
        loading={loading}
      />
      <TrainButton handleTrain={handleTrain} />
    </Pages>
  );
};

export default ProcessingPage;
