import React, {
  useState,
  useCallback,
  useRef,
  useEffect
} from 'react'

import { usePocket } from '../contexts/PocketContext';
import Header from '../components/Header.tsx';
import PostPopup from '../components/PostPopup.tsx';
import AddTaskPopup from '../components/AddTaskPopup.tsx';

//related to send data
interface taskObj {
  task: string,
  isDone: boolean
}

export default function Dashboard() {
  const [isPostPopupVisible, setPostPopupVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState([]);
  const { user, getTODOs, updTODO, removeSingleTODO } = usePocket();
  const [isAddPopupVisible, setAddPopupVisible] = useState(Array(tasks.length).fill(false));

  useEffect(() => {
    async function fetchTasks() {
    try {
      const tasks = await getTODOs(user.id);
      setTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  fetchTasks();
  }, [])

  const handleUnMark = useCallback(
    async function updIsDone(i: number, x: number) {
      const updatedTasks = [...tasks];
      updatedTasks[i].Tasks[x].isDone = false;

      await setTasks(updatedTasks);
      await updTODO(tasks[i]);
    },
    [updTODO, tasks],
  )

  const handleMark = useCallback(
    async function updIsDone(i: number, x: number) {
      const updatedTasks = [...tasks];
      updatedTasks[i].Tasks[x].isDone = true;

      await setTasks(updatedTasks);
      await updTODO(tasks[i]);
    },
    [updTODO, tasks],
  )

  const handleDeleteCompletedTask = useCallback(
    async function deleteCompletedTask(i: index) {
      let updatedTasks = [...tasks];
      updatedTasks[i].Tasks = updatedTasks[i].Tasks.filter((task) => task.isDone === false);

      if (updatedTasks[i].Tasks.length === 0) {
        await removeSingleTODO(updatedTasks[i].id)
      } else {
        await updTODO(updatedTasks[i]);
      }
      await setTasks(updatedTasks);
      window.location.reload();
    },
    [updTODO, removeSingleTODO, tasks],
  )

  const handleAddPopup = (index: number) => {
    const updatedVisibility = [...isAddPopupVisible];
    updatedVisibility[index] = !updatedVisibility[index];
    setAddPopupVisible(updatedVisibility);
  }

  return (
  <>
    <Header />
    <div class='flex h-screen items-start mt-20'>
      <button class='h-4/5 ml-20' onClick={() => setPostPopupVisible(isPostPopupVisible => !isPostPopupVisible)}>
        <h2 class='px-15 py-5'>Create a new TODO list</h2>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      {isPostPopupVisible && <PostPopup onClose={() => setPostPopupVisible(false) }/>}
      {tasks.map((task, i) => (
        <div class='mx-12 h-4/5' key={i}>
          <div class='bg-amber-500 p-5 rounded-t'>
            <h2>{task.Title}</h2>
            <p>{task.created}</p>
            <p>00 00 0000</p>
          </div>
          <ul class='bg-transparent px-16 py-5 border-amber-500 border-2 rounded-b'>
            {task.Tasks.map((taskObj, x) => (
              taskObj.isDone ? (
                <li key={x} class='mb-5 text-green-500'
                onDoubleClick={() => handleUnMark(i, x)}>
                  <abbr title='Double-click to "unmark" it'><s>{taskObj.task}</s></abbr>
                </li>
              ) : (
                <li key={x} class='mb-5 cursor-pointer' onClick={() => handleMark(i, x)}>
                  <abbr title='Click to mark it as "done"'>{taskObj.task}</abbr>
                </li>
              )
            ))}
              <li class='w-full flex'>
                <button class='flex-1 mr-2' onClick={() => handleAddPopup(i)}>+</button>
                {isAddPopupVisible[i] && <AddTaskPopup taskId={task.id} onClose={() => handleAddPopup(false) }/>}
                <button class='flex-1 mr-2' onClick={() => handleDeleteCompletedTask(i)}>-</button>
              </li>
          </ul>
        </div>
      ))}
    </div>
  </>
  );
}
