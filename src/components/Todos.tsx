import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

import generator from "@/queries/api/todo/list/options";

import Todo from "./Todo";
import TodoForm from "./TodoForm";

function Todos() {
  const router = useRouter();

  const { data: todos, isFetching } = useSuspenseQuery(
    generator({
      page: Number(router.query?.page) || 0,
      limit: Number(router.query?.limit) || 10,
    }),
  );

  const isEmpty = !todos.length;

  if (isFetching) {
    return (
      <div>
        <div>로딩 중...</div>
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
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <button
          style={{
            background: "#EEEEEE",
            padding: "8px 16px",
          }}
          onClick={() => {
            const page = Number(router.query.page) || 0;
            router.push(
              `?page=${page > 0 ? page - 1 : 0}&limit=${Number(router.query.limit) || 0}`,
            );
          }}
        >
          prev
        </button>
        <button
          style={{
            background: "#EEEEEE",
            padding: "8px 16px",
          }}
          onClick={() => {
            const page = Number(router.query.page) || 0;
            router.push(
              `?page=${page + 1}&limit=${Number(router.query.limit) || 0}`,
            );
          }}
        >
          next
        </button>
      </div>
      <TodoForm />
    </div>
  );
}

export default React.memo(Todos);
