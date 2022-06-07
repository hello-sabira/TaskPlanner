import React, {useState} from 'react';
import AddTask from './AddTask';
import ListTasks from './ListTasks';
import {Redirect} from "react-router-dom"
import { useSelector } from 'react-redux';

const Tasks = () => {
  const auth = useSelector(state => state.auth)

  const [task, setTask] = useState({
    name: "",
    isComplete: false,
  });
  if (!auth._id) return <Redirect to="/signin"/>
  return (
    <>
      <AddTask task={task} setTask = {setTask} />
      <ListTasks setTask = {setTask}/>
    </>
  );
};

export default Tasks;
