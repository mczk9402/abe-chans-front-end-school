import React from 'react';
import styles from './TakItem.module.scss';

import sampleData from './sampleData.json';
import TaskItem from '../taskItem/TaskItem';

const TaskList: React.FC = () => {
  return (
    <div className={styles.root}>
      {sampleData.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
