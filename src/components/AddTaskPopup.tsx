import React, {
  useCallback,
  useState,
  useEffect,
} from 'react'

import { usePocket } from '../contexts/PocketContext';

export default function AddTaskPopup({ taskId }) {
  const [task, setTask] = useState();
  const [newTask, setNewTask] = useState('');

  const inputStyle = `w-full mb-3 p-3 bg-transparent 
  border-green-200 border-2 rounded
  focus:outline-none focus:border-green-500`;

  const { user, getSingleTODO, updTODO } = usePocket();

  useEffect(() => {
    async function fetchTask() {
      try {
        const task = await getSingleTODO(taskId);
        setTask(task);
      } catch (error) {
        console.error(error);
      }
    }
  fetchTask();
  }, [])

  const handleAddTaskToExistedList = useCallback(
    async function addTaskToExisted() {
      if(newTask !== '') {
        console.log(newTask);
        const updatedTask = {...task};
        const taskObj = {task: newTask, isDone: false};

        updatedTask.Tasks.push(taskObj);

        await setTask(updatedTask);
        await updTODO(task);
        await setNewTask('');
      }
    },
    [updTODO, newTask],
  )


  return (
    <form class='flex flex-col items-center'>
      <input
        type='text'
        placeholder='Tasks'
        class={inputStyle}
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
      />
      <button type='button' onClick={() => handleAddTaskToExistedList()}>+</button>
    </form>
  )
}

