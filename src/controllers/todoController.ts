import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import Todo from "../models/todoModel";
import { ITodo, Status } from "../models/types/todoTypes";

class TodoController {
  private io = getSocketIo();
  constructor() {
    this.io?.on("connection", (socket: Socket) => {
      console.log("new client connected");
      socket.on("addTodo", (data) => {
        this.handleAddTodo(socket, data);
      });
      socket.on("deleteTodo", (data) => {
        this.handledeleteTodo(socket, data);
      });
      socket.on("updateStatus", (data) => {
        this.handleUpdateTodoStatus(socket, data);
      });
    });
  }
  private async handleAddTodo(socket: Socket, data: ITodo) {
    try {
      const { task, deadline, status } = data;
      await Todo.create({ task, deadline, status });
      const todos = await Todo.find({ status: Status.Pending });
      socket.emit("todo_updated", { success: true, data: todos });
    } catch (error) {
      socket.emit("todo_response", {
        success: false,
        message: "Error",
      });
    }
  }
  private async handledeleteTodo(socket: Socket, data: { id: string }) {
    try {
      const { id } = data;
      const deleteTodo = await Todo.findByIdAndDelete(id);
      if (!deleteTodo) {
        socket.emit("todo_response", {
          Success: false,
          message: "Todo not found!",
        });
        return;
      }
      const Todos = await Todo.find({ status: Status.Pending });
      socket.emit("todo_updated", {
        success: true,
        data: Todos,
      });
    } catch (error) {
      socket.emit("todo_response", {
        Success: false,
        message: "Delete ma Error!",
      });
    }
  }
  private async handleUpdateTodoStatus(
    socket: Socket,
    data: { id: string; status: Status }
  ) {
    try {
      const { id, status } = data;
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!updatedTodo) {
        socket.emit("todo_response", {
          success: false,
          message: "Todo not found!",
        });
        return;
      }
      const Todos = await Todo.find({ status: Status.Pending });
      socket.emit("todo_updated", {
        success: true,
        data: Todos,
      });
    } catch (error) {
      socket.emit("todo_response", {
        success: false,
        message: "Update ma Error ayo!",
      });
    }
  }
}

export default new TodoController();
