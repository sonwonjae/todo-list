import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

import { useTodosContext } from "@/contexts/todos";
import { TodosRes } from "@/pages/api/todo/list";

function Todo({ id, title }: TodosRes["todos"][number]) {
  const { deleteTodo, updateTodo } = useTodosContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const changeUpdatedTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateTodo(id, {
      title: updatedTitle,
    });
    setIsUpdating(false);
  };

  if (isUpdating) {
    return (
      <form onSubmit={submit} onKeyDown={(e) => {
        if (e.key.toUpperCase() === 'ESCAPE') {
          setIsUpdating(false);
          setUpdatedTitle(title)
        }
      }}>
        <input autoFocus value={updatedTitle} onChange={changeUpdatedTitle} />
      </form>
    );
  }

  return (
    <div className="todo" key={id}>
      <span>{title}</span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <button
          style={{
            fontSize: "14px",
          }}
          onClick={() => {
            // deleteTodo(id);
            setIsUpdating(true);
          }}
        >
          ✏️
        </button>
        <button
          style={{
            fontSize: "12px",
          }}
          onClick={() => {
            deleteTodo(id);
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default React.memo(Todo);
