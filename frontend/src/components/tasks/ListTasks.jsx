import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Task from "./Task";
import { getTasks } from "../../store/actions/taskActions";

const useStyles = makeStyles({
  taskStyle: {
    margin: "20px auto",
    padding: "20px",
    borderRadius: "9px",
    boxShadow: "0px 0px 12px -3px #000000",
  },
});

const ListTask = ({setTask}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  //console.log(tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      <div className={classes.taskStyle}>
        <Typography variant="h5">
          {tasks.length > 0 ? "All Tasks" : "No Tasks Yet"}
        </Typography>
        {tasks &&
          tasks.map((task) => {
            return <Task task={task} key={task._id} setTask = {setTask} />;
          })}
      </div>
    </>
  );
};

export default ListTask;
