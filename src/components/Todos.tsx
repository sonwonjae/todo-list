import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import { TodosRes } from "@/pages/api/todo/list";

import Todo from "./Todo";
import TodoForm from "./TodoForm";

function Todos() {
  const { data: todos, isFetching } = useSuspenseQuery({
    queryKey: ["/api/todo/list"],
    queryFn: async () => {
      const { data } = await axios<TodosRes>("/api/todo/list");
      return data.todos;
    },
  });

  const isEmpty = !todos.length;

  if (isFetching) {
    return (
      <div>
        <div>로딩 중...</div>
        <TodoForm />
      </div>
    );
  }

  return (
    <div>
      {isEmpty && <div>아직 Todo를 생성하지 않았습니다.</div>}
      {!isEmpty && (
        <ul className="todo-list">
          {!isEmpty &&
            todos.map((todo) => {
              return <Todo key={todo.id} {...todo} />;
            })}
        </ul>
      )}
      <TodoForm />
    </div>
  );
}

export default React.memo(Todos);
