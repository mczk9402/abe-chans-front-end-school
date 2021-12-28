import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import TaskItem from '../taskItem/TaskItem';
import { createTask, editTask, handleModalOpen, selectSelectedTask } from '../taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TaskForm.module.scss';

type Inputs = {
  taskTitle: string;
};

type PropTypes = {
  label?: string;
};

const TaskForm: React.FC<PropTypes> = ({ label = 'New Task' }) => {
  const dispath = useDispatch();
  const selectTask = useSelector(selectSelectedTask);
  const { register, handleSubmit, reset } = useForm();

  const handleCreate = (data: Inputs) => {
    dispath(createTask(data.taskTitle));
    reset();
  };

  const handleEdit = (data: Inputs) => {
    console.log(data);
    const sendData = { ...selectTask, title: data.taskTitle };
    dispath(editTask(sendData));
    dispath(handleModalOpen(false));
  };

  useEffect(() => {
    console.log(selectTask);
  }, []);

  return (
    <div className={styles.root}>
      <form
        className={styles.form}
        onSubmit={label !== 'New Task' ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
      >
        <TextField
          className={styles.text_field}
          defaultValue={label !== 'New Task' ? selectTask.title : ''}
          id="outlined-basic"
          label={label}
          variant="outlined"
          {...register('taskTitle')}
        />
        {label !== 'New Task' ? (
          <div className={styles.button_wrapper}>
            <button className={styles.submit_button} type="submit">
              Submit
            </button>
            <button
              className={styles.cancel_button}
              onClick={() => dispath(handleModalOpen(false))}
              type="button"
            >
              Cancel
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default TaskForm;
