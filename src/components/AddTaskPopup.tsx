import React, {
  useCallback,
  useState,
  useEffect,
} from 'react'

import { usePocket } from '../contexts/PocketContext';

export default function AddTaskPopup({ taskId }) {
  const [task, setTask] = useState();
  const [newTask, setNewTask] = useState('');

  const inputStyle: string = `w-full p-3 bg-transparent 
  border-green-200 border-2 rounded
  focus:outline-none focus:border-green-500 mr-2`;

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
        const updatedTask = {...task};
        const taskObj = {task: newTask, isDone: false};

        updatedTask.Tasks.push(taskObj);

        await setTask(updatedTask);
        await updTODO(task);
        await setNewTask('');
        window.location.reload();
      }
    },
    [updTODO, newTask],
  )


  return (
    <form className='flex flex-row items-center mt-5'>
      <input
        type='text'
        placeholder='Tasks'
        className={inputStyle}
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
      />
      <button type='button' className='bg-emerald-200' onClick={() => handleAddTaskToExistedList()}>+</button>
    </form>
  )
}

