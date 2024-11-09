enum Status {
  Completed = "Completed",
  Pending = "Pending",
}

interface ITodo {
  task: string;
  deadline: string;
  status: Status;
}

export { ITodo, Status };
