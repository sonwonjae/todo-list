import React, { FormEventHandler } from "react";

import { useTodosContext } from "@/contexts/todos";

function TodoForm() {
  const { title, changeTitle, todoInsertRes, insertTodo } = useTodosContext();

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    insertTodo();
  };

  return (
    <form onSubmit={submit}>
      <input
        autoFocus
        disabled={todoInsertRes.isFetching}
        value={title}
        onChange={changeTitle}
      />
    </form>
  );
}

export default React.memo(TodoForm);
