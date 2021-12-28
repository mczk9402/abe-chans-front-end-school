import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import styles from './TaskItem.module.scss';
import TaskForm from '../taskForm/TaskForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTask,
  handleModalOpen,
  selectIsModalOpen,
  completeTask,
  deleteTask,
} from 'features/task/taskSlice';

interface PropTypes {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}

const TaskItem: React.FC<PropTypes> = ({ task }) => {
  const label = { inputProps: { 'aria-label': 'primary' } };
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true));
  };
  const handleClose = () => dispatch(handleModalOpen(false));

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          className={styles.checkbox}
          checked={task.completed}
          // actionはdispatch経由で送る
          onClick={() => dispatch(completeTask(task))}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon />
        </button>
        <button onClick={() => dispatch(deleteTask(task))} className={styles.delete_button}>
          <DeleteIcon />
        </button>
      </div>
      <Modal
        className={styles.modal}
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm label={'Edit Task'} />
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
