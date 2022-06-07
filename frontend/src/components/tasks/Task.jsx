import React from "react";
import { useDispatch } from "react-redux";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import { Create, Delete, CheckCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { checkTask, deleteTask } from "../../store/actions/taskActions";

const useStyles = makeStyles({
  taskStyle: {
    margin: "20px auto",
    padding: "20px",
    border: "2px solid #bdbdbd",
    borderRadius: "9px",
    boxShadow: "9px",
    display: "flex",
    justifyContent: "space-between",
  },
  gridStyle: {
    color: "#8f8f8f",
  },
  isComplete: {
    color: "green",
  },
  checked: {
    textDecoration: "line-through",
  },
});
//error no flex
const Task = ({ task, setTask }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const handleUpdateClick = () => {
    setTask(task);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

const handleCheck = (id) => {
  dispatch(checkTask(id))
}

const handleDelete = (id) => {
  dispatch(deleteTask(id))
}

  return (
    <>
      <div className={classes.taskStyle}>
        <div>
          {task.isComplete ? (
            <Typography variant="subtitle1" className={classes.checked}>
              {task.name}
            </Typography>
          ) : (
            <Typography variant="subtitle1">{task.name}</Typography>
          )}
          <Typography className={classes.gridStyle} variant="subtitle1">
            Author: Sabira
          </Typography>
          <Typography className={classes.gridStyle} variant="subtitle1">
            Added: {moment(task.date).fromNow()}
          </Typography>
        </div>
        <div>
          <ButtonGroup size="small" aria-label="outlined primary button group">
            <Button onClick={() => handleCheck(task._id)}>
              {task.isComplete ? (
                <CheckCircle color="action" className={classes.isComplete} />
              ) : (
                <CheckCircle color="action" />
              )}
            </Button>

            <Button onClick={() => handleUpdateClick()}>
              <Create color="primary" />
            </Button>
            <Button onClick={() => handleDelete(task._id)}>
              <Delete color="secondary" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Task;
