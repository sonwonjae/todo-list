import React, { useEffect } from "react";

import { useTodosContext } from "@/contexts/todos";

import Todo from "./Todo";
import TodoForm from "./TodoForm";

function Todos() {
  const { todosRes, fetchTodos } = useTodosContext();
  useEffect(() => {
    fetchTodos();
  }, []);

  const isLoading = todosRes.isFetching || todosRes.data === null;
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const isEmpty = !todosRes.isFetching && !todosRes.data?.todos.length;

  return (
    <div>
      {isEmpty && <div>아직 Todo를 생성하지 않았습니다.</div>}
      <ul className="todo-list">
        {!isEmpty &&
          todosRes.data?.todos.map((todo) => {
            return <Todo key={todo.id} {...todo} />;
          })}
      </ul>
      <TodoForm />
    </div>
  );
}

export default React.memo(Todos);
