import React, {
  useState,
  useCallback,
  useRef,
} from 'react'

import { usePocket } from '../contexts/PocketContext';
import { taskObj } from '../interfaces/taskObj';

export default function PostPopup({onClose}) {
  const { user, addTODO } = usePocket();

  const titleRef = useRef<string>('');
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<taskObj[]>([]);

  const handleInputChange = (e) => {
    setTask(e.currentTarget.value);
  };

  const handleAddTask = () => {
    if(task !== '') {
      const taskObj = {task: task, isDone: false};

      setTasks((prevTasks) => [...prevTasks, taskObj]);
      setTask('');
    }
  };

  const handleOnSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      //React is the best framework ever,
      //so I need to do the 'await' to ensure that the state get's updated
      await setTasks((prevTasks) => [...prevTasks]);
      await addTODO(
        user.id,
        titleRef.current.value,
        tasks
      );
      window.location.reload();
    },
    [addTODO, tasks],
  )

  const inputStyle = `w-full mb-3 p-3 bg-transparent 
  border-green-200 border-2 rounded
  focus:outline-none focus:border-green-500`;

  return (
    <div className='absolute
                top-1/2
                left-1/2
                transform
                -translate-x-1/2
                -translate-y-1/2
                bg-gray-900
                bg-opacity-90
                border-green-500
                border-4
                rounded
                p-4
                w-1/3
    '>
      <div className='w-full flex justify-end'>
        <button className='mb-2 ' onClick={onClose}>X</button>
      </div>
      <form onSubmit={handleOnSubmit} className='flex flex-col items-center'>
        <input
          type='text'
          placeholder='Title'
          ref={titleRef}
          className={inputStyle}
        />
        <div className='w-full'>
          <input
            type='text'
            placeholder='Tasks'
            onChange={(e) => setTask(e.target.value)}
            value={task}
            className={inputStyle + ' w-10/12'}
          />
          <button className='ml-3 bg-emerald-200' onClick={handleAddTask} type='button'>+</button>
        </div>
        <button className='flex-1 mr-2 bg-emerald-200' type='submit'>Add TODO</button>
      </form>
      <ul>
        {tasks.map((taskObj, i) => (
          <li key={i}>{taskObj.task}</li>
        ))}
      </ul>
    </div>
  )
}

