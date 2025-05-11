import axios from "axios";
import {
  ChangeEventHandler,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { TodosRes } from "@/pages/api/todo/list";

const TodosContext = createContext<{
  title: string;
  changeTitle: ChangeEventHandler<HTMLInputElement>;

  todosRes: {
    data: TodosRes | null;
    isFetching: boolean;
  };
  fetchTodos: () => void;

  todoInsertRes: {
    isFetching: boolean;
  };
  insertTodo: () => void;

  deleteTodo: (id: string) => void;

  updateTodo: (id: string, draft: Partial<TodosRes['todos'][number]>) => void;
}>({
  title: "",
  changeTitle: () => {},

  todosRes: {
    data: null,
    isFetching: false,
  },
  fetchTodos: () => {},

  todoInsertRes: {
    isFetching: false,
  },
  insertTodo: () => {},

  deleteTodo: () => {},

  updateTodo: () => {},
});

export const useTodosContext = () => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error("todos provider error");
  }

  return todosContext;
};

export function TodosProvider({ children }: PropsWithChildren) {
  const [title, setTitle] = useState("");
  const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const [todosRes, setTodosRes] = useState<{
    data: TodosRes | null;
    isFetching: boolean;
  }>({
    data: null,
    isFetching: false,
  });

  const fetchTodos = async () => {
    setTodosRes({
      isFetching: true,
      data: todosRes.data,
    });
    const { data: newData } = await axios<TodosRes>("/api/todo/list");
    setTodosRes({
      isFetching: false,
      data: newData,
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const [todoInsertRes, setTodoInsertRes] = useState({
    isFetching: false,
  });
  const insertTodo = async () => {
    if (todoInsertRes.isFetching) {
      return;
    }
    setTitle("");
    setTodoInsertRes({
      isFetching: true,
    });
    await axios.post("/api/todo", {
      todo: {
        title,
      },
    });
    await fetchTodos();
    setTodoInsertRes({
      isFetching: false,
    });
  };

  const [todoDeleteRes, setTodoDeleteRes] = useState({
    isFetching: false,
  });
  const deleteTodo = async (id: string) => {
    if (todoDeleteRes.isFetching) {
      return;
    }
    setTodoDeleteRes({
      isFetching: true,
    });
    await axios.delete("/api/todo", {
      data: {
        id,
      },
    });
    await fetchTodos();
    setTodoDeleteRes({
      isFetching: false,
    });
  };

  const [todoUpdateRes, setTodoUpdateRes] = useState({
    isFetching: false,
  });
  const updateTodo = async (id: string, { title }: Partial<TodosRes['todos'][number]>) => {
    if (todoUpdateRes.isFetching) {
      return;
    }
    setTodoUpdateRes({
      isFetching: true,
    });
    await axios.patch("/api/todo", {
      id,
      todo: {
        title,
      }
    });
    await fetchTodos();
    setTodoUpdateRes({
      isFetching: false,
    });
  };

  const contextValue = {
    title,
    changeTitle,

    todosRes,
    fetchTodos,

    todoInsertRes,
    insertTodo,

    deleteTodo,

    updateTodo,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
}
