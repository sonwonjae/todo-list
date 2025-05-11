interface DefaultField {
  id: string;
  createdAt: number;
  updatedAt: number;
}

interface Todo extends DefaultField {
  title: string;
}

type Todos = Array<Todo>;

export interface DB {
  todos: Todos;
}

export type DBName = keyof DB;
