import React from 'react';
import styles from './TakItem.module.scss';

import sampleData from './sampleData.json';
import TaskItem from '../taskItem/TaskItem';
import { useSelector } from 'react-redux';
import { selectTasks } from '../taskSlice';

const TaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  console.log(tasks);

  return (
    <div className={styles.root}>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
