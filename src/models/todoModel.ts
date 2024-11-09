import mongoose from "mongoose";
import { ITodo, Status } from "./types/todoTypes";

const Schema = mongoose.Schema;

const todoSchema = new Schema<ITodo>({
  task: String,
  deadline: String,
  status: {
    type: String,
    enum: [Status.Completed, Status.Pending],
    default: Status.Pending,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
