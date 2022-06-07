import { toast } from "react-toastify";

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_TASKS":
      console.log(action);
      return action.tasks.data;
    case "ADD_TASK":
      console.log(action);
      toast.success("A task was added successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return [action.task.data, ...state];
    case "UPDATE_TASK":
      console.log(action);
      toast.success("Task is updated successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state.map((task) =>
        task._id === action.task.data._id ? action.task.data : task
      );
    case "CHECK_TASK":
      console.log(action);
      toast.success("Task status has changed successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state.map((task) =>
        task._id === action.task.data._id ? action.task.data : task
      );
    case "DELETE_TASK":
      console.log(action);
      toast.success("Task has been deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state.filter((task) =>
        task._id !== action.id //will exclude matching ids
      );

    default:
      return state;
  }
};

export default taskReducer;
