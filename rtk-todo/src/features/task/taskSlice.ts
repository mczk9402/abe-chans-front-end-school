import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'app/store';
import { fetchCount } from 'features/counter/counterAPI';

export interface TaskState {
  idCount: number; // taskが何個あるのか管理
  tasks: {
    // storeに保存するtaskの一覧
    id: number;
    title: string;
    completed: boolean;
  }[];
  selectedTask: {
    // taskのtitleを編集する際にどのtaskが選択されているのか
    id: number;
    title: string;
    completed: boolean;
  };
  isModalOpen: boolean; // modalが開くか閉じるかのフラグ
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [
    {
      id: 1,
      title: 'task A',
      completed: false,
    },
  ],
  selectedTask: {
    id: 0,
    title: '',
    completed: false,
  },
  isModalOpen: false,
};

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount: number) => {
  const response = await fetchCount(amount);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // taskの作成
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [...state.tasks, newTask];
    },
    //どのタスクを選択しているか管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    // taskの編集
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) state.tasks[0].title = action.payload.title;
    },
    // modalを開くか閉じるかのフラグ管理
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    // task完了・未完了のチェックのへこう
    completeTask: (state, action) => {
      // state.tasksの中から指定したtaskを抜き出す
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.completed = !task.completed;
    },
    deleteTask: (state, action) => {
      // 指定したtask以外で新しくstate.taskの配列を作成し直している
      // action.payload.id以外のidを再度代入している
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const { createTask, handleModalOpen, selectTask, editTask, completeTask, deleteTask } =
  taskSlice.actions;

// 状態一覧 const Tasks = useSelector(selectTasks) で取得できる
export const selectTasks = (state: RootState): TaskState['tasks'] => state.task.tasks;
export const selectSelectedTask = (state: RootState): TaskState['selectedTask'] =>
  state.task.selectedTask;
export const selectIsModalOpen = (state: RootState): TaskState['isModalOpen'] =>
  state.task.isModalOpen;

export default taskSlice.reducer;
