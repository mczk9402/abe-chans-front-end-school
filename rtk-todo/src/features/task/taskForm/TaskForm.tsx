import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import styles from './TaskForm.module.scss';
import TaskItem from '../taskItem/TaskItem';

type Inputs = {
  taskTitle: string;
};

const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const handleCreate = (data: Inputs) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit(handleCreate)}>
        <TextField
          className={styles.text_field}
          id="outlined-basic"
          label="New Task"
          variant="outlined"
          {...register('taskTitle')}
        />
      </form>
    </div>
  );
};

export default TaskForm;
