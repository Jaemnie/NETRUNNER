import React from 'react';
import PropTypes from 'prop-types';
import styles from './Quest.module.css';

function Quest({ missionData }) {
  return (
    <div className={styles.questContainer}>
      <h1>Mission Details</h1>
      {missionData ? (
        <div className={styles.missionDetails}>
          <h2>{missionData.title}</h2>
          <p>{missionData.description}</p>
          <ul>
            {missionData.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No mission data available</p>
      )}
    </div>
  );
}

Quest.propTypes = {
  missionData: PropTypes.object,
};

export default Quest;
