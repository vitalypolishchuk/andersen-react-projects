export type AppState = {
  todos: {
    list: {
      name: string;
      id: string;
      completed: boolean;
    }[];
    inProcess: number;
    completed: number;
  };
  name: string;
};
