import React from "react";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import {
  addTask,
  updatedTask,
  updateTask,
} from "../../store/actions/taskActions";

const useStyles = makeStyles({
  formStyle: {
    margin: "0px auto",
    padding: "30px",
    borderRadius: "9px",
    boxShadow: "0px 0px 12px -3px #000000",
    display: "flex",
    justifyContent: "space-between",
  },
  submitButton: {
    marginLeft: "20px",
  },
});

const AddTask = ({ task, setTask }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task._id) {
      const id = task._id;
      const updatedTask = {
        name: task.name,
        isComplete: task.isComplete,
        date: task.date,
        author: task.author,
        uid: task.uid,
      };
      dispatch(updateTask(updatedTask, id));
    } else {
      const newTask = {
        ...task,
        date: new Date(),
      };
      dispatch(addTask(newTask));
    }

    setTask({
      name: "",
      isComplete: false,
    });
  };

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        className={classes.formStyle}
        onSubmit={handleSubmit}
      >
        <TextField
          id="enter-task"
          variant="outlined"
          label="Enter a Task"
          autoFocus
          fullWidth
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          type="submit"
        >
          <Send />
        </Button>
      </form>
    </>
  );
};

export default AddTask;
